import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomerSaying.css";

import AvatarOne from "../../assets/Avatar.png";
import AvatarTwo from "../../assets/Avatar-2.png";
import AvatarThree from "../../assets/Avatar-3.png";
import Quotes from "../../assets/Quote.svg";

function CustomerSaying() {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1.65,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="customer-saying-wrapper">
      <div className="customer-saying-inner">
        <div className="compare-head-desc-container">
          <h2 className="secondary-heading">Recent Customer Reviews</h2>
          <p className="secondary-description">
            Unfiltered reviews provided by some of our most recent customers.
          </p>
        </div>

        <div className="slider-container" data-aos="fade" data-aos-once="true">
          <Slider {...settings}>
            <div className="feedback-card">
              <p className="feedback-service">August 3, 2024</p>
              <p className="feedback-description">
                “Love how easy it is to use, hope to see more features in the future"
              </p>
              <div className="feedback-info-container">
                <div class="avatar-container"><img class="avatar" src={AvatarTwo} alt="Customer Avatar" /></div>
                <div>
                  <p className="feedback-name">Barbara</p>
                  <p className="feedback-occupation">SEO Strategist, United States</p>
                </div>
              </div>
              <img className="feedback-quotes" src={Quotes} alt="Quote Image" />
            </div>
            <div className="feedback-card">
              <p className="feedback-service">August 14, 2024</p>
              <p className="feedback-description">
                “Saved a lot of time I would have spent on manual keyword research, wish there was a free version”
              </p>
              <div className="feedback-info-container">
              <div class="avatar-container"><img class="avatar" src={AvatarOne} alt="Customer Avatar" /></div>
                <div>
                  <p className="feedback-name">William</p>
                  <p className="feedback-occupation">SEO Manager, Sweden</p>
                </div>
              </div>
              <img className="feedback-quotes" src={Quotes} alt="Quote Image" />
            </div>
            <div className="feedback-card">
              <p className="feedback-service">August 10th, 2024</p>
              <p className="feedback-description">
                “100% worth the price! If you have a monetized site, I have no doubt you'll be able to earn the money back”
              </p>
              <div className="feedback-info-container">
              <div class="avatar-container"><img class="avatar" src={AvatarThree} alt="Customer Avatar" /></div>
                <div>
                  <p className="feedback-name">Angeliki</p>
                  <p className="feedback-occupation">Web Developer, Cyprus</p>
                </div>
              </div>
              <img className="feedback-quotes" src={Quotes} alt="Quote Image" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default CustomerSaying;
