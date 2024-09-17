import React from "react";
import { IArticalData } from "../articalSlice";

import PlaceHolderImage from "../images/placeholder-image.png";
const ArticalCard = ({
  author,
  body,
  date,
  source,
  title,
  url,
  image,
}: IArticalData) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div className="artical-card">
        <div className="card-sub-container">
          <div className="img-container">
            <img
              width="100%"
              height="100%"
              loading="lazy"
              src={
                `${process.env.REACT_APP_BACK_END_URL}${image}` ||
                PlaceHolderImage
              }
              alt="artical_image"
            />
          </div>
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
    </a>
  );
};

export default ArticalCard;
