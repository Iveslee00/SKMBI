import { describe, expect, it } from "vitest";
import { readStoredSidebarState, sidebarStorageKey, writeStoredSidebarState } from "./sidebar-state";

describe("sidebar state", () => {
  it("reads and writes the collapsed state for route changes", () => {
    const store = new Map<string, string>();
    const storage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value)
    };

    expect(readStoredSidebarState(storage)).toBe(false);

    writeStoredSidebarState(storage, true);

    expect(store.get(sidebarStorageKey)).toBe("true");
    expect(readStoredSidebarState(storage)).toBe(true);
  });

  it("falls back safely when storage is unavailable", () => {
    expect(readStoredSidebarState(undefined)).toBe(false);
    expect(() => writeStoredSidebarState(undefined, true)).not.toThrow();
  });
});
