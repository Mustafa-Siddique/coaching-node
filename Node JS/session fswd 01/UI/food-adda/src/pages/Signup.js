import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

export const Signup = (props) => {
  // State variables for the form
  const [pswd, setPswd] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");

  // Signup form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (pswd !== confirmPswd) {
      toast.error("Passwords do not match!");
      return;
    }
    // Get the form data
    const email = e.target.elements.registerMail.value;
    const userType = e.target.elements.group1.value;
    const phone = e.target.elements.registerPhone.value;

    // Create a FormData object
    const formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", pswd);
    formData.append("userType", userType);

    const data = Object.fromEntries(formData);
    console.log(data);

    // Create the axios request options
    const headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };
    const bodyContent = JSON.stringify(data);
    const reqOptions = {
      url: "localhost:5002/signup",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };
    // Send the data to the backend using axios and save the token in session storage
    const response = await axios(reqOptions);
    console.log(response);

    // Close the modal and toast a success message
    toast.success("Signed up successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    props.onHide();
  };

  return (
    <div id="signup-page" className="px-2 px-lg-0">
      <div className="login-container d-flex flex-column align-items-center py-4 px-2 rounded shadow-lg">
        {/* Sign up form goes here */}
        <div className="signup-container d-flex flex-column align-items-center">
          <img
            src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            className="w-75 rounded"
            alt=""
          />
          <Form className="mt-4 w-100" onSubmit={handleSubmit}>
            {/* A react bootstrap switch to choose between Chef or Customer */}
            <div className="d-flex justify-content-between mb-3">
              <Form.Label className="h5">Register as:</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Chef"
                  name="group1"
                  value={"chef"}
                  type="radio"
                  id="radio-1"
                  required
                />
                <Form.Check
                  inline
                  label="Customer"
                  name="group1"
                  value={"customer"}
                  type="radio"
                  id="radio-2"
                />
              </div>
            </div>
            <Form.Group className="mb-3" controlId="registerMail">
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPhone">
              <Form.Control type="tel" placeholder="Enter phone number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Control
                type="password"
                placeholder="Password (min 6 characters)"
                onChange={(e) => {
                  setPswd(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPswd(e.target.value);
                }}
              />
            </Form.Group>
            <Button type="submit" className="bg-dark w-100">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
