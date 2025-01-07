import { useState, useEffect } from "react";
import axios from "axios";

function AllTopAnimes() {
  const [popularAnimes, setPopularAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularAnimes = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://api.jikan.moe/v4/top/anime");
        const animes = response.data.data.map((anime) => ({
          title: anime.title,
          genres: anime.genres.map((genre) => genre.name),
          image: anime.images.jpg.image_url,
        }));
        setPopularAnimes(animes);
        setError(null); // Reset error jika berhasil
      } catch (err) {
        setError("Failed to load popular animes.");
        console.error(err); // Log error ke konsol
      } finally {
        setLoading(false); // Set loading ke false setelah selesai memuat data
      }
    };

    fetchPopularAnimes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="all-top-animes-section">
      <h2>Top Anime</h2>
      <div className="all-anime-cards">
        {popularAnimes.map((anime, index) => (
          <div key={index} className="popular-card">
            <img
              className="popular-image"
              src={anime.image}
              alt={anime.title}
            />
            <div className="popular-info">
              <h3>{anime.title}</h3>
              <p>Genres: {anime.genres.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllTopAnimes;
