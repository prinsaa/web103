import { useState, useEffect } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import Creator from "../components/Creator";
import "./ShowCreators.css";
import { useNavigate } from "react-router-dom";

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("creators").select("*");

      if (error) {
        console.error("Error fetching creators:", error);
      } else {
        setCreators(data);
      }
      setLoading(false);
    };

    fetchCreators();
  }, []);

  const addNewCreator = () => {
    navigate("/add"); // go to add creator page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="creator-container">
      <h1>Creatorverse: The Top 5 YouTubers to Follow</h1>
      <button
        style={{ background: "green", color: "white" }}
        onClick={addNewCreator}
      >
        Create New Creators
      </button>

      {creators.length > 0 ? (
        creators.map((creator) => (
          <div key={creator.id} className="creator-box">
            <Creator
              name={creator.name}
              url={creator.url}
              description={creator.description}
            />
            <div className="creator-buttons">
              <Link to={`/view/${creator.id}`}>More Info</Link>
              <Link to={`/edit/${creator.id}`}>Edit Info</Link>
            </div>
          </div>
        ))
      ) : (
        <p>No content creators found.</p>
      )}
    </div>
  );
}

export default ShowCreators;
