
import React from 'react';
import { Property, RiskType } from '../types';

interface RiskCardProps {
  property: Property;
}

export const RiskCard: React.FC<RiskCardProps> = ({ property }) => {
  const getRiskStyles = (type?: RiskType) => {
    switch (type) {
      case RiskType.Occupancy:
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/30',
          border: 'border-rose-100 dark:border-rose-900/50',
          icon: 'warning',
          iconBg: 'bg-rose-500',
          text: 'text-rose-600 dark:text-rose-400',
          detail: `${property.occupancy}% Occupancy`,
          subDetail: '14 Vacant Units',
        };
      case RiskType.Delinquency:
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/30',
          border: 'border-amber-100 dark:border-amber-900/50',
          icon: 'payment',
          iconBg: 'bg-amber-500',
          text: 'text-amber-600 dark:text-amber-400',
          detail: 'High Delinquency',
          subDetail: `$${(property.delinquency || 0).toLocaleString()} Past Due`,
        };
      case RiskType.Maintenance:
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/30',
          border: 'border-amber-100 dark:border-amber-900/50',
          icon: 'build',
          iconBg: 'bg-amber-500',
          text: 'text-amber-600 dark:text-amber-400',
          detail: `${property.openOrders} Open Orders`,
          subDetail: 'Aging: 4.2 days',
        };
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-100',
          icon: 'help',
          iconBg: 'bg-slate-400',
          text: 'text-slate-600',
          detail: 'Under Review',
          subDetail: 'Check logs',
        };
    }
  };

  const styles = getRiskStyles(property.riskReason);

  return (
    <div className={`min-w-[160px] md:min-w-[240px] ${styles.bg} border ${styles.border} p-4 md:p-5 rounded-2xl transition-transform hover:scale-[1.02] cursor-pointer`}>
      <div className="flex justify-between items-start mb-2 md:mb-4">
        <div className={`p-1.5 md:p-2.5 ${styles.iconBg} rounded-lg text-white`}>
          <span className="material-icons-round text-sm md:text-xl">{styles.icon}</span>
        </div>
      </div>
      <h3 className="font-bold text-sm md:text-base truncate">{property.name}</h3>
      <p className={`text-xs md:text-sm font-medium mt-1 ${styles.text}`}>{styles.detail}</p>
      <p className="text-[10px] md:text-xs text-slate-500 mt-2">{styles.subDetail}</p>
    </div>
  );
};
