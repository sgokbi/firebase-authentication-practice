import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SignUp.css";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithPopup,
  signOut,
  updateProfile,
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

  // ========================================================= //
  // ============== EMAIL PASSWORD SIGN UP / REGISTER METHOD =========== //

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, email, password);

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

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const loggedUser = res.user;
        console.log(loggedUser);
        setSuccess("successfully created account");
        setError("");

        handleEmailVerification(res.user);
        handleUserUpdate(res.user, name);

        // reset the form
        e.target.reset();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleUserUpdate = (currentUser, name) => {
    updateProfile(currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("user name updated");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleEmailVerification = (currentUser) => {
    sendEmailVerification(currentUser).then((res) => {
      console.log(res);
      alert("please verify your email");
    });
  };

  // ========================================================= //
  // ============== SIGN OUT METHOD =========== //
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .then((err) => {
        console.log(err);
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
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              id="name"
              placeholder="Enter user name"
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
          <p className="text-danger">{error}</p>
          <p className="text-success">{success}</p>
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
