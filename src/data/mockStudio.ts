export type SignalSource = {
  label: string;
  value: number;
  note: string;
};

export type DemandOpportunity = {
  id: string;
  title: string;
  shortTitle: string;
  audience: string;
  summary: string;
  momentum: number;
  businessScore: number;
  categoryGroup: string;
  demandGrowth: number;
  productFit: number;
  rewardFit: number;
  crmFit: number;
  executionEffort: "低" | "中" | "高";
  recommendedOutput: "活動策展頁" | "贈獎集合頁" | "內容導購";
  categories: string[];
  keywords: string[];
  signals: SignalSource[];
  reasoning: {
    label: string;
    score: number;
    detail: string;
  }[];
  risks: string[];
};

export type CampaignStrategy = {
  id: string;
  name: string;
  proposition: string;
  audience: string;
  productLogic: string;
  rewardLogic: string;
  channels: string[];
  hypothesis: string;
  confidence: number;
};

export type ComparisonVariant = {
  opportunityId: string;
  label: "A" | "B";
  name: string;
  pageAngle: string;
  rewardAngle: string;
  projectedCtrLift: number;
  projectedCvrLift: number;
  marginImpact: "低" | "中" | "高";
  crmValue: number;
  executionEffort: "低" | "中" | "高";
  recommendation: string;
};

export type PageSection = {
  eyebrow: string;
  title: string;
  body: string;
  cta?: string;
};

export type CmsExportPackage = {
  type: "campaign" | "reward";
  html: string;
  css: string;
  js: string;
  json: {
    type: "campaign" | "reward";
    title: string;
    sections: PageSection[];
    tracking: string[];
  };
};

