
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '控制台', icon: 'fa-chart-line' },
    { path: '/market', label: '市场数据', icon: 'fa-store' },
    { path: '/predict', label: '价格预测', icon: 'fa-robot' },
    { path: '/inventory', label: '库存优化', icon: 'fa-boxes-stacked' },
    { path: '/algorithms', label: '算法原理', icon: 'fa-book' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-900 text-white flex flex-col shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-leaf text-emerald-400"></i>
            AgriPredict
          </h1>
          <p className="text-xs text-emerald-300 mt-1">智慧农产品决策系统</p>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-emerald-700 text-white' 
                  : 'text-emerald-100 hover:bg-emerald-800'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5`}></i>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-emerald-800">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold">A</div>
            <div>
              <p className="text-sm font-medium">管理员</p>
              <p className="text-xs text-emerald-300">本科生毕业设计</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-emerald-600 transition-colors">
              <i className="fa-regular fa-bell text-lg"></i>
            </button>
            <div className="h-8 w-[1px] bg-gray-200"></div>
            <span className="text-sm text-gray-600">{new Date().toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
