
import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  comparison?: string;
  children?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  trendDirection = 'up',
  comparison,
  children,
}) => {
  const trendBg = trendDirection === 'up' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400';
  
  return (
    <div className="bg-white dark:bg-card-dark p-6 rounded-[24px] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.1em]">
          {label}
        </p>
        {trend && (
          <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-[11px] font-bold ${trendBg}`}>
            {trendDirection === 'up' ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-baseline mb-auto">
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{value}</span>
        </div>
        
        {children && (
          <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/50">
            {children}
          </div>
        )}

        {comparison && !children && (
          <p className="mt-2 text-[10px] md:text-[11px] text-slate-400">
            vs <span className="text-slate-500 font-medium">{comparison}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export const MiniBarChart: React.FC = () => (
  <div className="h-8 flex items-end space-x-1.5 opacity-80">
    <div className="flex-1 bg-primary/20 h-[30%] rounded-sm"></div>
    <div className="flex-1 bg-primary/20 h-[50%] rounded-sm"></div>
    <div className="flex-1 bg-primary/20 h-[45%] rounded-sm"></div>
    <div className="flex-1 bg-primary/20 h-[70%] rounded-sm"></div>
    <div className="flex-1 bg-primary h-[100%] rounded-sm shadow-[0_0_8px_rgba(37,99,235,0.3)]"></div>
  </div>
);

export const ProgressBar: React.FC<{ percent: number; color?: string }> = ({
  percent,
  color = 'bg-primary',
}) => (
  <div className="space-y-2">
    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
      <div className={`${color} h-full transition-all duration-700 ease-out`} style={{ width: `${Math.min(percent, 100)}%` }}></div>
    </div>
    <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
       <span>Goal Progress</span>
       <span className="text-primary">{percent}%</span>
    </div>
  </div>
);

export const AvatarGroup: React.FC<{ avatars: string[]; extraCount: number }> = ({
  avatars,
  extraCount,
}) => (
  <div className="flex items-center justify-between">
    <div className="flex -space-x-2">
      {avatars.map((src, i) => (
        <div
          key={i}
          className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden bg-slate-200"
        >
          <img src={src} alt={`User ${i}`} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-500">
        +{extraCount}
      </div>
    </div>
    <span className="text-[10px] font-bold text-primary hover:underline cursor-pointer">Active</span>
  </div>
);
