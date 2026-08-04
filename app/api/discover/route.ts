import { eq, like, ne, or } from "drizzle-orm";
import { getDb } from "../../../db";
import { follows, profiles } from "../../../db/schema";
import { jsonError, requireAuthenticatedUser } from "../../../lib/runtime-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = await requireAuthenticatedUser(request);
    const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";
    const db = getDb();
    const where = query
      ? or(
          like(profiles.username, `%${query.toLocaleLowerCase("tr-TR")}%`),
          like(profiles.displayName, `%${query}%`),
        )
      : ne(profiles.userId, user.id);
    const people = await db
      .select({
        userId: profiles.userId,
        username: profiles.username,
        displayName: profiles.displayName,
        bio: profiles.bio,
        avatarId: profiles.avatarId,
      })
      .from(profiles)
      .where(where)
      .limit(40);
    const visiblePeople = people.filter((person) => person.userId !== user.id);
    const followingRows = await db
      .select({ followingId: follows.followingId })
      .from(follows)
      .where(eq(follows.followerId, user.id));
    const following = new Set(followingRows.map((row) => row.followingId));

    return Response.json({
      people: visiblePeople.map((person) => ({
        ...person,
        following: following.has(person.userId),
      })),
    });
  } catch (error) {
    return jsonError(error);
  }
}
