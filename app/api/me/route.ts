import { and, eq, ne } from "drizzle-orm";
import { getDb } from "../../../db";
import { profiles } from "../../../db/schema";
import { heroAvatars } from "../../../lib/avatar-roster";
import { jsonError, requireAuthenticatedUser } from "../../../lib/runtime-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = await requireAuthenticatedUser(request);
    const [profile] = await getDb()
      .select()
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);

    return Response.json({ user, profile: profile ?? null });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuthenticatedUser(request);
    const payload = (await request.json()) as {
      username?: string;
      displayName?: string;
      bio?: string;
      avatarId?: string;
    };
    const username = (payload.username ?? "").trim().toLocaleLowerCase("tr-TR");
    const displayName = (payload.displayName ?? username).trim();
    const bio = (payload.bio ?? "").trim();
    const avatarId = heroAvatars.some((avatar) => avatar.id === payload.avatarId) ? payload.avatarId! : "iron-man";

    if (!/^[a-z0-9_]{3,24}$/.test(username)) {
      return Response.json(
        { error: "Kullanıcı adı 3–24 karakter olmalı; yalnızca küçük harf, sayı ve alt çizgi kullanabilirsin." },
        { status: 400 },
      );
    }
    if (!displayName || displayName.length > 40) {
      return Response.json({ error: "Görünen ad 1–40 karakter olmalı." }, { status: 400 });
    }
    if (bio.length > 160) {
      return Response.json({ error: "Biyografi 160 karakteri geçemez." }, { status: 400 });
    }

    const db = getDb();
    const [conflict] = await db
      .select({ userId: profiles.userId })
      .from(profiles)
      .where(and(eq(profiles.username, username), ne(profiles.userId, user.id)))
      .limit(1);

    if (conflict) {
      return Response.json({ error: "Bu kullanıcı adı alınmış." }, { status: 409 });
    }

    const [profile] = await db
      .insert(profiles)
      .values({
        userId: user.id,
        email: user.email,
        username,
        displayName,
        bio,
        avatarId,
      })
      .onConflictDoUpdate({
        target: profiles.userId,
        set: {
          email: user.email,
          username,
          displayName,
          bio,
          avatarId,
          updatedAt: new Date().toISOString(),
        },
      })
      .returning();

    return Response.json({ profile });
  } catch (error) {
    return jsonError(error);
  }
}
