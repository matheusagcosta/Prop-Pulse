
import React from 'react';
import { Property, RiskType } from '../types';

interface PriorityRiskListProps {
  properties: Property[];
}

export const PriorityRiskList: React.FC<PriorityRiskListProps> = ({ properties }) => {
  const getRiskTheme = (type?: RiskType) => {
    switch (type) {
      case RiskType.Occupancy: 
        return { 
          icon: 'error', 
          bg: 'bg-rose-50 dark:bg-rose-900/10', 
          text: 'text-rose-500 dark:text-rose-400',
          badgeLabel: 'Critical',
          badgeClass: 'bg-rose-100/50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300'
        };
      case RiskType.Delinquency: 
        return { 
          icon: 'warning', 
          bg: 'bg-amber-50 dark:bg-amber-900/10', 
          text: 'text-amber-500 dark:text-amber-400',
          badgeLabel: 'Warning',
          badgeClass: 'bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
        };
      case RiskType.Maintenance: 
        return { 
          icon: 'warning', 
          bg: 'bg-amber-50 dark:bg-amber-900/10', 
          text: 'text-amber-500 dark:text-amber-400',
          badgeLabel: 'Warning',
          badgeClass: 'bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
        };
      default: 
        return { 
          icon: 'info', 
          bg: 'bg-slate-50 dark:bg-slate-800', 
          text: 'text-slate-500',
          badgeLabel: 'Update',
          badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-500'
        };
    }
  };

  return (
    <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col h-full shadow-sm overflow-hidden">
      <div className="p-6 flex justify-between items-center border-b border-slate-50 dark:border-slate-800">
        <h3 className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em]">Priority risks</h3>
        <button className="text-xs font-semibold text-primary hover:underline transition-colors">See all</button>
      </div>
      
      <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800/50">
        {properties.map((p) => {
          const theme = getRiskTheme(p.riskReason);
          const isCritical = p.riskReason === RiskType.Occupancy;
          
          return (
            <div key={p.id} className="p-4 flex items-center space-x-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 cursor-pointer transition-colors group">
              {/* Solid Color Icon Area matching the provided image style */}
              <div className={`w-12 h-12 flex-shrink-0 rounded-[14px] ${theme.bg} flex items-center justify-center transition-transform group-hover:scale-105`}>
                <div className="relative flex items-center justify-center">
                  {/* Small white circle behind to ensure the exclamation mark hole in the font looks white */}
                  <div className="absolute w-4 h-4 bg-white rounded-full"></div>
                  <span className={`material-icons-round ${theme.text} text-3xl relative z-10`}>{theme.icon}</span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">{p.name}</h4>
                  <div className={`flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-tighter ${theme.badgeClass}`}>
                     <span>{theme.badgeLabel}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                  {p.riskReason === RiskType.Occupancy && `Critical occupancy drop: ${p.occupancy}% units filled.`}
                  {p.riskReason === RiskType.Delinquency && `Outstanding delinquency: $${p.delinquency?.toLocaleString()}.`}
                  {p.riskReason === RiskType.Maintenance && `High maintenance volume: ${p.openOrders} pending.`}
                </p>
              </div>

              <span className="material-icons-round text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors">chevron_right</span>
            </div>
          );
        })}
      </div>
      
      <div className="m-4 p-4 bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl">
         <div className="flex space-x-3 items-start">
            <span className="material-icons-round text-indigo-400 text-sm mt-0.5">auto_awesome</span>
            <p className="text-[11px] leading-relaxed text-indigo-600 dark:text-indigo-300">
               Focus on <strong>{properties[0]?.name}</strong> to stabilize your Austin metro portfolio score.
            </p>
         </div>
      </div>
    </div>
  );
};
