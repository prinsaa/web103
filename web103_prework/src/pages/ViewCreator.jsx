// src/pages/ViewCreator.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";

function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); //goes back to the main page
  };

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single(); // Fetch a single creator based on the id

      if (error) {
        console.error("Error fetching creator:", error);
      } else {
        setCreator(data);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!creator) {
    return <div>Content creator not found</div>;
  }

  return (
    <div className="creator-details">
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noopener noreferrer">
        Visit YouTube Channel
      </a>
      <div>
        <button
          style={{ backgroundColor: "black", color: "white" }}
          onClick={handleGoBack}
        >
          Go Back to Main Page
        </button>
      </div>
    </div>
  );
}

export default ViewCreator;
