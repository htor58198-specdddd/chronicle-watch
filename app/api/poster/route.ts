export const dynamic = "force-dynamic";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w780";
const FILE_NAME_PATTERN = /^[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp)$/;
const BROWSER_CACHE_SECONDS = 86_400;
const EDGE_CACHE_SECONDS = 2_592_000;

type CloudflareRequestInit = RequestInit & {
  cf?: {
    cacheEverything?: boolean;
    cacheTtl?: number;
  };
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const fileName = url.searchParams.get("path")?.trim() ?? "";

  if (!FILE_NAME_PATTERN.test(fileName)) {
    return Response.json(
      { error: "Geçersiz afiş yolu." },
      { status: 400 },
    );
  }

  const upstreamUrl = `${TMDB_IMAGE_BASE}/${fileName}`;

  const upstreamResponse = await fetch(upstreamUrl, {
    headers: {
      accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
    cf: {
      cacheEverything: true,
      cacheTtl: EDGE_CACHE_SECONDS,
    },
  } as CloudflareRequestInit);

  if (!upstreamResponse.ok || !upstreamResponse.body) {
    return Response.json(
      { error: "Afiş alınamadı." },
      { status: upstreamResponse.status === 404 ? 404 : 502 },
    );
  }

  const headers = new Headers();

  headers.set(
    "content-type",
    upstreamResponse.headers.get("content-type") ?? "image/jpeg",
  );

  headers.set(
    "cache-control",
    `public, max-age=${BROWSER_CACHE_SECONDS}, s-maxage=${EDGE_CACHE_SECONDS}, stale-while-revalidate=604800`,
  );

  headers.set("x-content-type-options", "nosniff");

  const etag = upstreamResponse.headers.get("etag");
  if (etag) headers.set("etag", etag);

  return new Response(upstreamResponse.body, {
    status: 200,
    headers,
  });
}
