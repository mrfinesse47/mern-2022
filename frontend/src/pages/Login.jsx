import React from "react";
import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Sign In
        </h1>
        <p>Please Log in to get support</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              required
              autoComplete="email"
              type="email"
              className="form-control"
              id="email"
              value={email}
              name="email"
              onChange={onChange}
              placeholder="enter your email"
            />
          </div>
          <div className="form-group">
            <input
              required
              type="password"
              className="form-control"
              id="password"
              value={password}
              name="password"
              onChange={onChange}
              placeholder="enter your password"
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
