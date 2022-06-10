/**
 * @returns the current date and time as an ISO 8601 string
 * https://en.wikipedia.org/wiki/ISO_8601
 */
export function timestampFactory(): string {
  return new Date().toISOString();
}
