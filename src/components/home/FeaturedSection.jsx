import React from 'react'
import "./style.css"
import PartnersTape from './PartnersTape'

const FeaturedSection = () => {
  return (
    <section className="featured-section-wrapper">
          <div className="featured-section-container">
              <h2 className='secondary-heading'>Featured On</h2>
                <PartnersTape />
          </div>
    </section>
  )
}

export default FeaturedSection