
import React, { useState } from 'react';
import { MarketData } from '../types';
import { INITIAL_MARKET_DATA } from '../constants';
import { exportToExcel, importFromExcel } from '../services/excelService';

const MarketDataView: React.FC = () => {
  const [data, setData] = useState<MarketData[]>(INITIAL_MARKET_DATA);
  const [searchTerm, setSearchTerm] = useState('');

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const importedData = await importFromExcel(e.target.files[0]);
        const formattedData = importedData.map((item: any, index: number) => ({
          id: `imp-${Date.now()}-${index}`,
          productName: item.productName || item['名称'] || '未知',
          category: item.category || item['类别'] || '通用',
          price: parseFloat(item.price || item['价格'] || 0),
          volume: parseInt(item.volume || item['成交量'] || 0),
          region: item.region || item['地区'] || '未知',
          date: item.date || item['日期'] || new Date().toISOString().split('T')[0]
        }));
        setData([...formattedData, ...data]);
        alert('导入成功！');
      } catch (err) {
        alert('导入失败，请检查格式');
      }
    }
  };

  const downloadTemplate = () => {
    const template = [
      { '名称': '红富士苹果', '类别': '水果', '价格': 9.5, '成交量': 1000, '地区': '山东', '日期': '2023-10-05' },
      { '名称': '五常大米', '类别': '谷物', '价格': 12.5, '成交量': 500, '地区': '黑龙江', '日期': '2023-10-05' }
    ];
    exportToExcel(template, 'AgriPredict_Data_Template');
  };

  const handleExport = () => {
    exportToExcel(data, 'AgriPredict_Market_Data');
  };

  const filteredData = data.filter(item => 
    item.productName.includes(searchTerm) || item.category.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="搜索农产品..." 
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-64 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={downloadTemplate}
            className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-200"
          >
            <i className="fa-solid fa-download"></i>
            下载模板
          </button>
          <label className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg cursor-pointer hover:bg-emerald-100 transition-colors text-sm font-medium border border-emerald-200">
            <i className="fa-solid fa-file-import"></i>
            Excel 导入
            <input type="file" className="hidden" accept=".xlsx, .xls" onChange={handleImport} />
          </label>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 bg-white text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium border shadow-sm"
          >
            <i className="fa-solid fa-file-export"></i>
            导出数据
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b text-gray-600 text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-4">产品名称</th>
              <th className="px-6 py-4">类别</th>
              <th className="px-6 py-4">当前价格 (¥)</th>
              <th className="px-6 py-4">成交量</th>
              <th className="px-6 py-4">产地</th>
              <th className="px-6 py-4">采集日期</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{item.productName}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px]">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-emerald-600">¥{item.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-500">{item.volume}</td>
                <td className="px-6 py-4 text-gray-500">{item.region}</td>
                <td className="px-6 py-4 text-gray-500">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketDataView;
