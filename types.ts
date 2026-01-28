
export interface MarketData {
  id: string;
  productName: string;
  category: string;
  price: number;
  volume: number;
  region: string;
  date: string;
}

export interface PredictionResult {
  nextPrice: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  reasoning: string;
  suggestedAction: string;
}

export interface InventoryItem {
  id: string;
  productName: string;
  stockLevel: number;
  minThreshold: number;
  warehouse: string;
  status: 'optimal' | 'low' | 'excess';
}

export interface SupplyChainNode {
  id: string;
  name: string;
  type: 'Farm' | 'Warehouse' | 'Market';
  location: [number, number];
}
