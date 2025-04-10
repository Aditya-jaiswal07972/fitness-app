import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { BsLock } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import fitnessBg from "../assets/images/fitnessbg.jpg"; 
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false); // NEW state to track OTP verification

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const generateOTP = async () => {
    if (!email) {
      toast.error("Please enter an email to generate OTP.");
      return;
    }

    const response = await fetch("http://localhost:9000/generate-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await response.text();
    toast.info(result);
  };

  const verifyOTP = async () => {
    if (!email || !otp) {
      toast.error("Please enter email and OTP.");
      return;
    }

    const response = await fetch("http://localhost:9000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const result = await response.text();

    if (result === "OTP verified successfully") {
      setIsOtpVerified(true);
      toast.success("OTP Verified!");
    } else {
      setIsOtpVerified(false);
      toast.error("OTP verification failed.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isOtpVerified) {
      toast.error("Please verify OTP before registering.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Registered Successfully!");
        navigate("/login");
      } catch (err) {
        toast.error(err.data?.message || err.error);
      }
    }
  };

  return (
    <div
      className="py-5"
      style={{
        backgroundImage: `url(${fitnessBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "50vh",
        height: "100vh",
        opacity: "0.8",
      }}
    >
      <FormContainer>
        <h1 style={{ color: "#fdffcd", textAlign: "center" }}>REGISTRATION</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label style={{ color: "white" }}>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="formcontrol"
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label style={{ color: "white" }}>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="formcontrol"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="py-2">
            <Form.Label style={{ color: "white" }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="formcontrol"
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-2">
            <Form.Label style={{ color: "white" }}>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="formcontrol"
            />
          </Form.Group>

          {isLoading && <Loader />}

          <Button variant="primary" type="submit">
            <BsLock /> Sign Up
          </Button>

          <Row className="py-3">
            <Col style={{ color: "white" }}>
              Already Have An Account? <Link to="/pages/login">Login</Link>
            </Col>
          </Row>
        </Form>

        <div className="form-label-group">
          <Form.Label style={{ color: "white" }} >Enter OTP</Form.Label>
          <Form.Control
            type="text"
            className="inputOTP"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <Button
          variant="dark"
          className="btn btn-lg btn-block mb-2"
          onClick={generateOTP}
        >
          Generate OTP
        </Button>
        <Button
          variant="info"
          className="btn btn-lg btn-block mt-2"
          onClick={verifyOTP}
        >
          Verify OTP
        </Button>
      </FormContainer>
    </div>
  );
};

export default Register;
