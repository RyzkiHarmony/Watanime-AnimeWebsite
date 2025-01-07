import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import "../App.css";

function PopularAnime() {
  const [popularAnimes, setPopularAnimes] = useState([]);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  useEffect(() => {
    fetch("http://localhost:3000/anime/top?top_year=2022")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data yang diterima:", data);
        setPopularAnimes(data.hits.hits || []);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setPopularAnimes([]);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/anime/${id}`); // Navigasi ke halaman detail anime
  };

  return (
    <div className="popular-section">
      <h2>Popular Animes</h2>
      <div className="popular-grid">
        {popularAnimes.length === 0 ? (
          <p>No popular animes found or loading...</p>
        ) : (
          popularAnimes.map((anime) => (
            <div
              key={anime._id}
              className="popular-card"
              onClick={() => handleCardClick(anime._id)} // Tambahkan navigasi di sini
              style={{ cursor: "pointer" }} // Tambahkan pointer untuk menunjukkan bahwa elemen bisa diklik
            >
              <img
                src={anime._source.image_url}
                alt={anime._source.name}
                className="popular-image"
              />
              <div className="popular-info">
                <h3>{anime._source.name}</h3>
                <p>Genres: {anime._source.genres.join(", ")}</p>
                <p>Studios: {anime._source.studios.join(", ")}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <button className="see-all-button">See All</button>
    </div>
  );
}

export default PopularAnime;
