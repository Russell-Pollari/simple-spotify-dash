import React, { useEffect, useState } from "react";

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    fetch("/api/top-artists")
      .then((res) => res.json())
      .then((data) => {
        setTopArtists(data.items);
      });
  }, []);

  return (
    <div>
      <h3>Top Artists</h3>
      {topArtists.map((artist) => (
        <div
          key={artist.id}
          style={{
            display: "inline-block",
            verticalAlign: "top",
            marginRight: 16,
            width: "512px",
          }}
        >
          <h4>{artist.name}</h4>
          <div style={{ display: "inline-block" }}>
            <img
              src={artist.images[0].url}
              alt={artist.name}
              style={{ width: "128px" }}
            />
          </div>
          <div
            style={{
              display: "inline-block",
              verticalAlign: "top",
              marginLeft: "1rem",
            }}
          >
            {artist.genres.map((genre) => (
              <div key={genre}>{genre}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopArtists;
