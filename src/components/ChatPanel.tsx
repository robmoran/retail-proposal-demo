import { useState, useRef, useEffect } from 'react';
import { useProposal } from '../context/ProposalContext';
import { ChatMessage } from '../types/chat';
import { sendChatMessage } from '../services/ChatService';

const SUGGESTED_PROMPTS = [
  { id: '1', label: 'Start from scratch', prompt: 'Help me create a new roofing proposal' },
  { id: '2', label: 'Add site photos', prompt: 'I need to add inspection photos to this proposal' },
  { id: '3', label: 'Create estimate', prompt: 'Help me create a detailed estimate for this project' },
  { id: '4', label: 'Add warranty info', prompt: 'Add warranty information and terms to the proposal' },
];

export default function ChatPanel() {
  const { chatMessages, addChatMessage } = useProposal();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    addChatMessage(userMessage);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    const aiResponse = await sendChatMessage(inputValue.trim());
    setIsTyping(false);
    addChatMessage(aiResponse);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="chat-panel">
      <div className="chat-messages">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-avatar">
              {message.role === 'user' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  <circle cx="12" cy="10" r="1.5"/>
                  <circle cx="16" cy="10" r="1.5"/>
                  <circle cx="8" cy="10" r="1.5"/>
                </svg>
              )}
            </div>
            <div className="message-content">
              <div className="message-text">{message.content}</div>
              <div className="message-timestamp">
                {message.timestamp.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-message assistant-message">
            <div className="message-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                <circle cx="12" cy="10" r="1.5"/>
                <circle cx="16" cy="10" r="1.5"/>
                <circle cx="8" cy="10" r="1.5"/>
              </svg>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {chatMessages.length === 1 && (
        <div className="chat-suggestions">
          {SUGGESTED_PROMPTS.map((suggestion) => (
            <button
              key={suggestion.id}
              className="suggestion-chip"
              onClick={() => handleSuggestionClick(suggestion.prompt)}
            >
              {suggestion.label}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input-area">
        <textarea
          className="chat-input"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className="chat-send-button"
          onClick={handleSend}
          disabled={!inputValue.trim()}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.01 2.01L2 8.5l12 1.5L2 11.5l.01 6.49L20 10 2.01 2.01z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
