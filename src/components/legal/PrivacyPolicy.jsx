import React from "react";
import "./Legal.css";

const PrivacyPolicy = () => {
  return (
    <section className="legal-section" id="privacypolicy">
      <div className="legal-container">
        <p className="secondary-heading">Privacy Policy</p>
        <div className="legal-text">
        <h2 className="legal-header">1. Information We Collect</h2>
        <h3 className="legal-header">Personal Information</h3>
        <p className="legal-p">When you create an account, we collect your name and email address. This information may be used to:</p>
        <ul className="legal-ul">
            <li>Send you updates and promotional material related to our services.</li>
            <li>Communicate important information about your account and our services.</li>
        </ul>

        <h3 className="legal-header">Cookies</h3>
        <p className="legal-p">We use cookies to:</p>
        <ul className="legal-ul">
            <li>Store session data to keep you logged in and enhance your experience on our platform.</li>
            <li>Track user preferences and provide tailored content.</li>
        </ul>
        <p className="legal-p">You can control cookie settings through your browser, but disabling cookies may affect your ability to use some features of our Site.</p>

        <h3 className="legal-header">Payment Information</h3>
        <p className="legal-p">Payment details are handled securely by Stripe or similar providers. We do not store or view your payment information. Billing addresses provided are used exclusively for invoicing purposes.</p>

        <h2 className="legal-header">2. Use of Your Information</h2>
        <h3 className="legal-header">Marketing</h3>
        <p className="legal-p">Your email address may be used to:</p>
        <ul className="legal-ul">
            <li>Send promotional emails and newsletters.</li>
            <li>Notify you of special offers or updates about our services.</li>
        </ul>

        <h3 className="legal-header">Service Improvement</h3>
        <p className="legal-p">Cookies and session data help us:</p>
        <ul className="legal-ul">
            <li>Analyze site usage to improve our services and user experience.</li>
            <li>Ensure that the Site operates smoothly and efficiently.</li>
        </ul>

        <h3 className="legal-header">Data Sharing</h3>
        <p className="legal-p">Your data may be shared with third parties to:</p>
        <ul className="legal-ul">
            <li>Provide optimal service quality.</li>
            <li>Enhance system performance and troubleshoot issues.</li>
        </ul>

        <h2 className="legal-header">3. Data Storage and Security</h2>
        <h3 className="legal-header">Data Retention</h3>
        <p className="legal-p">We store user-generated data for a minimum of 30 days. This data may:</p>
        <ul className="legal-ul">
            <li>Be used for improving our services.</li>
            <li>Be made public as part of our platform’s features.</li>
        </ul>

        <h3 className="legal-header">Security</h3>
        <p className="legal-p">We implement security measures to:</p>
        <ul className="legal-ul">
            <li>Protect your personal information from unauthorized access and breaches.</li>
            <li>Ensure data integrity and prevent loss or misuse.</li>
        </ul>
        <p className="legal-p">However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

        <h2 className="legal-header">4. Artificial Intelligence</h2>
        <p className="legal-p">Our service may use artificial intelligence (AI) technologies to:</p>
        <ul className="legal-ul">
            <li>Generate and analyze data based on user input.</li>
            <li>Enhance service functionality and user experience.</li>
        </ul>

        <h2 className="legal-header">5. GDPR Compliance</h2>
        <p className="legal-p">We comply with the General Data Protection Regulation (GDPR) to:</p>
        <ul className="legal-ul">
            <li>Ensure that your personal data is processed lawfully, transparently, and fairly.</li>
            <li>Respect your rights to access, correct, delete, or restrict your data.</li>
        </ul>

        <h2 className="legal-header">6. Data Removal</h2>
        <p className="legal-p">If you wish to request the removal of your personal data from our systems, please contact us using the details provided below.</p>
      </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
