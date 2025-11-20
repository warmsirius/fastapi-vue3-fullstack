export const MIN_PASSWORD_LENGTH = 6;

export function isPassword(password: unknown): password is string {
  return typeof password === "string" && password.length >= MIN_PASSWORD_LENGTH;
}