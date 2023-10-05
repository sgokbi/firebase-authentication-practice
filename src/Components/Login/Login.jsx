import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../firebase/firebase.config";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // 2. collect form data
    const email = e.target.email.value;
    const password = e.target.password.value;

    // validate
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("please add at least one uppercase");
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setError("please add at lest two numbers");
      return;
    } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError("please add one special character");
      return;
    } else if (password.length < 6) {
      setError("Please add at least 6 characters in your password");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const loggedUser = res.user;
        if (!loggedUser.emailVerified) {
          alert("haven't verified email");
        }

        setSuccess("user login successfully");
        setError("");

        // reset form
        e.target.reset();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("please provide your email address to reset password!");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("please check your email");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="shadow rounded w-75 mx-auto my-5 p-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
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
          <p className="text-danger">{error}</p>
          <p className="text-success">{success}</p>
          <p>
            <small>
              Forget password? Please
              <button onClick={handleResetPassword} className="btn btn-link">
                Reset password
              </button>
            </small>
          </p>
          <p>
            <small>
              New to this Website? Please <Link to="/">Sign Up</Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
