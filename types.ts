
export enum PropertyClass {
  A = 'Class A',
  B = 'Class B',
  C = 'Class C',
}

export enum RiskType {
  Occupancy = 'Occupancy',
  Delinquency = 'Delinquency',
  Maintenance = 'Maintenance',
}

export interface Property {
  id: string;
  name: string;
  units: number;
  class: PropertyClass;
  occupancy: number;
  revenue: number;
  isAtRisk?: boolean;
  riskReason?: RiskType;
  delinquency?: number;
  openOrders?: number;
}

export interface PortfolioMetric {
  label: string;
  value: string | number;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
  subtitle?: string;
  visualType: 'bar' | 'progress' | 'avatars' | 'badge';
}
