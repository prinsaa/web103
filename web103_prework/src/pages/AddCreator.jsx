import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

const AddCreator = () => {
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
  });

  const handleChange = (e) => {
    setCreator({
      ...creator,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("creators") //actual table name
        .insert([
          {
            name: creator.name,
            url: creator.url,
            description: creator.description,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log("Content creator added:", data);
      navigate("/"); // Redirect to home page or wherever you want after save
    } catch (error) {
      console.error("Error adding content creator:", error);
    }
  };

  return (
    <div>
      <h1>Add New Creator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={creator.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="url"
          name="url"
          value={creator.url}
          onChange={handleChange}
          placeholder="URL"
          required
        />
        <textarea
          name="description"
          value={creator.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCreator;
