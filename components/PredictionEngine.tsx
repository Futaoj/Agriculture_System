
import React, { useState } from 'react';
import { getPricePrediction } from '../services/geminiService';
import { INITIAL_MARKET_DATA } from '../constants';
import { PredictionResult } from '../types';

const PredictionEngine: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [selectedProduct, setSelectedProduct] = useState('红富士苹果');

  const products = Array.from(new Set(INITIAL_MARKET_DATA.map(i => i.productName)));

  const handlePredict = async () => {
    setLoading(true);
    try {
      const history = INITIAL_MARKET_DATA.filter(i => i.productName === selectedProduct);
      const prediction = await getPricePrediction(history);
      setResult(prediction);
    } catch (err) {
      console.error(err);
      alert('预测服务暂时不可用，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">智能价格预测引擎</h3>
        <p className="text-gray-500 text-sm mb-6">
          基于 Gemini 大模型的深度推理能力，分析历史波动与市场因素。
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">选择农产品</label>
            <select 
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {products.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <button 
            disabled={loading}
            onClick={handlePredict}
            className="bg-emerald-600 text-white px-8 py-2 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 transition-all font-bold shadow-lg shadow-emerald-200 flex items-center gap-2"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-circle-notch animate-spin"></i>
                AI 分析中...
              </>
            ) : (
              <>
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                启动预测
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border shadow-sm flex flex-col items-center justify-center text-center">
            <p className="text-gray-500 text-sm mb-2">预测下期价格</p>
            <div className="text-4xl font-black text-gray-800 mb-4">
              ¥{result.nextPrice.toFixed(2)}
              <span className="text-sm font-normal text-gray-400 ml-1">/kg</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${
              result.trend === 'up' ? 'bg-red-50 text-red-600' : 
              result.trend === 'down' ? 'bg-emerald-50 text-emerald-600' : 
              'bg-blue-50 text-blue-600'
            }`}>
              <i className={`fa-solid ${
                result.trend === 'up' ? 'fa-arrow-trend-up' : 
                result.trend === 'down' ? 'fa-arrow-trend-down' : 
                'fa-equals'
              }`}></i>
              {result.trend === 'up' ? '看涨趋势' : result.trend === 'down' ? '看跌趋势' : '保持平稳'}
            </div>
            <div className="mt-6 w-full pt-6 border-t">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">模型置信度</span>
                <span className="font-bold text-emerald-600">{(result.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-1000" 
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm space-y-6">
            <div>
              <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                <i className="fa-solid fa-brain text-purple-500"></i>
                多维度因素分析
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed bg-purple-50 p-4 rounded-lg">
                {result.reasoning}
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                <i className="fa-solid fa-lightbulb text-amber-500"></i>
                供应链建议
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-emerald-500 pl-4">
                {result.suggestedAction}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionEngine;
