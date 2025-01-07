import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import AnimeDetail from "./page/AnimeDetail";
import SearchResults from "./page/SearchResult";
import Genre from './page/genre';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list-anime" element={<div>List Anime Page</div>} />
        <Route path="/genre" element={<div><Genre /></div>} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/search" element={<SearchResults />} />

      </Routes>
    </Router>
  );
}

export default App;