export const demandOpportunities: DemandOpportunity[] = [
  {
    id: "small-space-cooling",
    title: "小坪數租屋族正在尋找省電、免安裝的冷房方案",
    shortTitle: "租屋族省電冷房",
    audience: "22-35 歲租屋族與小家庭",
    summary:
      "需求不是單純買冷氣，而是希望在不能施工、預算有限、電費壓力高的空間裡，找到可立即改善夏季悶熱的組合方案。",
    momentum: 92,
    businessScore: 88,
    categoryGroup: "家電 / 居家",
    demandGrowth: 31,
    productFit: 86,
    rewardFit: 82,
    crmFit: 84,
    executionEffort: "中",
    recommendedOutput: "活動策展頁",
    categories: ["家電", "居家", "節能", "夏季生活"],
    keywords: ["免安裝冷氣", "省電風扇", "小房間降溫", "租屋電費", "循環扇推薦"],
    signals: [
      {
        label: "站內搜尋",
        value: 38,
        note: "免安裝、移動式、循環扇相關搜尋連續三週上升"
      },
      {
        label: "外部討論",
        value: 27,
        note: "租屋社群與論壇討論高溫、電費與不可施工限制"
      },
      {
        label: "商品互動",
        value: 21,
        note: "低耗電、可收納、小坪數標籤商品點擊率較高"
      },
      {
        label: "客服問題",
        value: 14,
        note: "常見問題集中在坪數、耗電、退換貨與安裝限制"
      }
    ],
    reasoning: [
      {
        label: "消費需求強度",
        score: 94,
        detail: "熱浪與租屋限制讓需求具體且急迫"
      },
      {
        label: "商品與品類適配",
        score: 86,
        detail: "可用循環扇、移動式冷氣、遮光簾與節能插座組合"
      },
      {
        label: "贈獎適配",
        score: 82,
        detail: "可用電費補貼券、涼感小物、延長保固提高行動誘因"
      },
      {
        label: "商業優先度",
        score: 90,
        detail: "夏季家電高關注，適合帶動周邊居家商品"
      }
    ],
    risks: ["高單價商品需要明確分期與保固說明", "租屋族對安裝限制敏感", "需避免過度承諾冷房效果"]
  },
  {
    id: "family-summer-outing",
    title: "親子家庭暑假出遊需要防曬、補水與輕量收納組合",
    shortTitle: "親子暑假外出補給",
    audience: "親子家庭與暑假出遊族群",
    summary: "需求集中在一次買齊出門前準備品，並降低漏買與選品時間。",
    momentum: 84,
    businessScore: 81,
    categoryGroup: "親子 / 美妝 / 食品",
    demandGrowth: 24,
    productFit: 82,
    rewardFit: 88,
    crmFit: 91,
    executionEffort: "低",
    recommendedOutput: "贈獎集合頁",
    categories: ["美妝", "食品", "戶外", "親子"],
    keywords: ["兒童防曬", "補水飲", "出遊清單", "防蚊", "保冷袋"],
    signals: [
      { label: "站內搜尋", value: 34, note: "防曬與防蚊搜尋量升溫" },
      { label: "外部討論", value: 24, note: "暑假行程與親子景點討論增加" },
      { label: "商品互動", value: 29, note: "組合包與大容量商品互動較好" },
      { label: "客服問題", value: 13, note: "詢問兒童適用、效期與配送時間" }
    ],
    reasoning: [
      { label: "消費需求強度", score: 86, detail: "暑假情境清楚，購買清單明確" },
      { label: "商品與品類適配", score: 82, detail: "跨品類組合可提高客單" },
      { label: "贈獎適配", score: 88, detail: "滿額送保冷袋或旅行收納包具吸引力" },
      { label: "商業優先度", score: 78, detail: "適合 CRM 分眾推播與會員回購" }
    ],
    risks: ["親子用品需標示適用年齡", "防曬商品需注意效期與庫存"]
  },
  {
    id: "new-hire-home-kit",
    title: "新鮮人搬家需要一次購足的租屋生活用品方案",
    shortTitle: "新鮮人租屋起手包",
    audience: "畢業新鮮人、初次租屋者",
    summary: "顧客想降低採買複雜度，需要從寢具、清潔、收納到小家電的完整起手包。",
    momentum: 76,
    businessScore: 79,
    categoryGroup: "居家 / 清潔 / 收納",
    demandGrowth: 18,
    productFit: 84,
    rewardFit: 76,
    crmFit: 78,
    executionEffort: "中",
    recommendedOutput: "活動策展頁",
    categories: ["居家", "清潔", "收納", "小家電"],
    keywords: ["租屋必買", "新鮮人搬家", "收納箱", "床包", "小家電"],
    signals: [
      { label: "站內搜尋", value: 31, note: "租屋與收納關鍵字穩定上升" },
      { label: "外部討論", value: 18, note: "畢業季搬家清單被大量分享" },
      { label: "商品互動", value: 37, note: "平價組合與清單型內容點擊率高" },
      { label: "客服問題", value: 14, note: "詢問配送、尺寸與組裝需求" }
    ],
    reasoning: [
      { label: "消費需求強度", score: 78, detail: "情境明確但季節性較強" },
      { label: "商品與品類適配", score: 84, detail: "可串接多品類提高籃子大小" },
      { label: "贈獎適配", score: 76, detail: "滿額送收納袋或清潔組可降低決策門檻" },
      { label: "商業優先度", score: 80, detail: "有利於新客導入與會員首次購買" }
    ],
    risks: ["需避免清單過長造成選擇疲勞", "配送時效需被清楚標示"]
  }
];

export const comparisonVariants: ComparisonVariant[] = [
  {
    opportunityId: "small-space-cooling",
    label: "A",
    name: "原檔期型家電活動",
    pageAngle: "夏季冷房家電折扣，主打指定商品與價格。",
    rewardAngle: "滿額贈一般生活小物。",
    projectedCtrLift: 3,
    projectedCvrLift: 1,
    marginImpact: "中",
    crmValue: 62,
    executionEffort: "低",
    recommendation: "可作為 baseline，但顧客需求敘事不足。"
  },
  {
    opportunityId: "small-space-cooling",
    label: "B",
    name: "租屋族免安裝降溫方案",
    pageAngle: "從不能施工、怕電費、小坪數三個需求切入。",
    rewardAngle: "滿額送電費折抵券、涼感毯或延長保固。",
    projectedCtrLift: 18,
    projectedCvrLift: 7,
    marginImpact: "中",
    crmValue: 86,
    executionEffort: "中",
    recommendation: "建議與 A 同時測，B 做為主推情境頁。"
  },
  {
    opportunityId: "family-summer-outing",
    label: "A",
    name: "暑假出遊用品集合",
    pageAngle: "列出防曬、防蚊、補水與保冷商品。",
    rewardAngle: "滿額送旅行收納包。",
    projectedCtrLift: 6,
    projectedCvrLift: 2,
    marginImpact: "低",
    crmValue: 74,
    executionEffort: "低",
    recommendation: "適合快速上線，但差異化有限。"
  },
  {
    opportunityId: "family-summer-outing",
    label: "B",
    name: "親子出門前 30 分鐘準備包",
    pageAngle: "用出門前情境重組商品與贈獎。",
    rewardAngle: "依門檻送保冷袋、兒童濕紙巾與防水收納袋。",
    projectedCtrLift: 14,
    projectedCvrLift: 5,
    marginImpact: "中",
    crmValue: 92,
    executionEffort: "低",
    recommendation: "適合 CRM 分眾與 LINE 推播。"
  }
];

