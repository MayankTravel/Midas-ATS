import React, { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import NonAuthLayout from "@common/Layout/NonAuthLayout";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  registerUser,
  apiError,
  resetRegisterFlag,
} from "Components/slices/thunk";
import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";
import { useRouter } from "next/router";

//import images
import logoLightFull from "@assets/images/logob.png";
import authEffect2 from "@assets/images/effect-pattern/auth-effect-2.png";
import authEffect from "@assets/images/effect-pattern/auth-effect.png";
import { ResetPassword } from "Components/slices/user/thunk";
const Register = ({ id }: any) => {
  const history: any = useRouter();
  const dispatch: any = useDispatch();
  const router = useRouter();

  const [passwordtype, setPasswordtype] = useState<boolean>(true);

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Please Enter Your Password")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
          "Must Contain 5 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: (values) => {
      dispatch(ResetPassword(values, router, id));
      localStorage.clear();
    },
  });

  const { error, registrationError, success } = useSelector((state: any) => ({
    registrationError: state.Account.registrationError,
    success: state.Account.success,
    error: state.Account.error,
  }));

  useEffect(() => {
    dispatch(apiError());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => history.push("/auth/login"), 3000);
    }

    setTimeout(() => {
      dispatch(resetRegisterFlag());
    }, 3000);
  }, [dispatch, success, error, history]);

  return (
    <React.Fragment>
      <Head>
        <title>Sign Up | Midas - Jobs Portal</title>
      </Head>
      <section className="auth-page-wrapper py-5 position-relative d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <Container>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Body>
                  <Row className="g-0">
                    <Col lg={5}>
                      <div className="auth-card card bg-primary h-100 border-0 shadow-none p-sm-3 overflow-hidden">
                        <Card.Body className="p-4 d-flex justify-content-between flex-column">
                          <div className="auth-image">
                            <Image src={logoLightFull} alt="" height="26" />
                            <Image
                              src={authEffect2}
                              alt=""
                              className="auth-effect-2"
                            />
                            <Image
                              src={authEffect}
                              alt=""
                              className="auth-effect"
                            />
                            <Image
                              src={authEffect}
                              alt=""
                              className="auth-effect-3"
                            />
                          </div>

                          <div>
                            <h3 className="text-white">
                              Start your journey with us.
                            </h3>
                            <p className="text-white-75 fs-15">
                              It brings together your tasks, projects,
                              timelines, files and more
                            </p>
                          </div>
                          <div className="text-center text-white-75">
                            <p className="mb-0">
                              © {new Date().getFullYear()} Midas. Crafted with
                              <i className="mdi mdi-heart text-danger"></i> by
                              Midas Tech
                            </p>
                          </div>
                        </Card.Body>
                      </div>
                    </Col>
                    <Col lg={7}>
                      <Card className="mb-0 border-0 py-3 shadow-none">
                        <Card.Body className="px-0 p-sm-5 m-lg-4">
                          <div className="text-center mt-2">
                            <h5 className="text-primary fs-20">
                              Reset your Password
                            </h5>
                            <p className="text-muted">
                              Get your free Midas account now
                            </p>
                          </div>
                          <div className="p-2 mt-5">
                            <Form
                              className="needs-validation"
                              onSubmit={(e: any) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                              }}
                              noValidate
                              action="#"
                            >
                              {success && success ? (
                                <>
                                  {toast("Your Redirect To Login Page...", {
                                    position: "top-right",
                                    hideProgressBar: false,
                                    className: "bg-success text-white",
                                    progress: undefined,
                                    toastId: "",
                                  })}
                                  <ToastContainer
                                    autoClose={2000}
                                    limit={1}
                                    closeButton={false}
                                  />
                                  <Alert variant="success">
                                    Register User Successfully and Your Redirect
                                    To Login Page...
                                  </Alert>
                                </>
                              ) : null}

                              {error && error ? (
                                <Alert variant="danger">
                                  <div>
                                    {/* {registrationError} */}
                                    Email has been Register Before, Please Use
                                    Another Email Address...
                                  </div>
                                </Alert>
                              ) : null}

                              <div className="mb-3">
                                <Form.Label
                                  className="form-label"
                                  htmlFor="password-input"
                                >
                                  New-Password
                                </Form.Label>
                                <div className="position-relative auth-pass-inputgroup">
                                  <Form.Control
                                    type={passwordtype ? "password" : "text"}
                                    className="form-control pe-5 password-input"
                                    placeholder="Enter password"
                                    id="password-input"
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    name="password"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.password || ""}
                                    isInvalid={
                                      validation.touched.password &&
                                      validation.errors.password
                                        ? true
                                        : false
                                    }
                                    required
                                  />
                                  <Button
                                    variant="link"
                                    className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                    type="button"
                                    id="password-addon"
                                    onClick={() =>
                                      setPasswordtype(!passwordtype)
                                    }
                                  >
                                    <i className="ri-eye-fill align-middle"></i>
                                  </Button>
                                  {validation.touched.password &&
                                  validation.errors.password ? (
                                    <Form.Control.Feedback type="invalid">
                                      <div>{validation.errors.password}</div>
                                    </Form.Control.Feedback>
                                  ) : null}
                                </div>
                              </div>

                              <div className="mb-4">
                                <p className="mb-0 fs-12 text-muted fst-italic">
                                  By registering you agree to the Midas
                                </p>
                              </div>

                              <div className="mt-4">
                                <Button
                                  variant="primary"
                                  className="w-100"
                                  type="submit"
                                >
                                  Submit
                                </Button>
                              </div>
                            </Form>
                          </div>
                          <div className="mt-4 text-center">
                            <p className="mb-0">
                              Already have an account ?
                              <Link
                                href="/auth/login"
                                className="fw-semibold text-primary text-decoration-underline"
                              >
                                Signin
                              </Link>
                            </p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};
export async function getServerSideProps(context: any) {
  const { id } = context.query;
  console.log(id);
  return { props: { id: id } };
}

Register.getLayout = function getLayout(page: any) {
  return <NonAuthLayout>{page}</NonAuthLayout>;
};

export default Register;
