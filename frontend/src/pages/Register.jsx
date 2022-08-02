import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("passwords do not match");
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please Create an Account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              required
              type="text"
              className="form-control"
              id="name"
              value={name}
              name="name"
              onChange={onChange}
              placeholder="enter your name"
            />
          </div>
          <div className="form-group">
            <input
              required
              autoComplete="username"
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
            <input
              required
              type="password"
              className="form-control"
              id="password2"
              value={password2}
              name="password2"
              onChange={onChange}
              placeholder="confirm password"
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

export default Register;
