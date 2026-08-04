import { and, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { watchProgress } from "../../../db/schema";
import { catalog } from "../../../lib/catalog";
import { jsonError, requireAuthenticatedUser } from "../../../lib/runtime-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const user = await requireAuthenticatedUser(request);
    const rows = await getDb()
      .select()
      .from(watchProgress)
      .where(eq(watchProgress.userId, user.id));
    return Response.json({ progress: rows });
  } catch (error) {
    return jsonError(error);
  }
}

export async function PUT(request: Request) {
  try {
    const user = await requireAuthenticatedUser(request);
    const payload = (await request.json()) as {
      contentId?: string;
      completedUnits?: number;
    };
    const item = catalog.find((entry) => entry.id === payload.contentId);

    if (!item || item.availableUnits < 1) {
      return Response.json({ error: "Geçerli bir içerik seçmelisin." }, { status: 400 });
    }

    const completedUnits = Math.max(
      0,
      Math.min(item.availableUnits, Math.floor(Number(payload.completedUnits) || 0)),
    );
    const db = getDb();

    if (completedUnits === 0) {
      await db
        .delete(watchProgress)
        .where(
          and(
            eq(watchProgress.userId, user.id),
            eq(watchProgress.contentId, item.id),
          ),
        );
    } else {
      await db
        .insert(watchProgress)
        .values({
          userId: user.id,
          contentId: item.id,
          completedUnits,
          totalUnits: item.availableUnits,
          updatedAt: new Date().toISOString(),
        })
        .onConflictDoUpdate({
          target: [watchProgress.userId, watchProgress.contentId],
          set: {
            completedUnits,
            totalUnits: item.availableUnits,
            updatedAt: new Date().toISOString(),
          },
        });
    }

    return Response.json({
      item: {
        contentId: item.id,
        completedUnits,
        totalUnits: item.availableUnits,
      },
    });
  } catch (error) {
    return jsonError(error);
  }
}
