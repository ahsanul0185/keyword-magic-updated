import React from "react";
import "./Legal.css";

const Refunds = () => {
  return (
    <section className="legal-section" id="refunds">
      <div className="legal-container">
        <p className="secondary-heading">Refund Policy</p>
        <div className="legal-text">
        <p className="legal-p">At KeywordMagic, we strive to provide the best tools for keyword research and SEO optimization. Please note that we do not offer refunds once the purchased plan has been activated. This policy ensures fairness and consistency for all users, allowing us to maintain the quality and reliability of our services. If you have any questions or concerns regarding this policy, please reach out to our support. </p>
      </div>
      </div>
      <div className="legal-container">
        <p className="secondary-heading">Contact Us</p>
    <div className="legal-text">
        <p className="legal-p">For any questions or inquiries about the information provided above, please email us at <a className="legal-a" href="mailto:support@keywordmagic.io">support@keywordmagic.io</a></p>
      </div>
      </div>
    </section>
  );
};

export default Refunds;
