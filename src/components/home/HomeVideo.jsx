import React from "react";
import "./style.css";
import "./HomeVideo.css";

const HomeVideo = () => {
  return (
    <section className="gif-section" id="gifs">
      <div className="gif-container">
        <h2 className="secondary-heading">See it in Action</h2>
        <p className="secondary-description">
          Still not sure if it's a good fit for you? Take a closer look and learn the quickest way to find the best keywords.
        </p>
        <div className="gif-grid" data-aos="fade-up" data-aos-once="true">
          <div className="gif-item">
            <div className="gif-overlay">Use exact search and location for more specific results</div>
            <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDc3Z2k4NzF4MXgzeXVlMzNxeXIzb29vdDQybzR3bXQzN2tkeXZsMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K3YKOrvF8Bh1DtSeWy/giphy.gif" alt="GIF 1" loading="lazy" />
          </div>
          <div className="gif-item">
            <div className="gif-overlay">Utilize advanced filtering options</div>
            <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2htNWpwaHc4Z2ZveWQ3bjA0cnd3a3FleHdhZmtkZ2Z2OTk1YmNvdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4Gkhz2f0lHZAz9mk1z/giphy.gif" alt="GIF 2" loading="lazy" />
          </div>
          <div className="gif-item">
            <div className="gif-overlay">Quickly sort by keywords that are expected to rank</div>
            <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWRuM3RtMTZtdnMza254cms0YTQ2NWV1bzRibHNia3J0Z3ZyNWpkayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7WVf6vm8Id2HheOnGx/giphy.gif" alt="GIF 3" loading="lazy" />
          </div>
          <div className="gif-item">
            <div className="gif-overlay">Click on any keyword to see more detais</div>
            <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3FoZGR5cWgxNGY1NmJidmYyZ2wwODFwb2JkbWwyNnI4czh6bXFrNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4z6gyTNJb0nmkO6FvA/giphy.gif" alt="GIF 4" loading="lazy" />
          </div>
          <div className="gif-item">
            <div className="gif-overlay">Download the sorted data for your convenience</div>
            <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTQzcHNnb3FjYWtvbHRzbHF5Mm96azRxdGd5cDQyb3p4cjl6ZmFpbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l5lX4oDyKgjozPkRSM/giphy.gif" alt="GIF 5" loading="lazy" />
          </div>
          <div className="gif-item">
            <div className="gif-overlay">Easily find previous searches and results</div>
            <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWxsYTNvN3hhaG44MzNtYmF6a2VqZnh2MGc3N29sZTZjejl5ZnRqcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rqNSgTWfAujHZN13kY/giphy.gif" alt="GIF 6" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeVideo;