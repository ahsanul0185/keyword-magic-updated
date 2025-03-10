import React from 'react'
import "./style.css"
import img_1 from "../../assets/img-mastering-seo.jpg"
import img_2 from "../../assets/img-ppc-vs-seo.jpg"
import img_3 from "../../assets/img-content-marketing.jpg"

const insights = [
    {
        img: img_1,
        title: "Mastering SEO in 2025: The Ultimate Guide",
        description :"Learn how to optimize your website for search engines using the latest techniques and tools."
    },
    {
        img: img_2,
        title: "PPC vs. SEO: Which Strategy Works Best?",
        description :"A detailed comparison of Pay-Per-Click advertising and Search Engine Optimization to maximize your online presence."
    },
    {
        img: img_3,
        title: "Content Marketing Trends You Need to Know",
        description :"Stay ahead of the competition with these cutting-edge content marketing strategies."
    },
]

const LatestInsights = () => {
  return (
      <section className='latest-insight-wrapper'>
          <div className='latest-insight-container' >
              <h2 className='secondary-heading'>Latest Insights & Strategies </h2>
              <p className='secondary-description'>🔹 Stay Ahead with Expert Articles on SEO, PPC, and Content Marketing</p>

              <div className='insight-card-container' data-aos="fade" data-aos-once="true">
                  {insights.map((item, idx) => (
                      <InsightCard key={idx} img={item.img} title={item.title} description={ item.description } />
                  ))}
              </div>
          </div>
    </section>
  )
}

export default LatestInsights


const InsightCard = ({img, title, description}) => {
    return (
        <div className='insight-card'>
            <div className='insight-card-image'>
            <img src={img} alt="" />
            </div>
            <h2 className='insight-card-title'>{title}</h2>
            <p className='insight-card-description'>{ description}</p>
        </div>
    )
}