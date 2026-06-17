export const sidebarStorageKey = "campaign-studio-sidebar-collapsed";

export function readStoredSidebarState(storage?: Pick<Storage, "getItem"> | null): boolean {
  if (!storage) {
    return false;
  }

  return storage.getItem(sidebarStorageKey) === "true";
}

export function writeStoredSidebarState(storage: Pick<Storage, "setItem"> | undefined | null, collapsed: boolean): void {
  if (!storage) {
    return;
  }

  storage.setItem(sidebarStorageKey, String(collapsed));
}
