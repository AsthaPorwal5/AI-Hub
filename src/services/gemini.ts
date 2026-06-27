export const geminiService = {
  generateCompletion: async (prompt: string): Promise<string> => {
    // Simulate API network latency
    await new Promise<void>((resolve) => setTimeout(resolve, 1400));
    
    const responses = [
      "Hello! I am Gemini 1.5 Pro. I specialize in multimodal analysis and processing massive context windows.",
      "As a Google model, I can search, organize, and reason across large streams of structured text and media data.",
      "That is an interesting prompt. Here is how Gemini breaks it down from a multimodal perspective.",
      "Gemini excels at cross-referencing information. Let me search my local weights to provide an optimal response.",
    ];
    
    if (prompt.toLowerCase().includes('hello') || prompt.toLowerCase().includes('hi')) {
      return "Hi there! I am Gemini 1.5 Pro from Google. How can I help you analyze or create today?";
    }
    
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  },
};
export default geminiService;
