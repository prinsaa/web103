import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client"; // Adjust path as needed

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
  });

  useEffect(() => {
    // Fetch creator by id from Supabase
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from("creators") // Replace with your actual table name
          .select("*")
          .eq("id", id)
          .single(); // Fetch a single row based on the id

        if (error) {
          throw error;
        }

        setCreator(data);
      } catch (error) {
        console.error("Error fetching content creator:", error);
      }
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    setCreator({
      ...creator,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoBack = () => {
    navigate(`/view/${id}`); //goes back to the its own page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("creators")
        .update({
          name: creator.name,
          url: creator.url,
          description: creator.description,
        })
        .eq("id", id); // Identify the row to update by id

      if (error) {
        throw error;
      }

      console.log("Content creator updated:", data);
      navigate(`/view/${id}`);
    } catch (error) {
      console.error("Error updating content creator:", error);
    }
  };

  const deleteCreator = async () => {
    try {
      const { data, error } = await supabase
        .from("creators")
        .delete()
        .eq("id", id); // Identify the row to delete by id

      if (error) {
        throw error;
      }

      console.log("Content creator deleted:", data);
      navigate("/"); // Redirect to the main page
    } catch (error) {
      console.error("Error deleting content creator:", error);
    }
  };

  return (
    <div>
      <h1>Edit the Creator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h4 style={{ color: "purple" }}>Name:</h4>
          <input
            type="text"
            name="name"
            value={creator.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>

        <div>
          <h4 style={{ color: "purple" }}>URL to YouTube Channel:</h4>
          <input
            type="url"
            name="url"
            value={creator.url}
            onChange={handleChange}
            placeholder="URL"
            required
          />
        </div>

        <div>
          <h4 style={{ color: "purple" }}>Creator Description: </h4>
          <textarea
            name="description"
            value={creator.description}
            onChange={handleChange}
            placeholder="Description"
            style={{ marginBottom: "20px" }}
          />
        </div>

        <button
          style={{ background: "crimson", color: "white" }}
          onClick={deleteCreator}
        >
          Delete
        </button>
        <button
          style={{ backgroundColor: "green", color: "white" }}
          type="submit"
        >
          Save
        </button>
        <div>
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              marginTop: "40px",
            }}
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
