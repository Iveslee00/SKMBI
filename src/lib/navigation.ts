export type PlatformModule = {
  href: string;
  label: string;
  shortLabel: string;
  task: string;
  status: "Ready" | "Draft" | "Review";
};

export type CampaignWorkflowStep = {
  id: string;
  href: string;
  label: string;
  shortLabel: string;
  task: string;
};

export const platformModules: PlatformModule[] = [
  {
    href: "/",
    label: "Command Center",
    shortLabel: "工作台",
    task: "查看目前策展案進度、待辦與近期成效摘要",
    status: "Ready"
  },
  {
    href: "/create",
    label: "Create Campaign",
    shortLabel: "建立策展案",
    task: "從顧客需求開始建立一個新的策展案",
    status: "Ready"
  },
  {
    href: "/projects",
    label: "My Campaign Projects",
    shortLabel: "策展案列表",
    task: "管理進行中、待審核與準備上線的策展案",
    status: "Ready"
  },
  {
    href: "/export",
    label: "CMS Export",
    shortLabel: "CMS 匯出",
    task: "輸出 HTML、CSS、JS、JSON 與追蹤參數素材包",
    status: "Review"
  },
  {
    href: "/feedback",
    label: "Learning Loop",
    shortLabel: "成效回流",
    task: "把上線後的假設驗證回流到下一次策展",
    status: "Review"
  }
];

export const campaignWorkflowSteps: CampaignWorkflowStep[] = [
  {
    id: "select-demand",
    href: "/create",
    label: "Select Demand",
    shortLabel: "選需求",
    task: "看 AI 排名、理由與數據後選定需求"
  },
  {
    id: "edit-options",
    href: "/create/options",
    label: "Edit Options",
    shortLabel: "編輯方案",
    task: "AI 產生兩個方案，讓使用者調整文案、商品與贈獎"
  },
  {
    id: "forecast",
    href: "/create/compare",
    label: "AI Forecast",
    shortLabel: "AI 預估",
    task: "上線前比較文案吸引度、活動力度與預估成效"
  },
  {
    id: "select-option",
    href: "/create/compare#select-option",
    label: "Select Option",
    shortLabel: "選定方案",
    task: "選定要產生頁面的策展版本"
  },
  {
    id: "generate-code",
    href: "/create/generate",
    label: "Generate Code",
    shortLabel: "產生語法",
    task: "產生 CMS 可用的 HTML、CSS、JS、JSON"
  },
  {
    id: "feedback",
    href: "/feedback",
    label: "Feedback",
    shortLabel: "成效",
    task: "回收上線後成效並形成下一次策展依據"
  }
];
