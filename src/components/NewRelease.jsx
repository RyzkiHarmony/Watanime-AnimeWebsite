import { useState, useEffect } from "react";
import axios from "axios";
import AnimeCard from "./AnimeCard";

function NewRelease() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        setLoading(true); // Menyatakan memulai fetch data
        const response = await axios.get("https://api.jikan.moe/v4/seasons/now");
        const newReleases = response.data.data.map((anime) => ({
          title: anime.title,
          episode: anime.episodes || "Unknown",
          image: anime.images.jpg.image_url,
        }));
        setAnimes(newReleases.slice(0, 12)); // Batasi hanya 12 anime yang ditampilkan
        setError(null); // Reset error jika berhasil
      } catch (err) {
        setError("Failed to load new releases.");
        console.error(err); // Log error ke konsol
      } finally {
        setLoading(false); // Set loading ke false setelah selesai memuat data
      }
    };

    fetchNewReleases();
  }, []); // Dependensi kosong berarti hanya akan dijalankan sekali saat pertama kali render

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="anime-grid">
      {animes.map((anime, index) => (
        <AnimeCard key={index} {...anime} />
      ))}
    </div>
  );
}

export default NewRelease;
