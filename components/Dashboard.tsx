
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Legend
} from 'recharts';
import { INITIAL_MARKET_DATA, INITIAL_INVENTORY } from '../constants';

const Dashboard: React.FC = () => {
  const stats = [
    { label: '监测品种', value: '24', icon: 'fa-tags', color: 'bg-blue-500' },
    { label: '平均价格', value: '¥12.5/kg', icon: 'fa-money-bill-wave', color: 'bg-emerald-500' },
    { label: '库存预警', value: '3', icon: 'fa-triangle-exclamation', color: 'bg-amber-500' },
    { label: '预测准确率', value: '94.2%', icon: 'fa-bullseye', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border shadow-sm flex items-center gap-4">
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl shadow-lg`}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price Trend Chart */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">主流农产品价格趋势</h3>
            <select className="text-sm border rounded-md px-2 py-1 outline-none">
              <option>最近7天</option>
              <option>最近30天</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={INITIAL_MARKET_DATA}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Status Bar Chart */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">供应链库存分布</h3>
            <span className="text-xs text-gray-400 font-normal">单位: 吨</span>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INITIAL_INVENTORY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="productName" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="stockLevel" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
