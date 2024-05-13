import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthenticationContext";

const validateEmail = (email) => {
  return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
};

export default function Login() {
  const navigator = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  });

  function handleInputChange(e) {
    const { value, id } = e.target;
    if (e) {
      const formDataCopy = {
        ...formData,
      };
      formDataCopy[id] = value;
      setFormData(formDataCopy);
    }
    if (id === "email") {
      if (validateEmail(value)) {
        setFormErrors({
          ...formErrors,
          email: "Email is not valid",
        });
      } else {
        setFormErrors({
          ...formErrors,
          email: null,
        });
      }
    } else if (id === "password") {
      if (value.length < 8) {
        setFormErrors({
          ...formErrors,
          password: "Password must be greater than 7 Digits only",
        });
      } else {
        setFormErrors({
          ...formErrors,
          password: null,
        });
      }
    }
  }

  function handleLogin() {
    if (!formData.email || !formData.password) {
      console.error("Invalid credentials");
    } else {
      fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result && result.success) {
            setIsLoggedIn(true);
            localStorage.setItem("token", JSON.stringify(result.token));
            navigator("/quiz");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className="container h-full d-flex align-items-center justify-content-center">
      <div className="card" style={{ width: 350 }}>
        <div className="card-body">
          <div className="inputContainer">
            <label htmlFor="email">Email Address</label>
            <input
              onChange={handleInputChange}
              id="email"
              placeholder="Enter your Email"
            />
            {formErrors["email"] && (
              <p className="error">{formErrors["email"]}</p>
            )}
          </div>
          <div className="inputContainer mb-4">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleInputChange}
              id="password"
              placeholder="Enter your Password"
            />
            {formErrors["password"] && (
              <p className="error">{formErrors["password"]}</p>
            )}
          </div>
          <div className="d-grid">
            <Button variant="primary" size="md" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
