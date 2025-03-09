import React from "react";
import "./style.css"
import Eybrow from "./Eybrow";
import Slider from "react-slick";
import icon_search_control from "../../assets/icon-search-trends.png";
import icon_ai_analysis from "../../assets/icon-ai-analysis.png";
import icon_industry_report from "../../assets/icon-industry-report.png";

const reliableCardData = [
  {
    icon: icon_search_control,
    title: "🔍 Google Search Trends",
    description: "Real-Time Data to Track What's Trending Now",
  },
  {
    icon: icon_ai_analysis,
    title: "🤖 AI-Powered Analysis",
    description: "Smart Insights for Accurate Keyword Predictions",
  },
  {
    icon: icon_industry_report,
    title: "📑 Verified Industry Reports",
    description: "Reliable Research Backed by Trusted Sources",
  },
];


const Arrow = ({ className, style, onClick }) => (
  <div className={className} style={{ ...style, display: "block" }} onClick={onClick} />
);

const ReliableData = () => {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      { breakpoint: 860, settings: { slidesToShow: 1, centerMode: true } },
      { breakpoint: 550, settings: { slidesToShow: 1, centerMode: false, className: "" } }
    ],
  };

  return (
    <section className="reliable-data-wrapper">
      <div className="reliable-data-inner">
        <Eybrow title="Guaranteed Accuracy" />
        <h2 className="secondary-heading">
          Reliable Data, Verified Sources, <br /> and AI-Powered Precision
        </h2>
        <p className="secondary-description">
          We ensure every keyword insight is backed by accurate, real-time data
          from the most trusted sources.
        </p>

        <div className="reliable-data-card-container">
          {reliableCardData.map((card, idx) => (
            <Card
              key={idx}
              icon={card.icon}
              title={card.title}
              description={card.description}
              index={ idx}
            />
          ))}
        </div>

        <div className="mobile-reliable-data-card-container">
          <Slider {...settings}>
            {reliableCardData.map((card, idx) => (
            <Card
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
          </Slider>
        </div>

      </div>
    </section>
  );
};

export default ReliableData;

const Card = ({ icon, title, description, index }) => {
  return (
    <div className="reliable-data-card" data-aos="fade-up" data-aos-delay={index * 300} data-aos-once="true">
      <img src={icon} alt="" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
