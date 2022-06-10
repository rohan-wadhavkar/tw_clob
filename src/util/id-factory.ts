/** Factory for short random strings with approximately 57 bits of entropy
 * @returns A ~10 character string composed of characters a-z and 0-9
 */
export function idFactory(): string {
  return Math.random().toString(36).slice(2);
}
