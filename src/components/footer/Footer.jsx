import React from "react";
import "./style.css";
import reddit from "./assets/reddit-share.svg";
import twitter from "./assets/twitter-share.svg";
import thread from "./assets/threads-share.svg";

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <p className="footer-text">
            © {new Date().getFullYear()} KeywordMagic. All Rights Reserved.
            <a href="/legal#privacypolicy" className="footer-text footer-link">Privacy Policy</a>
          </p>
        </div>
        <div className="footer-img-container">
          <p className="footer-text ">Share on</p>
          <a href="https://reddit.com/submit?url=https://keywordmagic.io&title=The easiest way to find winning SEO keywords" target="_blank" rel="noopener noreferrer">
            <img src={reddit} alt="Reddit logo" className="footer-icon" />
          </a>
          <a href="https://x.com/share?text=The easiest way to find winning SEO keywords&url=https://keywordmagic.io&hashtags=keywordmagic,seokeywords,easyseo" target="_blank" rel="noopener noreferrer">
            <img src={twitter} alt="twitter logo" className="footer-icon" />
          </a>
          <a href="https://threads.net/intent/post?text=[Have you tried KeywordMagic yet? https://keywordmagic.io]" target="_blank" rel="noopener noreferrer">
            <img src={thread} alt="thread logo" className="footer-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;