import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { BsLock } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import fitnessBg from "../assets/images/fitnessbg.jpg";
import "./Register.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispath = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispath(setCredentials({ ...res }));
      navigate("/");
      toast.success("Login Successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className=" py-5"
    style={{
      backgroundImage: `url(${fitnessBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "50vh",
      height: "100vh",
      opacity: "0.8",
    }}
    >
      <FormContainer className="d-flex justify-content-center">
        <h1 style={{color:"#fdffcd",textAlign:"center"}}>LOGIN</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formEmail">
            <Form.Label style={{color:"white"}}>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="formcontrol"

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

          {isLoading && <Loader />}

          <Button variant="primary" type="submit">
            <BsLock /> Login
          </Button>

          <Row className="py-3">
            <Col style={{color:"white"}}>
              New Customer? <Link to="/pages/register">Register</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Login;
