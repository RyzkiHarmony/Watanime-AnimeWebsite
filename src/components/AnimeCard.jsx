function AnimeCard({ title, episode, image }) {
  return (
    <div className="anime-card">
      <div className="anime-image" style={{ backgroundImage: `url(${image})`,  }}></div>
      <div className="title">{title}</div>
      <div className="episode">Episode {episode}</div>
    </div>
  );
}

export default AnimeCard;