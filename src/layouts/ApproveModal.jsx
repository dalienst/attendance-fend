import { Formik, Form, Field } from "formik";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { urls } from "../constants/links";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Modal = ({ setIsOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Mark Student</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>

          <div className="modalContent">
            <Formik
              initialValues={{
                student: "",
                present: true,
                unit: "",
              }}
              onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("unit", values.unit);
                formData.append("student", values.student);
                try {
                  await axiosPrivate.post(urls.APPROVE, formData);
                  toast.success("Student Marked");
                  setIsOpen(false);
                } catch (error) {}
              }}
            >
              {({ touched }) => (
                <Form className="profile-card">
                  <div className="update-input-entry">
                    <label htmlFor="unit">Unit Code</label>
                    <Field name="unit" className="input-field" />
                  </div>

                  <div className="update-input-entry">
                    <label htmlFor="student">
                      Student Registration Number
                    </label>
                    <Field name="student" className="input-field" />
                  </div>

                  <button type="submit" className="nav-button">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {/* <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" type="submit">
                Add
              </button>
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Modal;
