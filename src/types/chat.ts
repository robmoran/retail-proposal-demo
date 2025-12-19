export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  proposalUpdates?: Partial<any>; // Updates to apply to proposal state
}

export interface ChatSuggestion {
  id: string;
  label: string;
  prompt: string;
}
