import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./Profile.css";

const ProfileSidebar = () => {
  const location = useLocation();

  return (
    <ListGroup className="sidenav">
      <ListGroup.Item
        as={Link}
        to="/pages/profile/update"
        active={location.pathname === "/pages/profile/update"}
        className="wrapper"
      >
        Update Profile
      </ListGroup.Item>

      <ListGroup.Item
        as={Link}
        to="/pages/profile/diet"
        active={location.pathname === "/pages/profile/diet"}
        className="wrapper"

      >
        Update Diet Profile
      </ListGroup.Item>

      <ListGroup.Item
        as={Link}
        to="/pages/profile/meal-plan"
        active={location.pathname === "/pages/profile/meal-plan"}
        className="wrapper"

      >
        Meal Plan
      </ListGroup.Item>

      <ListGroup.Item
        as={Link}
        to="/pages/profile/water-intake"
        active={location.pathname === "/pages/profile/water-intake"}
        className="wrapper"

      >
        Water Intake
      </ListGroup.Item>


      <ListGroup.Item
        as={Link}
        to="/pages/diet"
        active={location.pathname === "/pages/diet"}
        className="wrapper"

      >
        Suggested Diet
      </ListGroup.Item>

      <ListGroup.Item
        as={Link}
        to="https://exercise-ml.streamlit.app/"
        active={location.pathname === "/pages/diet"}
        className="wrapper"

      >
        Reps Count
      </ListGroup.Item>

    </ListGroup>
  );
};

export default ProfileSidebar;
