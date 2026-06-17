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
    id: "insight",
    href: "/radar#insight",
    label: "Demand Insight",
    shortLabel: "洞察",
    task: "確認議題背後的需求來源、品類關聯與消費者情境"
  },
  {
    id: "strategy",
    href: "/create#strategy",
    label: "Strategy",
    shortLabel: "策略",
    task: "將議題延伸為可討論的活動主張與溝通角度"
  },
  {
    id: "comparison",
    href: "/create#ab-test",
    label: "A/B Comparison",
    shortLabel: "A/B",
    task: "比較原活動做法與顧客需求導向做法"
  },
  {
    id: "campaign",
    href: "/create#campaign",
    label: "Campaign Page",
    shortLabel: "活動頁",
    task: "產出活動策展頁草稿"
  },
  {
    id: "rewards",
    href: "/create#rewards",
    label: "Reward Page",
    shortLabel: "贈獎頁",
    task: "產出贈獎集合頁草稿"
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
