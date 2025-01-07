import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import '../AnimeDetail.css';
import Navbar from '../components/Navbar';

function AnimeDetail() {
    const { id } = useParams();
    const [animeDetail, setAnimeDetail] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch anime detail
        fetch(`http://localhost:3000/anime/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setAnimeDetail(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching anime detail:", error);
                setIsLoading(false);
            });

        // Fetch anime recommendations
        fetch(`http://localhost:3000/anime/${id}/recommend?page=1`)
            .then((response) => response.json())
            .then((data) => {
                setRecommendations(data.hits?.hits || []); // Assuming response format
            })
            .catch((error) => {
                console.error("Error fetching recommendations:", error);
            });
    }, [id]);

    if (isLoading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (!animeDetail) {
        return <div className="error-message">Anime detail not found. Please try again later.</div>;
    }

    const {
        image_url,
        name,
        synopsis,
        type,
        studios,
        genres,
        status,
        duration,
    } = animeDetail._source;

    return (
        <div className="app">
            <Navbar />
            <div className="anime-detail-container">
                <div className="anime-header">
                    <div className="anime-poster">
                        <img
                            src={image_url || '/placeholder.jpg'}
                            alt={name}
                        />
                        <div className="action-buttons">
                            <button className="add-list-btn">+ Add List</button>
                            <button className="watch-btn">Watch</button>
                        </div>
                    </div>

                    <div className="anime-info">
                        <h1>{name}</h1>

                        <div className="synopsis">
                            <h3>Synopsis:</h3>
                            <p>{synopsis || 'Synopsis not available.'}</p>
                        </div>

                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="label">Type:</span>
                                <span className="value">{type || 'Unknown'}</span>
                            </div>

                            <div className="detail-item">
                                <span className="label">Studios:</span>
                                <span className="value">{studios?.join(", ") || 'N/A'}</span>
                            </div>

                            <div className="detail-item">
                                <span className="label">Genres:</span>
                                <span className="value">{genres?.join(", ") || 'N/A'}</span>
                            </div>

                            <div className="detail-item">
                                <span className="label">Status:</span>
                                <span className="value">{status || 'Unknown'}</span>
                            </div>

                            <div className="detail-item">
                                <span className="label">Duration:</span>
                                <span className="value">{duration || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="similar-anime">
                    <h2>Similar Anime</h2>
                    <div className="similar-grid">
                        {recommendations.length === 0 ? (
                            <p>No recommendations available.</p>
                        ) : (
                            recommendations.map((anime) => (
                                <Link
                                    to={`/anime/${anime._id}`} // Redirect to anime detail page
                                    key={anime._id}
                                    className="similar-card"
                                    style={{ textDecoration: 'none', color: 'inherit' }} // Keep the styling intact
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
            </div>
        </div>
    );
}

export default AnimeDetail;
