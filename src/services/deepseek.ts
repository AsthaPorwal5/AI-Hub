export const deepseekService = {
  generateCompletion: async (prompt: string): Promise<string> => {
    // Simulate API network latency
    await new Promise((resolve) => setTimeout(resolve, 950));
    
    const responses = [
      "Hello! I am DeepSeek-V3. I represent a highly cost-efficient, high-speed Mixture-of-Experts reasoning model.",
      "DeepSeek specializes in mathematical derivations, advanced algorithm analysis, and quick response generation.",
      "Let's calculate the computational complexity. DeepSeek uses a Multi-head Latent Attention mechanism for speed.",
      "As an open-weights model, I deliver near-frontier benchmarks in engineering, math, and code generation.",
    ];
    
    if (prompt.toLowerCase().includes('hello') || prompt.toLowerCase().includes('hi')) {
      return "Hello! I am DeepSeek-V3. Let's solve some coding, math, or translation challenges together!";
    }
    
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  },
};
export default deepseekService;
