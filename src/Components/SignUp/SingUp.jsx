import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SingUp = () => {
  return (
    <div className="container my-5 ">
      <h3 className="text-center text-primary">Please create an account!</h3>
      {/* FORM FROM BOOTSTRAP */}

      <div className="shadow rounded w-75 mx-auto my-5 p-5">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="email"
              name="name"
              id="name"
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <div className=" mt-4">
          <p>
            <small>
              Already have an account? <Link to="/login">Login</Link> Please.
            </small>
          </p>
        </div>

        <div className="google w-75 mx-auto d-flex align-items-center justify-content-center">
          <img className="mx-3" src="google.png" alt="" />
          <p className="pt-3  fs-4">Google sign up</p>
        </div>

        <div className="google w-75 mx-auto d-flex align-items-center justify-content-center mt-3">
          <img className="mx-3" src="github.png" alt="" />
          <p className="pt-3 fs-4">Github sign up</p>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
