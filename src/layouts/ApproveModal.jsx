/* eslint-disable react-hooks/exhaustive-deps */
import { Formik, Form, Field } from "formik";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { urls } from "../constants/links";
import { RiCloseLine } from "react-icons/ri";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ApproveModal = ({ setIsOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  const [students, setStudents] = useState([]);

  const controller = new AbortController();
  const fetchStudent = async () => {
    try {
      const response = await axiosPrivate.get(urls.MYSTUDENTS);
      setStudents(response.data);
    } catch (error) {
    //   toast.error("Cannot retrieve students data at this time");
    }
  };

  useEffect(() => {
    fetchStudent();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)}>
        <div className="centered">
          <div className="modal">
            <div className="modalHeader">
              <h5 className="heading">Approve</h5>
            </div>
            <button className="closeBtn" onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>

            <div className="modalContent">
                <Formik
                    initialValues={{
                        student: students,
                        present: true,
                        unit: students
                    }}
                ></Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
