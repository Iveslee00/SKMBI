"use client";

import { useEffect, useState } from "react";
import { readStoredSidebarState, writeStoredSidebarState } from "../lib/sidebar-state";

export function SidebarShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(readStoredSidebarState(getBrowserStorage()));
  }, []);

  function toggleSidebar() {
    setCollapsed((current) => {
      const next = !current;
      writeStoredSidebarState(getBrowserStorage(), next);
      return next;
    });
  }

  return (
    <main className="app-shell" data-sidebar-collapsed={collapsed ? "true" : "false"} id="main-content">
      <button
        aria-label={collapsed ? "展開左側選單" : "收合左側選單"}
        aria-pressed={collapsed}
        className="sidebar-toggle"
        onClick={toggleSidebar}
        type="button"
      >
        <span>選單</span>
      </button>
      {children}
    </main>
  );
}

function getBrowserStorage(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}
