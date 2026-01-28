
import React from 'react';
import { INITIAL_INVENTORY } from '../constants';

const InventoryManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 text-white p-6 rounded-xl shadow-lg">
          <p className="opacity-80 text-sm">入库总量 (本月)</p>
          <p className="text-3xl font-black mt-1">1,240 <span className="text-sm font-normal">吨</span></p>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="bg-emerald-500 px-2 py-0.5 rounded">+12% 同比</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-gray-500 text-sm">平均周转率</p>
          <p className="text-3xl font-black text-gray-800 mt-1">85.4%</p>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="text-emerald-600 font-bold">健康水平</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-gray-500 text-sm">在途物资</p>
          <p className="text-3xl font-black text-gray-800 mt-1">42 <span className="text-sm font-normal">标箱</span></p>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className="text-blue-600 font-bold">实时追踪中</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="font-bold text-gray-800">实时库存监控面板</h3>
          <button className="text-sm text-emerald-600 font-medium hover:underline">查看所有仓库</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b text-gray-600 text-sm">
                <th className="px-6 py-4">产品</th>
                <th className="px-6 py-4">仓库位置</th>
                <th className="px-6 py-4">当前存量</th>
                <th className="px-6 py-4">库存状态</th>
                <th className="px-6 py-4">操作建议</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {INITIAL_INVENTORY.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.productName}</td>
                  <td className="px-6 py-4 text-gray-500">{item.warehouse}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-800 font-bold">{item.stockLevel}</span>
                      <div className="w-24 bg-gray-100 h-1.5 rounded-full">
                        <div 
                          className={`h-full rounded-full ${
                            item.status === 'low' ? 'bg-red-500' : 
                            item.status === 'excess' ? 'bg-amber-500' : 
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min((item.stockLevel / item.minThreshold) * 50, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      item.status === 'low' ? 'bg-red-50 text-red-600' : 
                      item.status === 'excess' ? 'bg-amber-50 text-amber-600' : 
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {item.status === 'low' ? '库存不足' : item.status === 'excess' ? '积压预警' : '库存健康'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                      {item.status === 'low' ? '立即补货' : item.status === 'excess' ? '促销/分流' : '详情'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;
