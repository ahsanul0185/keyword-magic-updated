import React from 'react'
import "./style.css"
import img_local_traffic from "../../assets/img-local-traffic.png"
import icon_tick from "../../assets/icon-tick.svg"

const LocalTraffic = () => {
  return (
      <section className='local-traffic-wrapper'>
          <div className='section-sidbar-img-inner'>
              <img data-aos="fade-right" data-aos-once="true" className='section-sidebar-image' src={img_local_traffic} alt="" />
              <div className='section-sidebar' data-aos="fade" data-aos-once="true">
                  <h2 className='section-sidebar-title'>Looking for more <span>local traffic</span>?</h2>

                  <p className='section-sidebar-tagline'>Easily find popular keywords from specific countries.</p>

                  <ul className='section-sidebar-list'>
                      <li>
                          <img src={icon_tick} alt="" />
                          <span>Discover trending search terms tailored to your target audience</span>
                      </li>
                      <li>
                          <img src={icon_tick} alt="" />
                          <span>Analyze keyword competition and search volume</span>
                      </li>
                      <li>
                          <img src={icon_tick} alt="" />
                          <span>Optimize your content for local SEO</span>
                      </li>
                  </ul>


                  <button className='card-btn-basic'>
                  🔍 Search for keywords
                  </button>
          
              </div>
          </div>
    </section>
  )
}

export default LocalTraffic