export type ScreenState = 
  | 'splash' 
  | 'onboarding1' 
  | 'onboarding2' 
  | 'onboarding3' 
  | 'login' 
  | 'signup' 
  | 'otp' 
  | 'home' 
  | 'chat' 
  | 'imageGenerator' 
  | 'tools' 
  | 'history' 
  | 'profile' 
  | 'subscription'
  | 'modelSelection';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  modelName: string;
  lastMessage: string;
  timestamp: string;
}

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: string;
}

export interface AIModel {
  name: string;
  company: string;
  desc: string;
  color: string;
}
