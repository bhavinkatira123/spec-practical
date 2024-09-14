import React from "react";
import { IArticalData } from "../articalSlice";

import PlaceHolderImage from "../images/placeholder-image.png";
const ArticalCard = ({ author, body, date, source, title }: IArticalData) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="artical-card">
      <div className="card-sub-container">
        <img
          width={90}
          height={72}
          loading="lazy"
          src={PlaceHolderImage}
          alt="artical_image"
        />
        <div className="title-container">
          <div className="date-source">
            <span>{formattedDate}</span>
            <span>{source}</span>
          </div>
          <p className="title">{title}</p>
        </div>
      </div>
      <div
        className="rich-text"
        dangerouslySetInnerHTML={{ __html: body }} // Renders the HTML content
      />
      <p className="author">{author}</p>
    </div>
  );
};

export default ArticalCard;
