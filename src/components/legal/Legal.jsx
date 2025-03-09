import React, { useEffect } from 'react';
import TermsConditions from "./TermsConditions.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import FairUsage from "./FairUsage.jsx";
import Refunds from "./Refunds.jsx";
function Legal() {
    useEffect(() => {
      const hash = window.location.hash;
      if (hash) {
          const element = document.querySelector(hash);
          if (element) {
              setTimeout(() => {
                  element.scrollIntoView({ behavior: 'smooth' });
              }, 100); // Adjust delay if needed
          }
      }
  }, []);
  return (
    <div>
      <FairUsage></FairUsage>
      <TermsConditions></TermsConditions>
      <PrivacyPolicy></PrivacyPolicy>
      <Refunds></Refunds>
    </div>
  );
}

export default Legal;
