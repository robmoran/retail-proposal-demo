import { ChatMessage } from '../types/chat';

// Simulate AI chat responses with mock data
export async function sendChatMessage(userMessage: string): Promise<ChatMessage> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  const lowerMessage = userMessage.toLowerCase();

  let response = '';
  let proposalUpdates = undefined;

  // Pattern matching for common requests
  if (lowerMessage.includes('roof') || lowerMessage.includes('roofing')) {
    response = "Great! I'll help you create a roofing proposal. Can you tell me the homeowner's name and property address?";
  } else if (lowerMessage.includes('photo') || lowerMessage.includes('image') || lowerMessage.includes('inspection')) {
    response = "I can help you add site photos. In a real implementation, you'd be able to upload photos here. For now, you can manually add them using the Edit panel or describe what photos you need.";
  } else if (lowerMessage.includes('estimate') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    response = "I'll help you create an estimate. What's the scope of work? For example:\n\n• Tear-off and disposal of existing roof\n• Install new underlayment\n• Install architectural shingles\n• Replace flashing and vents\n\nWhat would you like to include?";
  } else if (lowerMessage.includes('warranty') || lowerMessage.includes('guarantee')) {
    response = "I can add warranty information to your proposal. What type of warranty are you offering?\n\n• Material warranty (manufacturer)\n• Labor warranty (your company)\n• Extended warranty options\n\nLet me know the details!";
  } else if (lowerMessage.includes('homeowner') || lowerMessage.includes('customer') || lowerMessage.includes('client')) {
    // Try to extract name from message
    response = "Got it! I've noted the homeowner information. Would you like to add their contact details (phone and email) as well?";
  } else if (lowerMessage.includes('intro') || lowerMessage.includes('letter') || lowerMessage.includes('welcome')) {
    response = "I can help you write a personalized introduction letter. Would you like me to draft one, or would you prefer to write it yourself in the Edit panel?";
  } else if (lowerMessage.includes('send') || lowerMessage.includes('finalize') || lowerMessage.includes('done') || lowerMessage.includes('ready')) {
    response = "Your proposal looks great! When you're ready to send it to the homeowner, click the 'Finalize Proposal' button at the top. You'll be able to add a message and choose how to deliver it.";
  } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
    response = "I can help you with:\n\n✓ Setting up basic project info\n✓ Writing introduction letters\n✓ Creating estimates and pricing\n✓ Adding site photos and documentation\n✓ Including warranty and terms\n✓ Adding optional add-ons\n\nYou can also switch to Edit mode to manually adjust any section. What would you like to work on?";
  } else if (lowerMessage.includes('start') || lowerMessage.includes('new') || lowerMessage.includes('create')) {
    response = "Let's start fresh! What type of project is this proposal for? (e.g., roofing, siding, windows, deck, renovation)";
  } else {
    // Generic response
    response = "I understand you want to work on the proposal. You can:\n\n• Tell me about the project details\n• Ask me to add specific sections\n• Switch to Edit mode for manual control\n• Use the Finalize button when ready to send\n\nWhat would you like to do next?";
  }

  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: response,
    timestamp: new Date(),
    proposalUpdates,
  };
}
