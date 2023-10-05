import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SignUp.css";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

const SingUp = () => {
  const [user, setUser] = useState(null);

  // ============== GOOGLE SIGN UP METHOD =================== //
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res.user);
        const loggedUser = res.user;
        setUser(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .then((err) => {
        console.log(err);
      });
  };

  // ========================================================= //
  // ============== GITHUB SIGN UP METHOD =================== //

  const githubProvider = new GithubAuthProvider();
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((res) => {
        console.log(res.user);
        const loggedUser = res.user;
        setUser(loggedUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container my-5 ">
      <div className="text-center  mb-4 w-75 mx-auto p-3">
        {user && (
          <div>
            <h1>{user.displayName}</h1>
            <h4> {user.email}</h4>
          </div>
        )}

        {user ? <button onClick={handleSignOut}> Sign Out </button> : ""}
      </div>

      <h3 className="text-center text-primary">Please create an account!</h3>

      {/* FORM FROM BOOTSTRAP */}
      <div className="shadow rounded w-75 mx-auto my-5 p-5">
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="name"
              id="name"
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              id="email"
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
          <p>
            <small>
              Already have an account? <Link to="/login">Login</Link> Please.
            </small>
          </p>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="google w-75 mx-auto d-flex align-items-center justify-content-center"
        >
          <img className="mx-3" src="google.png" alt="" />
          <p className="pt-3  fs-4">Google sign up</p>
        </div>

        <div
          onClick={handleGithubSignIn}
          className="google w-75 mx-auto d-flex align-items-center justify-content-center mt-3"
        >
          <img className="mx-3" src="github.png" alt="" />
          <p className="pt-3 fs-4">Github sign up</p>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
