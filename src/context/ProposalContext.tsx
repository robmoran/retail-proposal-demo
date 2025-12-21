import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Proposal } from '../types';
import { ChatMessage } from '../types/chat';
import { sampleProposal } from '../sampleData';

interface ProposalContextType {
  proposal: Proposal;
  updateProposal: (updates: Partial<Proposal>) => void;
  updateTitlePage: (field: string, value: string) => void;
  updateIntroPage: (field: string, value: string) => void;
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

  const updateTitlePage = (field: string, value: string) => {
    setProposal(prev => {
      // Handle nested fields like "contractor.name" or "homeowner.address"
      const fields = field.split('.');
      if (fields.length === 1) {
        return {
          ...prev,
          titlePage: {
            ...prev.titlePage,
            [field]: value
          }
        };
      } else {
        // Nested field update
        return {
          ...prev,
          titlePage: {
            ...prev.titlePage,
            [fields[0]]: {
              ...(prev.titlePage[fields[0] as keyof typeof prev.titlePage] as object),
              [fields[1]]: value
            }
          }
        };
      }
    });
  };

  const updateIntroPage = (field: string, value: string) => {
    setProposal(prev => ({
      ...prev,
      introPage: {
        ...prev.introPage,
        [field]: value
      }
    }));
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
        updateTitlePage,
        updateIntroPage,
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
