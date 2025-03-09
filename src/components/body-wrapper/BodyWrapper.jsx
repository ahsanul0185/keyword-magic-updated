import React from "react";
import "./style.css";
import BgRainbow from "../../assets/bg-rainbow.svg";
function BodyWrapper({ children }) {
  return (
    <div className="body-wrapper">
      {children}
      <img className="bg-rainbow" data-aos="fade" data-aos-delay="700" data-aos-duration="900" data-aos-once="true" src={BgRainbow} alt="Background Flare" />
    </div>
  );
}

export default BodyWrapper;
