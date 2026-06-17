export type PlatformModule = {
  href: string;
  label: string;
  shortLabel: string;
  task: string;
  status: "Ready" | "Draft" | "Review";
};

export const platformModules: PlatformModule[] = [
  {
    href: "/",
    label: "Command Center",
    shortLabel: "總覽",
    task: "查看今日需求、策展任務與平台整體狀態",
    status: "Ready"
  },
  {
    href: "/radar",
    label: "Demand Radar",
    shortLabel: "需求雷達",
    task: "辨識值得策展的顧客需求與市場訊號",
    status: "Ready"
  },
  {
    href: "/evidence",
    label: "Evidence Brief",
    shortLabel: "策展依據",
    task: "整理活動為什麼值得發生的證據與商業判斷",
    status: "Ready"
  },
  {
    href: "/strategy",
    label: "Strategy Studio",
    shortLabel: "策略工作室",
    task: "產生可被營運與行銷討論的活動策略版本",
    status: "Draft"
  },
  {
    href: "/campaign",
    label: "Campaign Builder",
    shortLabel: "活動頁",
    task: "把策略轉成可交付 CMS 的活動策展頁草稿",
    status: "Draft"
  },
  {
    href: "/rewards",
    label: "Reward Builder",
    shortLabel: "贈獎頁",
    task: "用顧客需求重組贈獎集合頁與門檻設計",
    status: "Draft"
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
