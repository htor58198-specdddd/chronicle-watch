import { and, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { follows, profiles } from "../../../db/schema";
import { jsonError, requireAuthenticatedUser } from "../../../lib/runtime-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const user = await requireAuthenticatedUser(request);
    const payload = (await request.json()) as { userId?: string };
    const targetId = payload.userId?.trim();

    if (!targetId || targetId === user.id) {
      return Response.json({ error: "Geçerli bir kullanıcı seçmelisin." }, { status: 400 });
    }

    const db = getDb();
    const [target] = await db
      .select({ userId: profiles.userId })
      .from(profiles)
      .where(eq(profiles.userId, targetId))
      .limit(1);
    if (!target) {
      return Response.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });
    }

    const [existing] = await db
      .select()
      .from(follows)
      .where(and(eq(follows.followerId, user.id), eq(follows.followingId, targetId)))
      .limit(1);

    if (existing) {
      await db
        .delete(follows)
        .where(and(eq(follows.followerId, user.id), eq(follows.followingId, targetId)));
      return Response.json({ following: false });
    }

    await db.insert(follows).values({ followerId: user.id, followingId: targetId });
    return Response.json({ following: true });
  } catch (error) {
    return jsonError(error);
  }
}
