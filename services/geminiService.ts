
import { GoogleGenAI, Type } from "@google/genai";
import { AIWealthStrategy } from "../types";

export interface NetworkNode {
  id: string;
  location: string;
  status: 'OPTIMAL' | 'ENCRYPTED' | 'STABLE';
  latency: string;
  throughput: string;
  coordinates: { x: number, y: number };
}

export const generateWealthStrategy = async (userProfile: string): Promise<AIWealthStrategy> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Act as a high-end quantitative hedge fund advisor. Generate a sophisticated investment strategy for a user with these goals/profile: "${userProfile}". Focus on futuristic and diverse assets.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          strategyName: { type: Type.STRING },
          riskProfile: { type: Type.STRING },
          projectedReturn: { type: Type.STRING },
          allocation: { 
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                asset: { type: Type.STRING },
                percentage: { type: Type.NUMBER }
              },
              required: ["asset", "percentage"]
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["strategyName", "riskProfile", "projectedReturn", "allocation", "summary"]
      }
    }
  });

  return JSON.parse(response.text || '{}') as AIWealthStrategy;
};

export const generateNetworkTopology = async (): Promise<NetworkNode[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Generate a list of 8 global quantum financial nodes for a high-tech ecosystem. Include realistic city names, low latency (ms), high throughput (Tbps), and random coordinates between 10 and 90 for X and Y.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            location: { type: Type.STRING },
            status: { type: Type.STRING, enum: ['OPTIMAL', 'ENCRYPTED', 'STABLE'] },
            latency: { type: Type.STRING },
            throughput: { type: Type.STRING },
            coordinates: {
              type: Type.OBJECT,
              properties: {
                x: { type: Type.NUMBER },
                y: { type: Type.NUMBER }
              },
              required: ['x', 'y']
            }
          },
          required: ['id', 'location', 'status', 'latency', 'throughput', 'coordinates']
        }
      }
    }
  });

  return JSON.parse(response.text || '[]') as NetworkNode[];
};
