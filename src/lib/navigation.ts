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
    href: "/create#select-demand",
    label: "Select Demand",
    shortLabel: "選需求",
    task: "從 AI 排名中選一個顧客需求或議題"
  },
  {
    id: "create-case",
    href: "/create#create-case",
    label: "Create Case",
    shortLabel: "建立案",
    task: "把選定需求建立成可追蹤的策展工作項目"
  },
  {
    id: "insight",
    href: "/create#insight",
    label: "Demand Insight",
    shortLabel: "洞察",
    task: "確認議題背後的需求來源、品類關聯與消費者情境"
  },
  {
    id: "generate-options",
    href: "/create#generate-options",
    label: "Generate Options",
    shortLabel: "產生方案",
    task: "AI 產生可做成頁面的策展方案"
  },
  {
    id: "forecast",
    href: "/create#forecast",
    label: "AI Forecast",
    shortLabel: "AI 預估",
    task: "上線前比較文案吸引度、活動力度與預估成效"
  },
  {
    id: "select-option",
    href: "/create#select-option",
    label: "Select Option",
    shortLabel: "選定方案",
    task: "選定要產生頁面的策展版本"
  },
  {
    id: "generate-page",
    href: "/create#generate-page",
    label: "Generate Page",
    shortLabel: "產頁",
    task: "產生活動頁或贈獎集合頁草稿"
  },
  {
    id: "export",
    href: "/create#export",
    label: "Export",
    shortLabel: "匯出",
    task: "整理 CMS 所需 HTML、CSS、JS、JSON 與追蹤參數"
  },
  {
    id: "feedback",
    href: "/create#feedback",
    label: "Feedback",
    shortLabel: "成效",
    task: "回收上線後成效並形成下一次策展依據"
  }
];
