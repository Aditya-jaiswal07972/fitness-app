import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import "./Home.css"; // External CSS for proper styling

const HomeContent = () => {
  return (
    <div
      style={{
        paddingBottom:"100px",
        color: "white",
        overflowX: "hidden", // Prevent horizontal overflow
      }}
    >
      <Row className="mb-4" style={{ marginTop: "200px" }}>
        <Col className="text-center">
          <h2>BREAK THE LIMITS!!</h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={0} lg={2}>
          <div className="gallery" style={{ marginTop: "50px" }}>
            <span style={{ "--i": 1 }}>
              <img
                src="https://images.stockcake.com/public/7/0/7/707de8aa-8fc7-4a44-ae75-b43b3e205f6e_large/intense-gym-workout-stockcake.jpg"
                alt=""
              />
            </span>
            <span style={{ "--i": 2 }}>
              <img
                src="https://images.stockcake.com/public/7/2/1/721c7c9a-47a4-4226-8ff8-0bab07c5128e_large/intense-workout-session-stockcake.jpg"
                alt=""
              />
            </span>
            <span style={{ "--i": 3 }}>
              <img
                src="https://i.ytimg.com/vi/b2NO_SoCd0g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBRxoTJ1lCoy3qOgN5qXfNn7xG4GA"
                alt=""
              />
            </span>
            <span style={{ "--i": 4 }}>
              <img
                src="https://i.ytimg.com/vi/gey73xiS8F4/maxresdefault.jpg"
                alt=""
              />
            </span>
            <span style={{ "--i": 5 }}>
              <img
                src="https://images.stockcake.com/public/5/6/c/56c0cadf-4024-40c7-94b6-f530b2e302fd_large/intense-gym-workout-stockcake.jpg"
                alt=""
              />
            </span>
            <span style={{ "--i": 6 }}>
              <img
                src="https://img.freepik.com/premium-photo/muscular-woman-doing-back-training-with-barbell-gym-fit-woman-weightlifting-gym_360066-6048.jpg"
                alt=""
              />
            </span>
            <span style={{ "--i": 7 }}>
              <img
                src="https://img.freepik.com/premium-photo/couple-training-gym_926199-2696503.jpg"
                alt=""
              />
            </span>
            <span style={{ "--i": 8 }}>
              <img
                src="https://miro.medium.com/v2/resize:fit:1400/1*-1D7YmRD8R0tprwZCsxjow.jpeg"
                alt=""
              />
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeContent;
