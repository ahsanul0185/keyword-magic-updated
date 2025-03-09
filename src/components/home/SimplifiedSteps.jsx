import React from "react";
import "./style.css";
import Eybrow from "./Eybrow";
import Slider from "react-slick";
import lines from "../../assets/lines-simplified-steps.svg";
import img_right_keyword from "../../assets/install-illustration.svg";
import img_rank_website from "../../assets/app-illustration.png";
import img_more_traffic from "../../assets/financial-planning-illustration.png";

const stepCardData = [
  {
    step: "Step 1",
    title: "Find the Right Keywords",
    description: "Discover High-Performing Keywords Tailored to Your Audience",
    img: img_right_keyword,
  },
  {
    step: "Step 2",
    title: "Rank Your Website",
    description:
      "Optimize Your Content and Outrank Competitors with Data-Driven Insights",
    img: img_rank_website,
  },
  {
    step: "Step 3",
    title: "Get More Traffic & Earnings",
    description:
      "Drive Conversions and Maximize Revenue with Smart Keyword Strategies",
    img: img_more_traffic,
  },
];

const Arrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{ ...style, display: "block" }}
    onClick={onClick}
  />
);

const SimplifiedSteps = () => {
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
      {
        breakpoint: 550,
        settings: { slidesToShow: 1, centerMode: false, className: "" },
      },
    ],
  };

  return (
    <section className="simplified-steps-wrapper">
      <div className="simplified-steps-inner">
        <Eybrow title="How it work" />
        <h2 className="secondary-heading">
          Simplified Steps to Find, Rank, <br /> and Profit from Keywords
        </h2>

        <div className="steps-card-wrapper" data-aos="fade" data-aos-once="true">
          <img className="line" src={lines} draggable={false} alt="" />
          <div className="steps-card-container">
            {stepCardData.map((step, idx) => (
              <StepCard
                key={idx}
                title={step.title}
                img={step.img}
                description={step.description}
                step={step.step}
              />
            ))}
          </div>

          <div className="mobile-steps-card-container">
            <Slider {...settings}>
              {stepCardData.map((step, idx) => (
                  <div key={idx} className="mobile-step-card">
                      <StepCard
                title={step.title}
                img={step.img}
                description={step.description}
                step={step.step}
                />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimplifiedSteps;

const StepCard = ({ step, img, title, description }) => {
  return (
    <div className="step-card">
      <span className="step-card-label"> {step}</span>
      <img
        style={{
          maxWidth: step === "Step 3" ? "400px" : "",
          transform: step === "Step 3" ? "translateY(40px)" : "",
        }}
        src={img}
        alt=""
      />
      <div className="step-card-details">
        <h2 className="step-card-title">{title}</h2>
        <p className="step-card-desc">{description}</p>
      </div>
    </div>
  );
};
