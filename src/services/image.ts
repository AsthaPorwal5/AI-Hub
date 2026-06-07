export const imageService = {
  generateImage: async (prompt: string): Promise<any> => {
    // Simulate generation delay
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    // Choose which asset to show based on keywords in prompt, or pick one randomly
    const query = prompt.toLowerCase();
    
    if (query.includes('voice') || query.includes('sound') || query.includes('mic')) {
      return require('../assets/images/onboarding_voice.png');
    }
    if (query.includes('model') || query.includes('orbit') || query.includes('network')) {
      return require('../assets/images/onboarding_models.png');
    }
    if (query.includes('star') || query.includes('sparkle') || query.includes('logo')) {
      return require('../assets/images/splash_logo.png');
    }
    
    // Default fallback is the glowing generator city artwork
    return require('../assets/images/onboarding_generate.png');
  },
};
export default imageService;
