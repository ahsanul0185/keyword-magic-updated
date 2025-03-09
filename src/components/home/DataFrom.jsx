import React, { useState, useEffect } from "react";
import "./style.css";
import Frame from "../../assets/Frame 459.svg";

const DataFrom = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasModalBeenClosed = localStorage.getItem('hasModalBeenClosed');

    if (!hasModalBeenClosed) {
      const handleScroll = () => {
        const dataElement = document.getElementById('gifs');
        if (dataElement) {
          const rect = dataElement.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            setShowModal(true);
            window.removeEventListener('scroll', handleScroll);
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem('hasModalBeenClosed', 'true');
  };

  return (
    <div>
      <section className="datafrom-section" id="data">
        <div className="datafrom-container">
          <div className="datafrom-content" data-aos="fade-right" data-aos-once="true">
            <h2 className="datafrom-question secondary-heading">
              Where is the data from?
            </h2>
            <p className="datafrom-answer secondary-description">
              Our data is sourced from a combination of the Google API, search partners and <a href="https://en.wikipedia.org/wiki/List_of_big_data_companies" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              some other data collection companies</a>. Retrieved data is meticulously processed using our advanced algorithms to provide the most
              accurate and comprehensive results for your SEO needs.
            </p>
          </div>
          <div>
            <img className="data-form-img" data-aos="fade" data-aos-once="true" src={Frame} alt="Data Sources" />
          </div>
        </div>
      </section>
      {showModal && (
        <div className="promo">
          <div className="promo-content">
            <span className="promo-close" onClick={closeModal}>&times;</span>
            <p>Start a <b><a class="free-trial" href="https://keywordmagic.io/signup">FREE TRIAL</a></b> now, no 💳 card required!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataFrom;
