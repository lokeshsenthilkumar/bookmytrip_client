import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg">
      <h1> Welcome to BookMyTrip </h1>
      <h3>
      Explore the world with fantastic places to venture around
      </h3>

      <div>
        <Link to="/signup" className="btc" style={{ marginTop: 20 }}>
          <button className="homebtn" >Learn more</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;