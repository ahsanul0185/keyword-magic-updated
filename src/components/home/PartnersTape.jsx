import React, { Fragment } from 'react'
import "./style.css"
import partner_1 from "../../assets/featured-logos/logo-shopify.svg"
import partner_2 from "../../assets/featured-logos/logo-ali-express.svg"
import partner_3 from "../../assets/featured-logos/logo-meta.svg"
import partner_4 from "../../assets/featured-logos/logo-amazon.svg"
import partner_5 from "../../assets/featured-logos/logo-ebay.svg"
import partner_6 from "../../assets/featured-logos/logo-openai.svg"

const partners = [
    {
        logo: partner_1,
        name : "Shopify"
    },
    {
        logo: partner_2,
        name : "Ali Express"
    },
    {
        logo: partner_3,
        name : "Meta"
    },
    {
        logo: partner_4,
        name : "Amazon"
    },
    {
        logo: partner_5,
        name : "Ebay"
    },
    {
        logo: partner_6,
        name : "Open AI"
    },
]

const PartnersTape = () => {

  return (
      <div className='partners-tape-wrapper'>
          <div className='partners-tape-container'>
          {[
              ...new Array(4).fill(0).map((_, idx) => (
                <Fragment key={idx}>
                  {partners.map((partner, idx) => (
                    <div key={idx} className='partner'>
                          <img src={partner.logo} alt={ partner.name} />
                    </div>
                  ))}
                </Fragment>
              )),
            ]}
          </div>
    </div>
  )
}

export default PartnersTape