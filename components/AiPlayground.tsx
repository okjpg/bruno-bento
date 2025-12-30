import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BentoCard } from './BentoCard';
import { AspectRatio, ImageSize } from '../types';
import { Sparkles, Image as ImageIcon, Download, Settings2, Loader2, AlertCircle, Zap } from 'lucide-react';

const getAiStudio = () => (window as any).aistudio;

export const AiPlayground: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Square);
  const [imageSize, setImageSize] = useState<ImageSize>(ImageSize.OneK);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyReady, setApiKeyReady] = useState(false);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    const aiStudio = getAiStudio();
    if (aiStudio && await aiStudio.hasSelectedApiKey()) {
      setApiKeyReady(true);
    }
  };

  const handleConnect = async () => {
    const aiStudio = getAiStudio();
    if (aiStudio) {
      try {
        await aiStudio.openSelectKey();
        if (await aiStudio.hasSelectedApiKey()) {
          setApiKeyReady(true);
          setError(null);
        }
      } catch (e) {
        console.error(e);
        setError("Failed to select API Key.");
      }
    } else {
      setError("AI Studio environment not detected.");
    }
  };

  const generateImage = async () => {
    if (!prompt) return;
    if (!apiKeyReady) {
      await handleConnect();
      const aiStudio = getAiStudio();
      if (!aiStudio || !(await aiStudio.hasSelectedApiKey())) {
        return;
      }
    }

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio, imageSize } },
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setGeneratedImage(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        const textPart = response.candidates?.[0]?.content?.parts?.find(p => p.text);
        setError(textPart ? `Model returned text: ${textPart.text}` : "No image generated.");
      }
    } catch (err: any) {
      if (err.toString().includes("Requested entity was not found")) {
        setApiKeyReady(false);
        setError("API Key invalid. Please select again.");
      } else {
        setError(err.message || "Failed to generate image.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!apiKeyReady) {
    return (
      <BentoCard className="h-full min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center p-8 space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 blur-xl rounded-full" />
            <div className="relative w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h4 className="font-display text-2xl font-medium text-white mb-3">AI Studio</h4>
            <p className="text-secondary font-light text-sm max-w-xs mx-auto leading-relaxed">
              Access Gemini 3 Pro to generate award-winning visuals. Requires a verified API key.
            </p>
          </div>
          <button
            onClick={handleConnect}
            className="group px-6 py-3 bg-[#e5e5e5] text-black font-medium text-sm rounded-full transition-all hover:bg-white flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
          >
            Connect Credentials
            <Settings2 className="w-4 h-4 transition-transform group-hover:rotate-90" />
          </button>
        </div>
      </BentoCard>
    );
  }

  const SUPPORTED_ASPECT_RATIOS = ["1:1", "3:4", "4:3", "9:16", "16:9"];

  return (
    <BentoCard title="Creation Suite" subtitle="Gemini 3 Pro Model" className="h-full min-h-[500px]">
      <div className="flex flex-col h-full space-y-6">

        {/* Controls */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] text-secondary font-semibold uppercase tracking-widest pl-1">Ratio</label>
            <div className="relative">
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                className="w-full appearance-none bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-inner"
              >
                {Object.entries(AspectRatio)
                  .filter(([_, value]) => SUPPORTED_ASPECT_RATIOS.includes(value))
                  .map(([key, value]) => (
                    <option key={key} value={value}>{key}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-secondary font-semibold uppercase tracking-widest pl-1">Res</label>
            <div className="relative">
              <select
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value as ImageSize)}
                className="w-full appearance-none bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all shadow-inner"
              >
                {Object.entries(ImageSize).map(([key, value]) => (
                  <option key={key} value={value}>{value}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your vision..."
            className="w-full bg-[#111] border border-white/5 rounded-2xl p-4 md:p-5 text-white placeholder-secondary/30 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all resize-none h-32 text-sm leading-relaxed shadow-inner"
          />
          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="absolute bottom-4 right-4 p-3 bg-white text-black rounded-xl hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-current" />}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-3 text-red-300 bg-red-900/10 border border-red-500/10 p-4 rounded-xl text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Output Area */}
        <div className="flex-1 bg-[#050505] rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center relative min-h-[220px] shadow-inner group/output">
          {generatedImage ? (
            <div className="relative w-full h-full">
              <img
                src={generatedImage}
                alt="Generated output"
                className="w-full h-full object-contain p-2"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover/output:opacity-100 transition-all duration-300 flex items-center justify-center">
                <a
                  href={generatedImage}
                  download={`gemini-${Date.now()}.png`}
                  className="px-6 py-2.5 bg-white text-black rounded-full font-medium text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-transform"
                >
                  <Download className="w-4 h-4" /> Save Asset
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center text-secondary/20 flex flex-col items-center gap-4">
              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-white animate-[shimmer_1s_infinite]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest">Rendering</span>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-light">Waiting for input</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </BentoCard>
  );
};