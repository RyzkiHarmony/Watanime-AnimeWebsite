import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">Watanime</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/list-anime">List Anime</Link>
        <Link to="/genre">Genre</Link>
      </div>
      <div className="search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search anime or movie"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
