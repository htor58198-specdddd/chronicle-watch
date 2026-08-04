import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { accounts, profiles } from "../../../db/schema";
import { clearSession, createSession, hashPassword, jsonError, verifyPassword } from "../../../lib/runtime-auth";

export const dynamic = "force-dynamic";

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      action?: "login" | "signup";
      email?: string;
      password?: string;
      username?: string;
    };
    const action = payload.action === "signup" ? "signup" : "login";
    const email = normalizeEmail(payload.email ?? "");
    const password = payload.password ?? "";

    if (!validEmail(email)) {
      return Response.json({ error: "Geçerli bir e-posta adresi girmelisin." }, { status: 400 });
    }
    if (password.length < 8 || password.length > 128) {
      return Response.json({ error: "Şifre 8–128 karakter olmalı." }, { status: 400 });
    }

    const db = getDb();

    if (action === "signup") {
      const username = (payload.username ?? "").trim().toLocaleLowerCase("tr-TR");
      if (!/^[a-z0-9_]{3,24}$/.test(username)) {
        return Response.json({ error: "Kullanıcı adı 3–24 karakter olmalı; küçük harf, sayı ve alt çizgi kullanabilirsin." }, { status: 400 });
      }

      const [[emailOwner], [usernameOwner]] = await Promise.all([
        db.select({ id: accounts.id }).from(accounts).where(eq(accounts.email, email)).limit(1),
        db.select({ userId: profiles.userId }).from(profiles).where(eq(profiles.username, username)).limit(1),
      ]);
      if (emailOwner) return Response.json({ error: "Bu e-posta ile zaten bir hesap var." }, { status: 409 });
      if (usernameOwner) return Response.json({ error: "Bu kullanıcı adı alınmış." }, { status: 409 });

      const userId = crypto.randomUUID();
      const passwordRecord = await hashPassword(password);
      const profile = {
        userId,
        email,
        username,
        displayName: username,
        bio: "",
        avatarId: "iron-man",
      };
      await db.batch([
        db.insert(accounts).values({
          id: userId,
          email,
          passwordHash: passwordRecord.hash,
          passwordSalt: passwordRecord.salt,
        }),
        db.insert(profiles).values(profile),
      ]);
      const cookie = await createSession(userId, request);
      return Response.json({ profile }, { status: 201, headers: { "set-cookie": cookie, "cache-control": "no-store" } });
    }

    const [account] = await db.select().from(accounts).where(eq(accounts.email, email)).limit(1);
    if (!account || !(await verifyPassword(password, account.passwordHash, account.passwordSalt))) {
      return Response.json({ error: "E-posta veya şifre hatalı." }, { status: 401 });
    }
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, account.id)).limit(1);
    if (!profile) return Response.json({ error: "Profil bulunamadı." }, { status: 500 });

    const cookie = await createSession(account.id, request);
    return Response.json({ profile }, { headers: { "set-cookie": cookie, "cache-control": "no-store" } });
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const cookie = await clearSession(request);
    return Response.json({ ok: true }, { headers: { "set-cookie": cookie, "cache-control": "no-store" } });
  } catch (error) {
    return jsonError(error);
  }
}
