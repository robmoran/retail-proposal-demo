import { useState } from 'react';
import { useProposal } from '../context/ProposalContext';
import { ChatMessage } from '../types/chat';
import { sendChatMessage } from '../services/ChatService';

export default function MobileChatBar() {
  const { addChatMessage } = useProposal();
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    addChatMessage(userMessage);
    setInputValue('');
    setIsSending(true);

    // Simulate AI response
    const aiResponse = await sendChatMessage(inputValue.trim());
    setIsSending(false);
    addChatMessage(aiResponse);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mobile-chat-bar">
      <div className="mobile-chat-input-container">
        <input
          type="text"
          className="mobile-chat-input"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSending}
        />
        <button
          className="mobile-chat-send-button"
          onClick={handleSend}
          disabled={!inputValue.trim() || isSending}
        >
          {isSending ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="spinner">
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25"/>
              <path d="M10 2a8 8 0 018 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.01 2.01L2 8.5l12 1.5L2 11.5l.01 6.49L20 10 2.01 2.01z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
