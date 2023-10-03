import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

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

        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-danger mx-2">Google sign up</button>
          <button className="btn btn-success mx-2">Github sign up</button>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
