import { and, eq, gt } from "drizzle-orm";
import { getDb } from "../db";
import { accounts, sessions } from "../db/schema";

const SESSION_COOKIE = "chronicle_session";
const SESSION_DAYS = 30;
// The Sites runtime accepts at most 100,000 PBKDF2 iterations.
const PBKDF2_ITERATIONS = 100_000;

export type AuthenticatedUser = {
  id: string;
  email: string;
};

export class AuthenticationError extends Error {
  status = 401;
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function fromBase64Url(value: string) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function randomToken(size: number) {
  return toBase64Url(crypto.getRandomValues(new Uint8Array(size)));
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return toBase64Url(new Uint8Array(digest));
}

export async function hashPassword(password: string, salt = randomToken(18)) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: fromBase64Url(salt), iterations: PBKDF2_ITERATIONS },
    key,
    256,
  );
  return { hash: toBase64Url(new Uint8Array(bits)), salt };
}

export async function verifyPassword(password: string, expectedHash: string, salt: string) {
  const { hash } = await hashPassword(password, salt);
  if (hash.length !== expectedHash.length) return false;
  let difference = 0;
  for (let index = 0; index < hash.length; index += 1) {
    difference |= hash.charCodeAt(index) ^ expectedHash.charCodeAt(index);
  }
  return difference === 0;
}

function readCookie(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  for (const part of cookie.split(";")) {
    const [name, ...value] = part.trim().split("=");
    if (name === SESSION_COOKIE) return decodeURIComponent(value.join("="));
  }
  return "";
}

function secureCookie(request: Request) {
  return new URL(request.url).protocol === "https:" ? "; Secure" : "";
}

export async function createSession(userId: string, request: Request) {
  const token = randomToken(32);
  const tokenHash = await sha256(token);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await getDb().insert(sessions).values({ tokenHash, userId, expiresAt: expiresAt.toISOString() });
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DAYS * 24 * 60 * 60}${secureCookie(request)}`;
}

export async function clearSession(request: Request) {
  const token = readCookie(request);
  if (token) {
    await getDb().delete(sessions).where(eq(sessions.tokenHash, await sha256(token)));
  }
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secureCookie(request)}`;
}

export async function requireAuthenticatedUser(request: Request): Promise<AuthenticatedUser> {
  const token = readCookie(request);
  if (!token) throw new AuthenticationError("Oturum gerekli.");

  const [user] = await getDb()
    .select({ id: accounts.id, email: accounts.email })
    .from(sessions)
    .innerJoin(accounts, eq(sessions.userId, accounts.id))
    .where(and(eq(sessions.tokenHash, await sha256(token)), gt(sessions.expiresAt, new Date().toISOString())))
    .limit(1);

  if (!user) throw new AuthenticationError("Oturumun sona erdi. Tekrar giriş yap.");
  return user;
}

export function jsonError(error: unknown) {
  if (error instanceof AuthenticationError) {
    return Response.json({ error: error.message }, { status: error.status });
  }
  const message = error instanceof Error ? error.message : "Beklenmeyen bir hata oluştu.";
  return Response.json({ error: message }, { status: 500 });
}
