import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "./Features.css";
import BgImage from "../assets/images/bgimage.jpg";

const FeatureCard = ({ title, description, link, image }) => {
  return (
    <Card className="feature-card">
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <Card.Body>
        <div className="content">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Link to={link} className="btn btn-primary">
            Learn More
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

const FeaturesPage = () => {
  const features = [
    {
      title: "Workout Database",
      description:
        "Our workout database is a comprehensive resource for anyone looking to improve their fitness. Find the perfect routine to target your specific goals.",
      link: "/pages/workouts",
      image: "https://images.stockcake.com/public/1/4/4/1442875a-a4ae-491f-ba37-3d892d972779_large/intense-lifting-session-stockcake.jpg",
    },
    {
      title: "Nutrition Checker",
      description:
        "With Nutrition Checker, you can quickly and easily see the nutritional value of any food, including calories, fat, protein, carbohydrates.",
      link: "/pages/nutrition-checker",
      image: "https://recipecard.io/wp-content/uploads/2024/09/nutrition-feat-img.png",
    },
    {
      title: "BMR Calculator",
      description:
        "Calculate your Basal Metabolic Rate (BMR) to determine your daily calorie needs. Get insights into your metabolism.",
      link: "/pages/bmr-calculator",
      image: "https://myyogaayurveda.com/wp-content/uploads/2022/05/flat-infographic-metabolism-level-scale-with-arrow-measurement-value_88138-934.webp",
    },
    {
      title: "Create Account",
      description:
        "Create a personalized account to access additional features, save your progress, and customize your experience.",
      link: "/pages/register",
      image: "https://www.shutterstock.com/shutterstock/videos/3633134879/thumb/8.jpg?ip=x480",
    },
    {
      title: "Meal Planner",
      description:
        "The Meal Planner is a feature that helps you plan your meals for the Day. The Meal Planner is a great way to save time and money, and to eat healthier!",
      link: "/pages/profile/meal-plan",
      image: "https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/17537/logo.png",
    },
    {
      title: "Water Intake Log",
      description:
        "Feature that helps you track how much water you drink each day. You can enter the amount of water you drink each time you take a drink.",
      link: "/pages/profile/water-intake",
      image: "https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?cs=srgb&dl=pexels-pixabay-327090.jpg&fm=jpg",
    },
  ];

  return (
    <>
        <Row className="justify-content-center g-4 featurescontain"
         style={{
           backgroundImage: `url(${BgImage})`,
           backgroundSize: "cover",
           backgroundPosition: "center",
           margin: "0",
           maxWidth: "100%",
           maxHeight: "100%",
           paddingBottom: "200px",
         }}
        >

         <h2 className="text-center mb-4">App Features</h2>

          {features.map((feature, index) => (
            <Col key={index} xs={12} md={6} lg={6} className="feature-card-wrapper">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                link={feature.link}
                image={feature.image} // Pass the image here
              />
            </Col>
          ))}
        </Row>
      <Footer />
    </>
  );
};

export default FeaturesPage;
