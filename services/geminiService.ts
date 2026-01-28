
import { GoogleGenAI, Type } from "@google/genai";
import { MarketData, PredictionResult } from "../types";

export const getPricePrediction = async (history: MarketData[]): Promise<PredictionResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const historyText = history.map(h => `日期: ${h.date}, 价格: ${h.price}, 成交量: ${h.volume}`).join('\n');

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `基于以下农产品历史价格数据，预测下个周期的价格走向并给出供应链优化策略。
    
    历史数据：
    ${historyText}
    
    请输出JSON格式。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          nextPrice: { type: Type.NUMBER, description: "预测价格" },
          trend: { type: Type.STRING, description: "趋势: up, down, stable" },
          confidence: { type: Type.NUMBER, description: "置信度 (0-1)" },
          reasoning: { type: Type.STRING, description: "市场因素分析" },
          suggestedAction: { type: Type.STRING, description: "供应链优化建议" }
        },
        required: ["nextPrice", "trend", "confidence", "reasoning", "suggestedAction"]
      }
    }
  });

  return JSON.parse(response.text);
};
