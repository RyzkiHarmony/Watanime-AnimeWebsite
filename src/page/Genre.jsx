import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';  // Mengimpor Navbar
import '../Genre.css';  // Pastikan file CSS sudah ada untuk styling halaman ini

function Genre() {
    const [genres, setGenres] = useState(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Slice of Life']); // Daftar genre
    const [selectedGenre, setSelectedGenre] = useState('');
    const [animeList, setAnimeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (selectedGenre) {
            setIsLoading(false);
            fetch(`http://localhost:3000/search/anime?genre=${encodeURIComponent(selectedGenre)}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data); // Log data untuk memverifikasi apakah data berhasil diambil
                    setAnimeList(data.hits?.hits || []); // Menyimpan data anime berdasarkan genre
                })
                .catch((error) => {
                    console.error('Error fetching anime by genre:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [selectedGenre]);

    const handleGenreChange = (genre) => {
        setSelectedGenre(genre);
    };

    if (isLoading) {
        return <div className="loading-spinner">Loading...</div>; // Menampilkan teks loading jika isLoading true
    }

    return (
        <div className="genre-container">
            <Navbar />
            <div className="search-header">
                <br />
                <h1 className="section-title">Select Genre</h1>
                <br />
            </div>

            <div className="genre-list">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
                        onClick={() => handleGenreChange(genre)}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            {selectedGenre && (
                <div>
                    <h2 className="section-title">Anime in {selectedGenre} Genre</h2>
                    <div className="similar-grid">
                        {animeList.length === 0 ? (
                            <p>No anime found for this genre.</p>
                        ) : (
                            animeList.map((anime) => (
                                <Link
                                    to={`/anime/${anime._id}`}
                                    key={anime._id}
                                    className="similar-card"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <div>
                                        <img
                                            src={anime._source.image_url || '/placeholder.jpg'}
                                            alt={anime._source.name}
                                            className="similar-image"
                                        />
                                        <h3>{anime._source.name}</h3>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Genre;
