
import React, { useState, useEffect, useMemo } from 'react';
import { PROPERTIES, TIME_RANGES, TENANT_AVATARS } from './constants';
import { MetricCard, MiniBarChart, ProgressBar, AvatarGroup } from './components/MetricCard';
import { PropertyListItem } from './components/PropertyListItem';
import { PriorityRiskList } from './components/PriorityRiskList';
import { PropertyTable } from './components/PropertyTable';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [timeRange, setTimeRange] = useState(TIME_RANGES[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'list'>('table');
  
  // New States for Search and Pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState<number | 'All'>(10);
  const [isPageSizeDropdownOpen, setIsPageSizeDropdownOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const NavItems = [
    { label: 'Overview', icon: 'dashboard' },
    { label: 'Properties', icon: 'apartment' },
    { label: 'Insights', icon: 'analytics' },
    { label: 'Alerts', icon: 'notifications', badge: true },
    { label: 'Settings', icon: 'settings' },
  ];

  const atRiskProperties = PROPERTIES.filter((p) => p.isAtRisk);

  // Filtering and Pagination Logic
  const filteredAndPaginatedProperties = useMemo(() => {
    let filtered = PROPERTIES.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.class.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (pageSize === 'All') return filtered;
    return filtered.slice(0, pageSize);
  }, [searchQuery, pageSize]);

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-col sticky top-0 h-screen z-50">
        <div className="p-8">
          <div className="flex items-center space-x-3 text-primary">
            <span className="material-symbols-outlined text-3xl font-bold">domain</span>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">PropPulse</span>
          </div>
        </div>
        <nav className="flex-1 px-6 space-y-2">
          {NavItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-semibold transition-all relative ${
                activeTab === item.label
                  ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-icons-round">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
              {item.badge && (
                <span className="absolute right-4 w-2 h-2 bg-rose-500 rounded-full"></span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-6 mt-auto border-t border-slate-100 dark:border-slate-800">
          <button onClick={toggleDarkMode} className="flex items-center space-x-3 p-3 w-full text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <span className="material-icons-round">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            <span className="text-xs font-semibold uppercase tracking-wider">{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 md:px-8 py-3 md:h-20 md:flex md:items-center md:justify-between border-b border-transparent md:border-slate-200 md:dark:border-slate-800 md:bg-white/80 md:dark:bg-slate-900/80">
          <div className="flex items-center justify-between md:hidden mb-2">
             <div className="flex items-center space-x-2 text-primary">
                <span className="material-symbols-outlined text-2xl font-bold">domain</span>
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">PropPulse</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <span className="material-icons-round text-xl">search</span>
                </button>
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm">
                  <img
                    alt="User"
                    className="w-full h-full object-cover"
                    src="https://picsum.photos/seed/alex/100/100"
                  />
                </div>
              </div>
          </div>

          <div className="hidden md:flex flex-1 items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2.5 max-w-md mr-8">
            <span className="material-icons-round text-slate-400 text-xl">search</span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 ml-2"
              placeholder="Search properties, reports..."
              type="text"
            />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* User Profile in Header - Visible on Desktop only */}
            <div className="flex items-center space-x-3 p-1.5 md:p-2 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 overflow-hidden ring-2 ring-white dark:ring-slate-900 shadow-sm">
                <img
                  alt="User"
                  className="w-full h-full object-cover"
                  src="https://picsum.photos/seed/alex/100/100"
                />
              </div>
              <div className="hidden lg:block min-w-0 pr-1">
                <p className="text-[11px] font-bold truncate text-slate-900 dark:text-white leading-tight">Alex Rivera</p>
                <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate leading-tight">Portfolio Lead</p>
              </div>
              <span className="material-icons-round text-slate-400 text-sm hidden lg:block">expand_more</span>
            </div>
          </div>
        </header>

        <main className="px-6 md:px-10 pb-24 md:pb-12 pt-6 md:pt-10 space-y-10 max-w-[1600px] mx-auto w-full">
          <section className="flex flex-col md:flex-row md:items-end md:justify-between space-y-2 md:space-y-0">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none whitespace-nowrap">Portfolio Overview</h1>
                
                {/* Time Range Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
                  >
                    <span>{timeRange}</span>
                    <span className={`material-icons-round text-sm transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                  </button>
                  
                  {isDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                      <div className="absolute left-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                        {TIME_RANGES.map((range) => (
                          <button
                            key={range}
                            onClick={() => {
                              setTimeRange(range);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${
                              timeRange === range 
                                ? 'bg-primary/10 text-primary' 
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium mt-2">42 Properties • Austin Metro Region</p>
            </div>
          </section>

          {/* Top Section: Metrics + Risk List with uniform gaps */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <MetricCard
                label="Occupancy"
                value="94.2%"
                trend="4"
                trendDirection="up"
                comparison="90.2% (last month)"
              >
                <MiniBarChart />
              </MetricCard>
              <MetricCard
                label="Revenue vs Goal"
                value="$3.2M"
                trend="2"
                trendDirection="up"
              >
                <ProgressBar percent={102} />
              </MetricCard>
              <MetricCard
                label="Open Orders"
                value="142"
                trend="8"
                trendDirection="down"
                comparison="134 (last week)"
              />
              <MetricCard
                label="Renewal Rate"
                value="68%"
                trend="2"
                trendDirection="down"
              >
                 <AvatarGroup avatars={TENANT_AVATARS} extraCount={12} />
              </MetricCard>
            </div>

            {/* Risk List */}
            <div className="lg:col-span-1 h-full min-h-[400px]">
              <PriorityRiskList properties={atRiskProperties} />
            </div>
          </section>

          <section>
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 space-y-4 xl:space-y-0">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Performance Breakdown</h2>
              
              <div className="flex flex-col xl:flex-row gap-3 w-full xl:w-auto xl:items-center">
                
                {/* Mobile Row 1: Search (Flexible) + Toggle (Fixed) */}
                <div className="flex items-center gap-3 w-full xl:w-auto">
                  {/* Filter by name input - grows */}
                  <div className="flex-1 xl:w-64 flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 h-10 focus-within:border-primary/50 transition-colors">
                    <span className="material-icons-round text-slate-400 text-lg">search</span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter by name..."
                      className="bg-transparent border-none focus:ring-0 text-[11px] font-medium w-full placeholder:text-slate-400 ml-1.5"
                    />
                  </div>

                  {/* View Mode Toggle - Fixed width */}
                  <div className="w-[84px] flex-shrink-0 flex bg-slate-100 dark:bg-slate-800 p-1 h-10 rounded-xl border border-slate-200 dark:border-slate-700 justify-center">
                     <button 
                      onClick={() => setViewMode('table')}
                      className={`flex items-center px-1.5 rounded-lg transition-all flex-1 justify-center ${viewMode === 'table' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                     >
                       <span className="material-icons-round text-sm">grid_view</span>
                     </button>
                     <button 
                      onClick={() => setViewMode('list')}
                      className={`flex items-center px-1.5 rounded-lg transition-all flex-1 justify-center ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                     >
                       <span className="material-icons-round text-sm">view_list</span>
                     </button>
                  </div>
                </div>

                {/* Mobile Row 2: Show (flexible/equal) + Sort (flexible/equal) */}
                <div className="flex items-center gap-3 w-full xl:w-auto">
                  {/* Page Size (Show) */}
                  <div className="flex-1 xl:w-auto relative">
                    <button 
                      onClick={() => setIsPageSizeDropdownOpen(!isPageSizeDropdownOpen)}
                      className="w-full flex items-center justify-between xl:justify-start space-x-2 text-xs font-bold bg-white dark:bg-slate-800 px-3 h-10 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-slate-500 hover:border-primary/30 transition-colors text-nowrap"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400 font-medium">Show:</span>
                        <span className="text-slate-900 dark:text-white">{pageSize}</span>
                      </div>
                      <span className={`material-icons-round text-sm text-slate-400 transition-transform ${isPageSizeDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    
                    {isPageSizeDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsPageSizeDropdownOpen(false)}></div>
                        <div className="absolute left-0 xl:right-0 mt-2 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1.5 z-20">
                          {[10, 25, 'All'].map((size) => (
                            <button
                              key={size}
                              onClick={() => {
                                setPageSize(size as any);
                                setIsPageSizeDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${
                                pageSize === size 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="flex-1 xl:w-auto">
                    <button className="w-full flex items-center justify-between xl:justify-start space-x-2 text-xs font-bold bg-white dark:bg-slate-800 px-3 h-10 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-slate-500 hover:border-primary/30 transition-colors text-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="material-icons-round text-sm text-slate-400">filter_list</span>
                        <span className="text-slate-400 font-medium">Sort:</span>
                        <span className="text-slate-900 dark:text-white">Occupancy</span>
                      </div>
                      <span className="material-icons-round text-sm text-slate-400">expand_more</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {viewMode === 'table' ? (
              <PropertyTable properties={filteredAndPaginatedProperties} onSeeAll={() => setPageSize('All')} />
            ) : (
              <div className="space-y-4">
                {filteredAndPaginatedProperties.map((p) => (
                  <PropertyListItem key={p.id} property={p} />
                ))}
                <div className="flex justify-center pt-8">
                  <button 
                    onClick={() => setPageSize('All')}
                    className="text-sm font-bold text-primary hover:underline transition-colors"
                  >
                    See All Properties
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe shadow-2xl">
          <div className="flex justify-around items-center h-16 px-4">
            {NavItems.slice(0, 4).map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex flex-col items-center flex-1 py-1 transition-colors ${
                  activeTab === item.label ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                <span className="material-icons-round">{item.icon}</span>
                <span className="text-[9px] font-bold mt-1 uppercase tracking-tighter">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default App;
