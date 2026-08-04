import { and, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { groupMembers, groups, profiles } from "../../../db/schema";
import { jsonError, requireAuthenticatedUser } from "../../../lib/runtime-auth";

export const dynamic = "force-dynamic";

function createInviteCode() {
  return crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
}

export async function GET(request: Request) {
  try {
    const user = await requireAuthenticatedUser(request);
    const db = getDb();
    const memberships = await db
      .select({
        id: groups.id,
        name: groups.name,
        description: groups.description,
        inviteCode: groups.inviteCode,
        ownerId: groups.ownerId,
        role: groupMembers.role,
      })
      .from(groupMembers)
      .innerJoin(groups, eq(groupMembers.groupId, groups.id))
      .where(eq(groupMembers.userId, user.id));

    const detailed = await Promise.all(
      memberships.map(async (group) => {
        const members = await db
          .select({
            userId: profiles.userId,
            username: profiles.username,
            displayName: profiles.displayName,
            avatarId: profiles.avatarId,
            role: groupMembers.role,
          })
          .from(groupMembers)
          .innerJoin(profiles, eq(groupMembers.userId, profiles.userId))
          .where(eq(groupMembers.groupId, group.id));
        return { ...group, members };
      }),
    );

    return Response.json({ groups: detailed });
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuthenticatedUser(request);
    const payload = (await request.json()) as {
      action?: "create" | "join";
      name?: string;
      description?: string;
      inviteCode?: string;
    };
    const db = getDb();

    if (payload.action === "join") {
      const inviteCode = (payload.inviteCode ?? "").trim().toUpperCase();
      const [group] = await db
        .select()
        .from(groups)
        .where(eq(groups.inviteCode, inviteCode))
        .limit(1);
      if (!group) {
        return Response.json({ error: "Davet kodu geçersiz." }, { status: 404 });
      }
      await db
        .insert(groupMembers)
        .values({ groupId: group.id, userId: user.id, role: "member" })
        .onConflictDoNothing();
      return Response.json({ group });
    }

    const name = (payload.name ?? "").trim();
    const description = (payload.description ?? "").trim();
    if (name.length < 3 || name.length > 40) {
      return Response.json({ error: "Grup adı 3–40 karakter olmalı." }, { status: 400 });
    }
    if (description.length > 140) {
      return Response.json({ error: "Grup açıklaması 140 karakteri geçemez." }, { status: 400 });
    }

    const group = {
      id: crypto.randomUUID(),
      ownerId: user.id,
      name,
      description,
      inviteCode: createInviteCode(),
    };
    await db.batch([
      db.insert(groups).values(group),
      db.insert(groupMembers).values({ groupId: group.id, userId: user.id, role: "owner" }),
    ]);

    return Response.json({ group }, { status: 201 });
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireAuthenticatedUser(request);
    const payload = (await request.json()) as { groupId?: string };
    const groupId = payload.groupId?.trim();
    if (!groupId) return Response.json({ error: "Grup seçmelisin." }, { status: 400 });

    const db = getDb();
    const [group] = await db
      .select({ ownerId: groups.ownerId })
      .from(groups)
      .where(eq(groups.id, groupId))
      .limit(1);
    if (!group) return Response.json({ error: "Grup bulunamadı." }, { status: 404 });

    const [membership] = await db
      .select({ role: groupMembers.role })
      .from(groupMembers)
      .where(and(eq(groupMembers.groupId, groupId), eq(groupMembers.userId, user.id)))
      .limit(1);
    if (!membership) return Response.json({ error: "Bu grubun üyesi değilsin." }, { status: 403 });

    if (group.ownerId === user.id) {
      await db.delete(groups).where(eq(groups.id, groupId));
      return Response.json({ ok: true, action: "deleted" });
    }

    await db
      .delete(groupMembers)
      .where(and(eq(groupMembers.groupId, groupId), eq(groupMembers.userId, user.id)));
    return Response.json({ ok: true, action: "left" });
  } catch (error) {
    return jsonError(error);
  }
}
