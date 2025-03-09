import React from "react";
import "./Legal.css";

const FairUsage = () => {
  return (
  <section className="legal-section" id="termsconditions">
    <div className="legal-container">
      <p className="secondary-heading">Fair Usage Policy</p>
      <div className="legal-text">
        <p className="legal-p">To ensure a high-quality experience for all users, we have established a Fair Usage Policy. Please review the guidelines below, which apply to both Free Trial and PRO accounts.</p>
        <h2 className="legal-header">1. Daily Search Limits</h2>
        <p className="legal-p"><strong>PRO Users:</strong> Limited to 50 searches per day.</p>
        <p className="legal-p"><strong>Free Trial Users:</strong> Limited to 3 searches per day.</p>
        <h2 className="legal-header">2. Account Suspension and Misuse</h2>
        <p className="legal-p">To maintain a secure and effective platform, we monitor usage for abuse and suspicious activity. KeywordMagic.io reserves the right to suspend accounts at any time without prior notice if any of the following are detected:</p>
        <ul className="legal-ul">
          <li>Attempting to hack, bypass, or exploit the API or platform resources.</li>
          <li>Engaging in activities deemed malicious or harmful to KeywordMagic.io.</li>
        </ul>
        <p className="legal-p"><strong>Note:</strong> No refunds will be issued for accounts suspended due to policy violations.</p>
        <h2 className="legal-header">3. Policy Changes</h2>
        <p className="legal-p">KeywordMagic.io reserves the right to update this Fair Usage Policy. Continued use of the site after any changes constitutes your acceptance of the updated terms. Thank you for adhering to this Fair Usage Policy, which helps us provide a reliable service to all users.</p>
      </div>
    </div>
  </section>
);
}

export default FairUsage;
