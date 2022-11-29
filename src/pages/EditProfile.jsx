/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProfileSchema } from "../validation/validation";
import { privateLinks, publicLinks } from "../constants/links";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function EditProfile() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  return (
    <>
      <div className="reg">
        <Formik
          initialValues={{
            name: "",
            contact: "",
            location: "",
            bio: "",
          }}
          validationSchema={ProfileSchema}
          onSubmit={async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("contact", values.contact);
            formData.append("location", values.location);
            formData.append("bio", values.bio);
            try {
              await axiosPrivate.patch(`profile/${auth?.user_id}/`, formData);
              toast.success("Profile Updated Successfully");
              navigate(privateLinks.Profile, { replace: true });
            } catch (error) {
              toast.error("Cannot update at the moment. Try again later");
            }
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="reg-form">
              <h2 className="form-title">Update your profile</h2>

              <div className="input-entry">
                <label htmlFor="name">First Name</label>
                <Field name="name" className="input-field" />
                {touched.name && errors.name && (
                  <div className="input-error">{errors.name}</div>
                )}
              </div>

              <div className="input-entry">
                <label htmlFor="contact">Contact</label>
                <Field name="contact" className="input-field" />
              </div>

              <div className="input-entry">
                <label htmlFor="location">Location</label>
                <Field name="location" className="input-field" />
              </div>

              <div className="input-entry">
                <label htmlFor="bio">Bio</label>
                <Field name="bio" className="input-field" />
                {touched.bio && errors.bio && (
                  <div className="input-error">{errors.bio}</div>
                )}
              </div>

              <button type="submit" className="form-btn">
                Submit
              </button>

              <p className="input-link">
                <span>Changed your mind?</span>{" "}
                <Link to="/profile" className="input-redirect">
                  Go back to Profile
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
