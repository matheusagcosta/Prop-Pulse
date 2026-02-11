
import { Property, PropertyClass, RiskType } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Skyline Lofts',
    units: 240,
    class: PropertyClass.A,
    occupancy: 98,
    revenue: 384000,
  },
  {
    id: '2',
    name: 'Blue Bonnet Gardens',
    units: 180,
    class: PropertyClass.B,
    occupancy: 92,
    revenue: 210000,
  },
  {
    id: '3',
    name: 'Riverside Apartments',
    units: 120,
    class: PropertyClass.C,
    occupancy: 82,
    revenue: 142000,
    isAtRisk: true,
    riskReason: RiskType.Occupancy,
  },
  {
    id: '4',
    name: 'Cedar Hollow',
    units: 320,
    class: PropertyClass.A,
    occupancy: 96,
    revenue: 512000,
  },
  {
    id: '5',
    name: 'The Heights',
    units: 150,
    class: PropertyClass.B,
    occupancy: 88,
    revenue: 195000,
    isAtRisk: true,
    riskReason: RiskType.Delinquency,
    delinquency: 12000,
  },
  {
    id: '6',
    name: 'Oak Creek',
    units: 200,
    class: PropertyClass.B,
    occupancy: 91,
    revenue: 245000,
    isAtRisk: true,
    riskReason: RiskType.Maintenance,
    openOrders: 23,
  },
];

export const TIME_RANGES = ['Last 30 Days', 'Quarter to Date', 'Year to Date'];

export const TENANT_AVATARS = [
  'https://picsum.photos/seed/p1/64/64',
  'https://picsum.photos/seed/p2/64/64',
  'https://picsum.photos/seed/p3/64/64',
];
