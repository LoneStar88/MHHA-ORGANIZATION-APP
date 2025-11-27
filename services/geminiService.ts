import { GoogleGenAI, Type, Modality } from "@google/genai";
import { JourneyType, SpiritAnimal } from "../types";

// Helper function to decode audio data
const decode = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Helper function to play audio buffer
const playAudioData = async (base64String: string) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioBuffer = await audioContext.decodeAudioData(decode(base64String).buffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
  } catch (error) {
    console.error("Error playing audio:", error);
  }
};

export const generateDailyContent = async (journey: JourneyType) => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Create a daily micro-learning lesson for a user focused on: ${journey}.
    Include:
    1. A catchy "Fact of the Day".
    2. A short, encouraging lesson (under 100 words).
    3. A single multiple-choice quiz question related to the lesson to test understanding.
    4. Four options for the quiz, one correct.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fact: { type: Type.STRING },
            lesson: { type: Type.STRING },
            quiz: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { 
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctIndex: { type: Type.INTEGER, description: "Index of the correct option (0-3)" }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Error generating content:", error);
    // Fallback content to prevent app crash
    return {
      fact: "Hydration is key to health.",
      lesson: "Drinking water helps regulate body temperature and maintain bodily functions. Try to sip water throughout the day.",
      quiz: {
        question: "Why is water important?",
        options: ["It tastes good", "Regulates temperature", "It is expensive", "It makes you sleepy"],
        correctIndex: 1
      }
    };
  }
};

export const generateSpeech = async (text: string): Promise<string | null> => {
  if (!process.env.API_KEY) return null;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
       return base64Audio;
    }
    return null;

  } catch (error) {
    console.error("Error generating speech:", error);
    return null;
  }
};

export const playAudio = (base64: string) => {
    playAudioData(base64);
};

export const generateImpactReport = async (amount: number) => {
    if (!process.env.API_KEY) return "Thank you for your donation!";

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Write a short, inspiring one-sentence description of what a $${amount} donation to a health charity could achieve (e.g., "funded 5 school lunches").`,
        });
        return response.text;
    } catch (e) {
        return "Your contribution makes a difference!";
    }
};

export const analyzeJournalEntry = async (mood: string, activities: string[], content: string): Promise<SpiritAnimal> => {
  if (!process.env.API_KEY) {
      // Mock fallback
      return {
          name: 'Dolphin',
          symbolism: 'Playful and connected, reflecting your energetic day with friends.',
          traits: ['Playful', 'Social', 'Intelligent'],
          rarity: 'Common'
      };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    Analyze this user journal entry to assign a Spirit Animal.
    Mood: ${mood}
    Activities: ${activities.join(', ')}
    Reflection: ${content}

    Output JSON with:
    - name: Animal name
    - symbolism: A 1-2 sentence explanation of why this animal fits the user's day.
    - traits: Array of 3 adjectives.
    - rarity: One of [Common, Uncommon, Rare, Legendary].
  `;

  try {
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
              responseMimeType: "application/json",
              responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                      name: { type: Type.STRING },
                      symbolism: { type: Type.STRING },
                      traits: { type: Type.ARRAY, items: { type: Type.STRING } },
                      rarity: { type: Type.STRING, enum: ['Common', 'Uncommon', 'Rare', 'Legendary'] }
                  }
              }
          }
      });
      return JSON.parse(response.text || "{}");
  } catch (error) {
      console.error("Error analyzing journal:", error);
      return {
          name: 'Owl',
          symbolism: 'A symbol of wisdom and calm observation.',
          traits: ['Wise', 'Calm', 'Observant'],
          rarity: 'Common'
      };
  }
};