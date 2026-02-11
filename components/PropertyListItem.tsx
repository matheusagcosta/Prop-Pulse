
import React from 'react';
import { Property } from '../types';

interface PropertyListItemProps {
  property: Property;
}

export const PropertyListItem: React.FC<PropertyListItemProps> = ({ property }) => {
  const isRisk = property.isAtRisk && property.occupancy < 85;

  return (
    <div className={`bg-white dark:bg-card-dark p-4 rounded-2xl shadow-sm border ${isRisk ? 'border-l-4 border-l-rose-500' : ''} border-slate-100 dark:border-slate-800 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer`}>
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-xl ${isRisk ? 'bg-rose-50 dark:bg-rose-900/10 text-rose-500' : 'bg-slate-100 dark:bg-slate-700 text-primary'} flex items-center justify-center`}>
          {isRisk ? (
            <div className="relative flex items-center justify-center">
              <div className="absolute w-3 h-3 bg-white rounded-full"></div>
              <span className="material-icons-round text-2xl relative z-10">error</span>
            </div>
          ) : (
            <span className="material-icons-round">apartment</span>
          )}
        </div>
        <div>
          <h4 className="font-bold text-sm">{property.name}</h4>
          <p className="text-[11px] text-slate-500">{property.units} units • {property.class}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 md:space-x-8">
        <div className="text-right">
          <p className={`text-sm font-bold ${isRisk ? 'text-rose-500' : ''}`}>{property.occupancy}%</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Occ</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold">${(property.revenue / 1000).toFixed(0)}k</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Rev</p>
        </div>
        <span className="material-icons-round text-slate-300 dark:text-slate-600 group-active:text-primary">chevron_right</span>
      </div>
    </div>
  );
};
