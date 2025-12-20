import { useState } from 'react';
import { Proposal, Estimate, AddOn } from '../types';
import TitlePage from './TitlePage';
import IntroPage from './IntroPage';
import PhotoSection from './PhotoSection';
import EstimatePage from './EstimatePage';
import SelectionsSection from './SelectionsSection';
import AttachmentsPage from './AttachmentsPage';
import StickyCart from './StickyCart';
import '../ProposalStyles.css';
import '../HomeownerStyles.css';

interface HomeownerPreviewProps {
  proposal: Proposal;
}

export default function HomeownerPreview({ proposal }: HomeownerPreviewProps) {
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [signature, setSignature] = useState('');

  const handleEstimateSelect = (estimate: Estimate) => {
    setSelectedEstimate(estimate);
  };

  const handleAddOnToggle = (addOn: AddOn) => {
    setSelectedAddOns(prev => {
      const exists = prev.find(a => a.id === addOn.id);
      if (exists) {
        return prev.filter(a => a.id !== addOn.id);
      } else {
        return [...prev, addOn];
      }
    });
  };

  const calculateTotal = () => {
    const estimateTotal = selectedEstimate?.total || 0;
    const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    return estimateTotal + addOnsTotal;
  };

  const handleCheckout = () => {
    if (!selectedEstimate) {
      alert('Please select a package first');
      return;
    }
    if (!signature.trim()) {
      alert('Please provide your signature');
      return;
    }

    // In production, this would create a Stripe checkout session
    console.log('Proceeding to Stripe checkout with:', {
      estimate: selectedEstimate,
      addOns: selectedAddOns,
      signature,
      total: calculateTotal()
    });

    alert(`Processing payment of $${calculateTotal().toLocaleString()}...\n\nIn production, this would redirect to Stripe checkout.`);
  };

  return (
    <div className="homeowner-preview">
      <div className="homeowner-content">
        <TitlePage data={proposal.titlePage} />
        <IntroPage data={proposal.introPage} />

        {proposal.photoSections.map((section, index) => (
          <PhotoSection key={index} data={section} />
        ))}

        {/* Show estimates as informational pages */}
        {proposal.estimates.map((estimate, index) => (
          <EstimatePage key={index} data={estimate} />
        ))}

        {/* Interactive selections section */}
        <SelectionsSection
          estimates={proposal.estimates}
          addOns={proposal.addOns || []}
          selectedEstimate={selectedEstimate}
          selectedAddOns={selectedAddOns}
          onEstimateSelect={handleEstimateSelect}
          onAddOnToggle={handleAddOnToggle}
        />

        {proposal.attachments && proposal.attachments.length > 0 && (
          <AttachmentsPage attachments={proposal.attachments} />
        )}
      </div>

      {/* Sticky cart sidebar */}
      <StickyCart
        selectedEstimate={selectedEstimate}
        selectedAddOns={selectedAddOns}
        signature={signature}
        onSignatureChange={setSignature}
        total={calculateTotal()}
        onCheckout={handleCheckout}
        contractorName={proposal.titlePage.contractor.name}
      />
    </div>
  );
}
