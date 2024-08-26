import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";
import "./App.css";

function AppRoutes() {
  // Define the routes for your application
  const routes = useRoutes([
    { path: "/", element: <ShowCreators /> },
    { path: "/view/:id", element: <ViewCreator /> },
    { path: "/edit/:id", element: <EditCreator /> },
    { path: "/add", element: <AddCreator /> },
  ]);

  // Return the routes, which will be rendered in place of the content
  return <div className="App">{routes}</div>;
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
