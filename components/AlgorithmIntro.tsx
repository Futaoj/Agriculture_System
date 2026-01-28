
import React from 'react';

const AlgorithmIntro: React.FC = () => {
  const openSourceDatasets = [
    {
      name: 'FAOSTAT (联合国粮农组织)',
      desc: '提供全球 245 个国家/地区的农业生产、价格、贸易和土地利用数据。',
      url: 'https://www.fao.org/faostat/en/#data/PP',
      tag: '权威/国际'
    },
    {
      name: 'Kaggle: Crop Price Prediction',
      desc: '包含多种农产品的历史价格、降雨量、农药使用量及产量数据，适合回归模型训练。',
      url: 'https://www.kaggle.com/datasets',
      tag: '机器学习/竞赛'
    },
    {
      name: '全国农产品批发市场价格信息',
      desc: '由中国农业农村部发布，包含蔬菜、水果、畜禽等每日批发均价，极具时效性。',
      url: 'http://zdscxx.moa.gov.cn/',
      tag: '国内/实时'
    },
    {
      name: 'UCI Machine Learning Repo',
      desc: '经典的机器学习数据集仓库，包含大豆疾病、水稻分类等农业研究数据集。',
      url: 'https://archive.ics.uci.edu/ml/datasets.php',
      tag: '学术/经典'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. 核心算法部分 */}
      <section className="bg-white p-8 rounded-xl border shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <i className="fa-solid fa-microchip text-emerald-600"></i>
          核心算法与数学模型
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-emerald-700 border-b pb-2">1. 价格预测模型 (LLM-Regression)</h3>
            <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
              <p className="mb-2"><strong>模型选择：</strong> Gemini-3-Flash-Preview</p>
              <p className="mb-2"><strong>输入特征：</strong> [P, V, S, M, W]</p>
              <p className="text-gray-500 italic text-xs">P:价格, V:销量, S:季节, M:政策情绪, W:天气波动</p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              本系统利用 LLM 的逻辑推理能力，不仅拟合数值规律，还能理解<strong>“猪周期”</strong>、<strong>“拉尼娜现象”</strong>等复杂的非结构化外部因素，实现比传统 LSTM 更有深度的价格预测。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-700 border-b pb-2">2. 供应链优化 (Safety Stock & ROP)</h3>
            <div className="bg-gray-50 p-4 rounded-lg text-sm italic">
              <div className="bg-white p-3 rounded border text-center font-mono">
                ROP = (d * L) + (Z * σ_d * √L)
              </div>
              <p className="mt-2 text-xs text-gray-500">
                再订货点 (ROP) = 提前期需求 + 安全库存
              </p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              系统通过预测价格走势动态调整订货系数。若预测价格将暴涨，系统会自动调高 Z 系数，通过<strong>“策略性备货”</strong>降低未来采购成本。
            </p>
          </div>
        </div>
      </section>

      {/* 2. 数据集推荐部分 (新增) */}
      <section className="bg-white p-8 rounded-xl border shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <i className="fa-solid fa-link text-blue-600"></i>
          推荐开源数据集 (毕设可用)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {openSourceDatasets.map((ds) => (
            <div key={ds.name} className="p-4 border rounded-lg hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{ds.tag}</span>
                <a href={ds.url} target="_blank" rel="noreferrer" className="text-gray-400 group-hover:text-blue-500">
                  <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                </a>
              </div>
              <h4 className="font-bold text-gray-800 mb-1">{ds.name}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{ds.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3 items-start">
          <i className="fa-solid fa-circle-info text-amber-500 mt-1"></i>
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>小建议：</strong> 在撰写毕设时，建议先从 <strong>Kaggle</strong> 下载一个 CSV 文件作为系统的“演示数据集”。你可以利用本系统的 Excel 导入功能，将这些真实数据批量上传。
          </p>
        </div>
      </section>

      {/* 3. 数据库设计部分 */}
      <section className="bg-white p-8 rounded-xl border shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <i className="fa-solid fa-database text-amber-600"></i>
          数据库逻辑架构
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">表名</th>
                <th className="px-4 py-2 border">主要字段</th>
                <th className="px-4 py-2 border">用途描述</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border font-bold text-emerald-700">market_prices</td>
                <td className="px-4 py-2 border">date, prod_id, price, vol</td>
                <td className="px-4 py-2 border">存储多维历史行情数据</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-bold text-emerald-700">supply_chain_nodes</td>
                <td className="px-4 py-2 border">id, name, lat, lng, capacity</td>
                <td className="px-4 py-2 border">定义农场、仓库及市场节点</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border font-bold text-emerald-700">inventory_logs</td>
                <td className="px-4 py-2 border">node_id, prod_id, qty, status</td>
                <td className="px-4 py-2 border">监控实时库存健康状态</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AlgorithmIntro;
