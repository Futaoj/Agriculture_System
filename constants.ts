
import { MarketData, InventoryItem } from './types';

export const CATEGORIES = ['谷物', '蔬菜', '水果', '畜禽', '水产'];

// 模拟扩展数据集，包含价格波动和季节性特征
export const INITIAL_MARKET_DATA: MarketData[] = [
  { id: '1', productName: '红富士苹果', category: '水果', price: 8.5, volume: 1200, region: '山东', date: '2023-10-01' },
  { id: '2', productName: '红富士苹果', category: '水果', price: 8.7, volume: 1100, region: '山东', date: '2023-10-02' },
  { id: '3', productName: '红富士苹果', category: '水果', price: 9.2, volume: 950, region: '山东', date: '2023-10-03' },
  { id: '4', productName: '红富士苹果', category: '水果', price: 9.5, volume: 800, region: '山东', date: '2023-10-04' },
  { id: '5', productName: '五常大米', category: '谷物', price: 12.0, volume: 5000, region: '黑龙江', date: '2023-10-01' },
  { id: '6', productName: '五常大米', category: '谷物', price: 12.1, volume: 4800, region: '黑龙江', date: '2023-10-02' },
  { id: '7', productName: '生猪(外三元)', category: '畜禽', price: 16.5, volume: 30000, region: '四川', date: '2023-10-01' },
  { id: '8', productName: '生猪(外三元)', category: '畜禽', price: 15.8, volume: 32000, region: '四川', date: '2023-10-02' },
  { id: '9', productName: '大白菜', category: '蔬菜', price: 1.2, volume: 8000, region: '河北', date: '2023-10-01' },
  { id: '10', productName: '大白菜', category: '蔬菜', price: 1.5, volume: 7500, region: '河北', date: '2023-10-02' },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'w1', productName: '红富士苹果', stockLevel: 450, minThreshold: 200, warehouse: '冷库A', status: 'optimal' },
  { id: 'w2', productName: '五常大米', stockLevel: 120, minThreshold: 500, warehouse: '常温库B', status: 'low' },
  { id: 'w3', productName: '大白菜', stockLevel: 2000, minThreshold: 1000, warehouse: '中转场C', status: 'excess' },
  { id: 'w4', productName: '生猪(外三元)', stockLevel: 50, minThreshold: 100, warehouse: '养殖基地', status: 'low' },
];
