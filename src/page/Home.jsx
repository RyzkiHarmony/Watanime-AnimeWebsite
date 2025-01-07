import '../App.css';
import Navbar from '../components/Navbar';
import NewRelease from '../components/NewRelease';
import Popular from '../components/Popular';

const Home = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <div className="content-wrapper">
          <section>
            <h2>New Release</h2>
            <br />
            <NewRelease />
          </section>
          <br />
          <br />
        </div>
        <aside>
          <Popular />
        </aside>
      </main>
    </div>
  );
};

export default Home;
