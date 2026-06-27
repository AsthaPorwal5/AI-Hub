export const claudeService = {
  generateCompletion: async (prompt: string): Promise<string> => {
    // Simulate API network latency
    await new Promise<void>((resolve) => setTimeout(resolve, 1100));
    
    const responses = [
      "I am Claude 3.5 Sonnet by Anthropic. I aim to provide helpful, honest, and harmless responses with strong writing clarity.",
      "Analyzing this closely: Claude models are highly tuned for deep comprehension, code generation, and complex writing tasks.",
      "Certainly, let's explore that coding query. Here is a clean, structured solution matching best-practice software design.",
      "I can assist in editing, summarizing, or analyzing your reports with a professional and detailed tone.",
    ];
    
    if (prompt.toLowerCase().includes('hello') || prompt.toLowerCase().includes('hi')) {
      return "Hello! I am Claude 3.5 Sonnet, developed by Anthropic. I'm ready to collaborate on text, code, or data analysis.";
    }
    
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  },
};
export default claudeService;
