import React from "react";
import KeywordSection from "./KeywordSection";
import CompareKeyword from "./CompareKeyword";
import CustomerSaying from "./CustomerSaying.jsx";
import Pricing from "./Pricing";
import DataFrom from "./DataFrom";
import HomeVideo from "./HomeVideo.jsx";
import MadeForSection from "./MadeForSection.jsx";
import ReliableData from "./ReliableData.jsx";
import LocalTraffic from "./LocalTraffic.jsx";
import AiKeywordResearch from "./AiKeywordResearch.jsx";
import SimplifiedSteps from "./SimplifiedSteps.jsx";
import SearchKeyword from "./SearchKeyword.jsx";
import FeaturedSection from "./FeaturedSection.jsx";
import LatestInsights from "./LatestInsights.jsx";
function Home() {
  return (
    <div>
      <KeywordSection></KeywordSection>
      <MadeForSection></MadeForSection>
      <CompareKeyword></CompareKeyword>
      <ReliableData></ReliableData>
      <LocalTraffic></LocalTraffic>
      <Pricing></Pricing>
      <AiKeywordResearch></AiKeywordResearch>
      <SimplifiedSteps></SimplifiedSteps>
      <DataFrom></DataFrom>
      <SearchKeyword></SearchKeyword>
      <FeaturedSection></FeaturedSection>
      <CustomerSaying></CustomerSaying>
      <HomeVideo></HomeVideo>
      <LatestInsights></LatestInsights>
    </div>
  );
}

export default Home;
