import React from "react";
import "./style.css";
import KeywordTable from "./KeywordTable";

function KeywordSection() {
  return (
    <div className="keyword-section-wrapper">
      <div className="seo-made-easy-wrapper">
        <p className="seo-made-easy-heading">SEO Made Easy</p>
        <h1 className="seo-made-easy-description">Instantly find thousands of valuable keywords from a single search</h1>
      </div>
      <KeywordTable headColor="#fff" showTableInfo={false}></KeywordTable>
      <p className="keyword-caution">
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 16V12M12.5 8H12.51M22.5 12C22.5 17.5228 18.0228 22 12.5 22C6.97715 22 2.5 17.5228 2.5 12C2.5 6.47715 6.97715 2 12.5 2C18.0228 2 22.5 6.47715 22.5 12Z"
            stroke="#D69D00"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        The data displayed above is for illustrative purposes only and
        does not represent actual trends
      </p>
    </div>
  );
}

export default KeywordSection;
