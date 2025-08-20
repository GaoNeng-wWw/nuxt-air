export function tryParseJson(val: string): Record<string, any> | null {
  try {
    return JSON.parse(val);
  } catch {
    return null;
  }
}
