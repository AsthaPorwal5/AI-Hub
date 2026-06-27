export const openaiService = {
  generateCompletion: async (prompt: string): Promise<string> => {
    // Simulate API network latency
    await new Promise<void>((resolve) => setTimeout(resolve, 1200));
    
    const responses = [
      "I'm ChatGPT-4o. How can I assist you with code, logic, or writing today?",
      "Based on your query, the optimal solution involves using modular functions in TypeScript. Let me write a snippet for you.",
      "OpenAI models excel at logical reasoning. Let's break down this complex problem step-by-step.",
      "Here is a quick summary: OpenAI's GPT models are trained on diverse web data to follow user instructions efficiently.",
    ];
    
    // Simple custom routing for demo feel
    if (prompt.toLowerCase().includes('hello') || prompt.toLowerCase().includes('hi')) {
      return "Hello! I am ChatGPT-4o, powered by OpenAI. Ask me anything!";
    }
    
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  },
};
export default openaiService;
