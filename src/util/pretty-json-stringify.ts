/** JSON.stringify's the input with two-space indentation */
export function prettyJsonStringify(input: unknown): string {
  return JSON.stringify(input, null, 2);
}
