import React from "react";
import { useState, useEffect } from "react";
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


async function generateOTP() {
  const email = document.getElementById('email').value;

  const response = await fetch('http://localhost:9000/generate-otp', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
  });

  const result = await response.text();
  document.getElementById('response').innerText = result;
}

async function verifyOTP() {
  const email = document.getElementById('email').value;
  const otp = document.getElementById('otp').value;

  const response = await fetch('http://localhost:9000/verify-otp', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, otp })
  });
  

  const result = await response.text();
  document.getElementById('response').innerText = result;

}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Register Successfully!");
      } catch (err) {
        toast.error(err.data.message || err.error);
      }
    }
  };

  return (
    <div   className="py-5"
      style={{
        backgroundImage: `url(${fitnessBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "50vh",
        height: "100vh",
        opacity: "0.8",
      }}>
<FormContainer className="d-flex justify-content-center" style={{backgroundColor:"red"}}>
        <h1 style={{color:"#fdffcd", textAlign:"center"}}>REGISTRATION</h1>
        <Form onSubmit={submitHandler}
        
        >
          <Form.Group className="my-2" controlId="name">
            <Form.Label style={{color:"white"}}>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="formcontrol"
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label style={{color:"white"}}>Email address</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="username"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="formcontrol"
              label="email"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className=" py-2">
            <Form.Label style={{color:"white"}}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="formcontrol"
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-2">
            <Form.Label style={{color:"white"}}>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="formcontrol"
            ></Form.Control>
          </Form.Group>

          {isLoading && <Loader />}

          <Button variant="primary" type="submit">
            <BsLock /> Sign Up
          </Button>

          <Row className="py-3">
            <Col style={{color:"white"}}>
              Already Have An Account? <Link to="/pages/login">Login</Link>
            </Col>
          </Row>
        </Form>
        <div class="form-label-group">
        <label for="otp"></label>
              <input type="text" id="otp" placeholder="Enter OTP"/>
            </div>

            <button className="btn btn-lg btn-dark btn-block mb-2 bg-blue-300" onClick={generateOTP}>Generate OTP</button>
            <button className="btn btn-lg btn-info btn-block mt-2" onClick={verifyOTP}>Verify OTP</button>
            <p className="message" id="response" style={{color:"green"}}></p>
      </FormContainer>
    </div>
  );
};

export default Register;
