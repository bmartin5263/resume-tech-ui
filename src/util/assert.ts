import useLog from "../hooks/useLog";

const log = useLog("Assert")

export function assert(condition: boolean, message: string) {
  if (!condition) {
    useLog(message);
    throw new Error(message);
  }
}

export function assertNotNull<T>(obj: T, name: string): T {
  if (obj == null) {
    const msg = name + " cannot be null";
    useLog(msg);
    throw new Error(msg);
  }
  return obj;
}

export function isNotBlank(text: string): boolean {
  return !isBlank(text);
}

export function isBlank(text: string): boolean {
  return text == null || text.trim().length == 0;
}