import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Proposal } from '../types';
import { ChatMessage } from '../types/chat';
import { sampleProposal } from '../sampleData';

interface ProposalContextType {
  proposal: Proposal;
  updateProposal: (updates: Partial<Proposal>) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  isMobile: boolean;
  showFinalizeDialog: boolean;
  setShowFinalizeDialog: (show: boolean) => void;
  mobileView: 'chat' | 'preview';
  setMobileView: (view: 'chat' | 'preview') => void;
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export function ProposalProvider({ children }: { children: ReactNode }) {
  const [proposal, setProposal] = useState<Proposal>(sampleProposal);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{
    id: '1',
    role: 'assistant',
    content: "Hi! I'm here to help you create a professional proposal. What type of project are you working on?",
    timestamp: new Date(),
  }]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [showFinalizeDialog, setShowFinalizeDialog] = useState(false);
  const [mobileView, setMobileView] = useState<'chat' | 'preview'>('chat');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateProposal = (updates: Partial<Proposal>) => {
    setProposal(prev => ({ ...prev, ...updates }));
  };

  const addChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);

    // Apply any proposal updates from the message
    if (message.proposalUpdates) {
      updateProposal(message.proposalUpdates);
    }
  };

  return (
    <ProposalContext.Provider
      value={{
        proposal,
        updateProposal,
        chatMessages,
        addChatMessage,
        isEditMode,
        setIsEditMode,
        isMobile,
        showFinalizeDialog,
        setShowFinalizeDialog,
        mobileView,
        setMobileView,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
}

export function useProposal() {
  const context = useContext(ProposalContext);
  if (context === undefined) {
    throw new Error('useProposal must be used within a ProposalProvider');
  }
  return context;
}
