
import React from 'react';
import { Property, RiskType } from '../types';

interface PropertyTableProps {
  properties: Property[];
  onSeeAll?: () => void;
}

export const PropertyTable: React.FC<PropertyTableProps> = ({ properties, onSeeAll }) => {
  const getStatusBadge = (p: Property) => {
    if (p.isAtRisk && p.riskReason === RiskType.Occupancy) {
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
          Critical
        </span>
      );
    }
    if (p.isAtRisk) {
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
          Warning
        </span>
      );
    }
    // Any other case is STABLE (Removing OPTIMAL)
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400">
        Stable
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-card-dark rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Property</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Occupancy</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delinquency</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {properties.length > 0 ? (
              properties.map((p) => {
                const isCritical = p.isAtRisk && p.riskReason === RiskType.Occupancy;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center ${isCritical ? 'bg-rose-50 dark:bg-rose-900/10' : 'bg-slate-100 dark:bg-slate-800'}`}>
                          {isCritical ? (
                            <div className="relative flex items-center justify-center scale-90">
                              <div className="absolute w-3 h-3 bg-white rounded-full"></div>
                              <span className="material-icons-round text-rose-500 text-2xl relative z-10">error</span>
                            </div>
                          ) : (
                            <span className="material-icons-round text-primary text-xl">apartment</span>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{p.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{p.units} units • {p.class}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col space-y-2 max-w-[100px]">
                        <span className={`text-sm font-bold ${isCritical ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>{p.occupancy}%</span>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-700 ${isCritical ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                            style={{ width: `${p.occupancy}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">${p.revenue.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-sm font-bold ${p.delinquency && p.delinquency > 5000 ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
                        ${p.delinquency ? p.delinquency.toLocaleString() : '0'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {getStatusBadge(p)}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors">
                        <span className="material-icons-round text-xl">chevron_right</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium text-xs">
                  No properties found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center p-6 border-t border-slate-50 dark:border-slate-800 bg-slate-50/10 dark:bg-slate-800/10">
        <button 
          onClick={onSeeAll}
          className="text-xs font-bold text-primary hover:underline transition-colors"
        >
          See All Properties
        </button>
      </div>
    </div>
  );
};
