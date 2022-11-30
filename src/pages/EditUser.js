/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegistrationSchema } from "../validation/validation";
import { privateLinks, publicLinks } from "../constants/links";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function EditUser() {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
  return (
    <>
        <div className="reg">
            <Formik 
                initialValues={{
                    name: "",
                    email: "",
                    username: ""
                }}
                validationSchema={RegistrationSchema}
                onSubmit={async (values) => {
                    const formData = new FormData();
                    formData.append("name", values.name);
                    formData.append("email", values.email);
                    formData.append("username", values.username);
                    try {
                        await axiosPrivate.patch(`me/${auth?.user_id}/`, formData);
                    } catch (error) {
                        toast.error("Log in again to see your details")
                    }
                }}
                >
                    {({ errors, touched }) => (
          <Form className="reg-form">
            <h2 className="form-title">Update your details</h2>

            <div className="input-entry">
              <label htmlFor="name">Full Name</label>
              <Field name="name" className="input-field" />
            </div>

            <div className="input-entry">
              <label htmlFor="email">Email</label>
              <Field name="email" className="input-field" />
              {touched.email && errors.email && (
                <div className="input-error">{errors.email}</div>
              )}
            </div>

            <div className="input-entry">
              <label htmlFor="username">Username</label>
              <Field name="username" className="input-field" />
              {touched.username && errors.username && (
                <div className="input-error">{errors.username}</div>
              )}
            </div>


            <button type="submit" className="form-btn">
              Submit
            </button>

            <p className="input-link">
                <span>Changed your mind?</span>{" "}
                <Link to="/dashboard" className="input-redirect">
                  Go back to Dashboard
                </Link>
              </p>
          </Form>
        )}
                </Formik>
        </div>
    </>
  )
}