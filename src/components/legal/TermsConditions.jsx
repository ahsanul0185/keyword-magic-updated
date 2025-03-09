import React from "react";
import "./Legal.css";

const TermsConditions = () => {
  return (
    <section className="legal-section" id="termsconditions">
      <div className="legal-container">
        <p className="secondary-heading">Terms & Conditions</p>
        <div className="legal-text">
        <p className="legal-p"><strong>Last Updated:</strong> August 10, 2024</p>
        <p className="legal-p">By using KeywordMagic.io (the "Site") and creating an account, you agree to the following terms and conditions.</p>

        <h2 className="legal-header">1. Acceptance of Terms</h2>
        <p className="legal-p">By clicking 'Get Started' or 'Sign Up with Google,' you acknowledge that you have read, understood, and agree to these Terms & Conditions. If you do not agree, you should not use our Site.</p>

        <h2 className="legal-header">2. User Responsibilities</h2>
        <h3 className="legal-header">Account Security</h3>
        <p className="legal-p">You are responsible for:</p>
        <ul className="legal-ul">
            <li>Maintaining the confidentiality of your account credentials.</li>
            <li>All activities conducted under your account.</li>
        </ul>
        <p className="legal-p">If you suspect any unauthorized use of your account, you must notify us immediately.</p>

        <h3 className="legal-header">Compliance</h3>
        <p className="legal-p">You agree to:</p>
        <ul className="legal-ul">
            <li>Use the Site in accordance with all applicable laws and regulations.</li>
            <li>Not engage in any activity that disrupts or interferes with the Site's functionality.</li>
            <li>Not upload or transmit any harmful, offensive, or illegal content.</li>
        </ul>

        <h2 className="legal-header">3. Data Handling</h2>
        <h3 className="legal-header">Personal Information</h3>
        <p className="legal-p">We collect and use your name and email address as described in our Privacy Policy. You consent to the collection, use, and sharing of this information as detailed therein.</p>

        <h3 className="legal-header">Third-Party Sharing</h3>
        <p className="legal-p">We may share your data with third parties to:</p>
        <ul className="legal-ul">
            <li>Improve service quality and performance.</li>
            <li>Ensure the proper functioning of our services.</li>
        </ul>

        <h2 className="legal-header">4. Payment Information</h2>
        <p className="legal-p">Payments are processed through Stripe or similar secure payment providers. We do not:</p>
        <ul className="legal-ul">
            <li>Store or have access to your payment details.</li>
            <li>Handle payment processing directly.</li>
        </ul>
        <p className="legal-p">Billing addresses provided are used only for issuing invoices and will not be used for any other purpose.</p>

        <h2 className="legal-header">5. Service Use</h2>
        <h3 className="legal-header">AI Usage</h3>
        <p className="legal-p">Our service may use artificial intelligence to:</p>
        <ul className="legal-ul">
            <li>Analyze and generate data based on user inputs.</li>
            <li>Enhance the functionality and features of our services.</li>
        </ul>

        <h3 className="legal-header">Data Retention</h3>
        <p className="legal-p">We retain user-generated data for at least 30 days. This data may:</p>
        <ul className="legal-ul">
            <li>Be used for service improvement and operational purposes.</li>
            <li>Be made public through our platform’s features.</li>
        </ul>

        <h2 className="legal-header">6. Limitation of Liability</h2>
        <p className="legal-p">Our liability is limited as follows:</p>
        <ul className="legal-ul">
            <li>We do not guarantee the availability or accuracy of the Site.</li>
            <li>We are not responsible for any direct, indirect, incidental, or consequential damages resulting from the use of or inability to use the Site.</li>
        </ul>
        <p className="legal-p">Our total liability for any claims related to the Site will not exceed the amount you paid, if any, to use the Site.</p>

        <h2 className="legal-header">7. Changes to Terms</h2>
        <p className="legal-p">We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting on this page. Your continued use of the Site after changes are posted constitutes your acceptance of the new terms.</p>
    </div>
      </div>
    </section>
  );
};

export default TermsConditions;
