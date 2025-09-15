import { GoogleGenAI, Type } from "@google/genai";
import { HiscoresData, BossSetups } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getHiscores = async (rsn: string): Promise<HiscoresData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate Old School RuneScape hiscores data for the player "${rsn}". Include all skills. If the player doesn't exist, return an empty array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              skill: { type: Type.STRING },
              rank: { type: Type.INTEGER },
              level: { type: Type.INTEGER },
              xp: { type: Type.INTEGER },
            },
          },
        },
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("Received empty response from API.");
    }
    return JSON.parse(jsonText) as HiscoresData;
  } catch (error) {
    console.error("Error fetching hiscores from Gemini API:", error);
    throw new Error(`Failed to fetch hiscores for ${rsn}. The player might not exist or there was an API error.`);
  }
};


export const getGearSetups = async (bossName: string): Promise<BossSetups> => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate three Old School RuneScape gear setups for fighting "${bossName}": a 'budget' setup, a 'mid-tier' setup, and a 'max' gear setup. For each setup, list the recommended item for each gear slot: head, cape, neck, ammo, weapon, body, shield, legs, hands, feet, ring, and a special attack weapon.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              budget: {
                type: Type.OBJECT,
                properties: {
                  head: { type: Type.STRING },
                  cape: { type: Type.STRING },
                  neck: { type: Type.STRING },
                  ammo: { type: Type.STRING },
                  weapon: { type: Type.STRING },
                  body: { type: Type.STRING },
                  shield: { type: Type.STRING },
                  legs: { type: Type.STRING },
                  hands: { type: Type.STRING },
                  feet: { type: Type.STRING },
                  ring: { type: Type.STRING },
                  special: { type: Type.STRING },
                },
              },
              midTier: {
                type: Type.OBJECT,
                properties: {
                  head: { type: Type.STRING },
                  cape: { type: Type.STRING },
                  neck: { type: Type.STRING },
                  ammo: { type: Type.STRING },
                  weapon: { type: Type.STRING },
                  body: { type: Type.STRING },
                  shield: { type: Type.STRING },
                  legs: { type: Type.STRING },
                  hands: { type: Type.STRING },
                  feet: { type: Type.STRING },
                  ring: { type: Type.STRING },
                  special: { type: Type.STRING },
                },
              },
              max: {
                type: Type.OBJECT,
                properties: {
                  head: { type: Type.STRING },
                  cape: { type: Type.STRING },
                  neck: { type: Type.STRING },
                  ammo: { type: Type.STRING },
                  weapon: { type: Type.STRING },
                  body: { type: Type.STRING },
                  shield: { type: Type.STRING },
                  legs: { type: Type.STRING },
                  hands: { type: Type.STRING },
                  feet: { type: Type.STRING },
                  ring: { type: Type.STRING },
                  special: { type: Type.STRING },
                },
              },
            },
          },
        },
      });
      
      const jsonText = response.text.trim();
      if (!jsonText) {
          throw new Error("Received empty response from API.");
      }
      return JSON.parse(jsonText) as BossSetups;
    } catch (error) {
      console.error("Error fetching gear setups from Gemini API:", error);
      throw new Error(`Failed to fetch gear setups for ${bossName}.`);
    }
  };

export const getDropImage = async (itemName: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Find the URL for a detail or inventory image of the Old School RuneScape item "${itemName}" from the oldschool.runescape.wiki domain.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        imageUrl: { type: Type.STRING }
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        const parsed = JSON.parse(jsonText);
        if (parsed.imageUrl) {
            return parsed.imageUrl;
        }
        // Fallback if no image is found
        return 'https://oldschool.runescape.wiki/images/Bank_icon.png';
    } catch (error) {
        console.error("Error fetching drop image from Gemini API:", error);
        // Return a default placeholder image on error
        return 'https://oldschool.runescape.wiki/images/Bank_icon.png';
    }
};