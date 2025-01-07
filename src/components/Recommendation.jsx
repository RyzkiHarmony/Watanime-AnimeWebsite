import { useState, useEffect } from "react";
import axios from "axios";
import AnimeCard from './AnimeCard';

function Recommendation() {
  const [recommendedAnimes, setRecommendedAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedAnimes = async () => {
      try {
        setLoading(true); // Menyatakan memulai fetch data
        const response = await axios.get("http://localhost:3000/anime/100/recommend?page=1");

        console.log(response); // Debugging untuk melihat response

        // Memeriksa apakah response.data.hits.hits tersedia dan tidak kosong
        if (response.data && response.data.hits && response.data.hits.hits) {
          const recommendations = response.data.hits.hits.map((anime) => ({
            title: anime._source.name || anime._source.english_name, // Menggunakan 'name' atau 'english_name'
            image: anime._source.image_url, // Menggunakan 'image_url' dari struktur data
            score: anime._source.score, // Menggunakan 'score' dari struktur data
            genres: anime._source.genres.join(", "), // Menggabungkan daftar genre
            studios: anime._source.studios.join(", "), // Menggabungkan daftar studio
            synopsis: anime._source.synopsis, // Menambahkan synopsis
          }));
          setRecommendedAnimes(recommendations.slice(0, 10)); // Menampilkan 10 rekomendasi anime teratas
        } else {
          setError("No recommendations available.");
        }

        setError(null); // Reset error jika berhasil
      } catch (err) {
        setError("Failed to load recommendations.");
        console.error("Error fetching data:", err); // Log error ke konsol
      } finally {
        setLoading(false); // Set loading ke false setelah selesai memuat data
      }
    };

    fetchRecommendedAnimes();
  }, []); // Hanya dijalankan sekali ketika komponen pertama kali dirender

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="anime-grid">
      {recommendedAnimes.map((anime, index) => (
        <AnimeCard key={index} {...anime} />
      ))}
    </div>
  );
}

export default Recommendation;
