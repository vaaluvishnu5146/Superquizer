import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigator = useNavigate();
  return (
    <div className="container h-full d-flex align-items-center justify-content-center">
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          } else if (values.name.length < 10) {
            errors.name = "Account name should be length of 10";
          } else if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          } else if (!values.phoneNumber) {
            errors.phoneNumber = "required";
          } else if (values.phoneNumber.length != 10) {
            errors.phoneNumber = "Phone number is invalid";
          } else if (!values.password) {
            errors.password = "Required";
          } else if (values.password != values.confirmPassword) {
            errors.confirmPassword = "Password doesn't match";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          fetch("http://localhost:5000/api/auth/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((response) => response.json())
            .then((result) => {
              if (result) {
                navigator("/");
              }
              setSubmitting(false);
            })
            .catch((error) => {
              setSubmitting(false);
              console.log(error);
            });
          // setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) =>
          !isSubmitting ? (
            <form onSubmit={handleSubmit}>
              <div className="card" style={{ width: 350 }}>
                <div className="card-body">
                  <div className="inputContainer">
                    <label htmlFor="email">Account Name</label>
                    <input
                      id="name"
                      name="name"
                      placeholder="Enter your Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                  </div>
                  <div className="inputContainer">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      placeholder="Enter your Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div className="inputContainer">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter your Phone Number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phoneNumber}
                    />
                    {errors.phoneNumber && (
                      <p className="error">{errors.phoneNumber}</p>
                    )}
                  </div>
                  <div className="inputContainer">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </div>
                  <div className="inputContainer">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Enter your Confirm Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                    />
                    {errors.confirmPassword && (
                      <p className="error">{errors.confirmPassword}</p>
                    )}
                  </div>
                  <div className="d-grid">
                    <Button type="submit" variant="primary" size="md">
                      Signup
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )
        }
      </Formik>
    </div>
  );
}
