/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Sidenav from "../layouts/Sidenav";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { privateLinks, urls } from "../constants/links";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Students() {
    const axiosPrivate = useAxiosPrivate();
    const [students, setStudents] = useState([]);

    const controller = new AbortController();
    const fetchStudent = async () => {
        try {
            const response = await axiosPrivate.get(urls.MYSTUDENTS);
            setStudents(response.data);
            console.log(response.data.students)
        } catch (error) {
            toast.error("Cannot retrieve students data at this time")
        }
    };

    useEffect(() => {
        fetchStudent();
        return () => {
            controller.abort();
        };
    }, [])

  return (
    <>
        <div className="main">
            <Sidenav />
            <main className="content">
                <nav className="page-nav">
                    <h2>Students Registered</h2>
                </nav>

                <section className="home">
                    <div className="table-responsive">
                        <table className="styled-table" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Unit</th>
                                    <th>Registration Number</th>
                                    <th>Student Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.unit}</td>
                                        <td>{student.regnumber}</td>
                                        <td>{student.sname}</td>
                                        <td>
                                            <div>
                                                <Link className="nav-button">MARK</Link>
                                            </div>
                                        </td>
                                    </tr> 
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </main>
        </div>
    </>
  );
}
