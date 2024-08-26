import React from "react";

function Creator({ name, url, description }) {
  return (
    <div className="creator-card">
      <h2 className="creator-name">{name}</h2>
      <p className="creator-description">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="creator-url"
      >
        Link to YT Channel
      </a>
    </div>
  );
}

export default Creator;
