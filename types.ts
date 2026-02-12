
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface InvestmentAsset {
  id: number;
  name: string;
  ticker: string;
  growth: string;
  icon: string;
}

export interface AIWealthStrategy {
  strategyName: string;
  riskProfile: string;
  projectedReturn: string;
  allocation: { asset: string; percentage: number }[];
  summary: string;
}

export type WorkflowPlan = {
  name: string;
  steps: Array<{
    id: string;
    title: string;
    description: string;
    type: "trigger" | "action" | "condition";
  }>;
  outcome: string;
};