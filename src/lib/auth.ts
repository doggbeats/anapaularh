import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { readDB, writeDB } from "./db";

export const SESSION_COOKIE = "recruta_session";
export const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

export function verifyPassword(
  password: string,
  salt: string,
  expectedHash: string,
): boolean {
  const hash = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHash, "hex");
  return (
    hash.length === expected.length && timingSafeEqual(hash, expected)
  );
}

export function createSessionToken(): string {
  return randomBytes(32).toString("hex");
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const db = readDB();
  const session = db.sessions[token];
  if (!session) return false;

  if (session.expiresAt < Date.now()) {
    delete db.sessions[token];
    writeDB(db);
    return false;
  }
  return true;
}