export const campaignStrategies: CampaignStrategy[] = [
  {
    id: "no-install-cooling",
    name: "免安裝冷房提案",
    proposition: "不用施工，也能讓小空間降溫有感",
    audience: "租屋族、小套房住戶、不能鑽牆安裝的家庭",
    productLogic: "用移動式冷氣、循環扇、遮光簾與智慧節能插座組成三段式方案。",
    rewardLogic: "滿額送涼感毯或電費折抵券，降低高單價家電決策壓力。",
    channels: ["LINE 分眾推播", "EDM 情境清單", "社群短影音腳本"],
    hypothesis: "以租屋限制作為頁面敘事，會比單純夏季家電檔期帶來更高 CTA 點擊。",
    confidence: 89
  },
  {
    id: "power-saving-bundle",
    name: "省電冷房組合",
    proposition: "冷得剛好，也把電費控制好",
    audience: "在意電費、租屋預算有限、想改善悶熱睡眠的人",
    productLogic: "主推一級能效商品，搭配循環與遮光商品讓節能理由更完整。",
    rewardLogic: "用延長保固與節能小物強化長期價值感。",
    channels: ["EDM 節能教育", "搜尋廣告文案", "會員分眾券"],
    hypothesis: "將商品從單品比較改為節能方案，可提高中階商品加入購物車比例。",
    confidence: 84
  }
];

export const campaignPageSections: PageSection[] = [
  {
    eyebrow: "Customer Need",
    title: "租屋不能施工，也想要真正涼下來",
    body: "從小坪數、電費、安裝限制三個痛點出發，整理能立即使用的冷房組合。",
    cta: "查看省電冷房組合"
  },
  {
    eyebrow: "Solution",
    title: "三步驟打造小空間冷房",
    body: "先阻隔熱源，再提高空氣循環，最後選擇適合坪數的主力冷房設備。",
    cta: "選擇我的坪數"
  },
  {
    eyebrow: "Reward",
    title: "滿額帶走涼感與節能加碼",
    body: "指定組合享涼感毯、智慧插座或電費折抵券，讓購買理由更完整。",
    cta: "領取活動贈獎"
  }
];

export const rewardPageSections: PageSection[] = [
  {
    eyebrow: "Scenario",
    title: "依生活情境找到最適合的贈獎",
    body: "租屋降溫、親子出遊、新鮮人搬家，每一組贈獎都對應一個消費者需求。",
    cta: "瀏覽情境贈獎"
  },
  {
    eyebrow: "Threshold",
    title: "依消費門檻選擇行動理由",
    body: "從低門檻小禮到高單價加碼，讓顧客知道差一點就能得到什麼。",
    cta: "查看滿額贈"
  },
  {
    eyebrow: "Member",
    title: "會員專屬贈獎讓溝通更精準",
    body: "根據新客、回購客與高價值會員，整理不同的贈獎與推播角度。",
    cta: "查看會員贈"
  }
];

export const feedbackItems = [
  {
    label: "需求假設",
    value: "成立",
    detail: "租屋限制相關文案帶來最高互動"
  },
  {
    label: "最有效區塊",
    value: "三步驟冷房",
    detail: "頁面停留與商品點擊集中在方案比較"
  },
  {
    label: "贈獎影響",
    value: "+18%",
    detail: "電費折抵券提升高單價組合 CTA"
  },
  {
    label: "下一步",
    value: "延伸",
    detail: "可拓展成小空間睡眠與收納企劃"
  }
];
