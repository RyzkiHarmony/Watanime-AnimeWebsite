import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../SearchResults.css';
import Navbar from '../components/Navbar';  // Import Navbar

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [results, setResults] = useState([]);
    const [similarAnime, setSimilarAnime] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (query) {
            setIsLoading(true);
            fetch(`http://localhost:3000/search/anime?name=${encodeURIComponent(query)}`)
                .then((response) => response.json())
                .then((data) => {
                    setResults(data.hits?.hits || []);
                    if (data.hits?.hits?.[0]) {
                        const firstAnimeId = data.hits.hits[0]._id;
                        fetch(`http://localhost:3000/anime/${firstAnimeId}/recommend?page=1`)
                            .then((res) => res.json())
                            .then((similarData) => setSimilarAnime(similarData.hits?.hits || []));
                    }
                })
                .catch((error) => console.error('Error fetching data:', error))
                .finally(() => setIsLoading(false));
        }
    }, [query]);

    if (isLoading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    return (
        <div className="search-results-container">
            <Navbar />  {/* Menambahkan Navbar */}

            <div className="search-header">
                <br />
                <h1 className="section-title">Search: {query}</h1>
                <br />
            </div>

            <div className="results-container">
                <div className="results-section">

                    <div className="similar-grid">
                        {results.map((anime) => (
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
                        ))}
                    </div>
                </div>

                <div className="similar-section">
                    <br />
                    <br />
                    <h2 className="section-title">Similar Anime</h2>
                    <br />
                    <div className="similar-grid">
                        {similarAnime.map((anime) => (
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResults;
