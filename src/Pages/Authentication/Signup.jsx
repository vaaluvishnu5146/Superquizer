import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import Spinner from "react-bootstrap/Spinner";

export default function Signup() {
  return (
    <div className="container h-full d-flex align-items-center justify-content-center">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          } else if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 5000);
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
                    <label htmlFor="password">Password</label>
                    <input
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
                  <div className="d-grid">
                    <Button type="submit" variant="primary" size="md">
                      Login
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
