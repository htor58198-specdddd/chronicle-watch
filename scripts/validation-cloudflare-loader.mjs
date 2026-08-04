const CLOUDFLARE_WORKERS_STUB =
  "data:text/javascript," +
  encodeURIComponent("export const env = Object.freeze({});");

export async function resolve(specifier, context, nextResolve) {
  if (specifier === "cloudflare:workers") {
    return { shortCircuit: true, url: CLOUDFLARE_WORKERS_STUB };
  }

  return nextResolve(specifier, context);
}
