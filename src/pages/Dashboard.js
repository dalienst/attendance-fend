/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Sidenav from "../layouts/Sidenav";
import LogoutButton from "../layouts/LogoutButton";
import { privateLinks } from "../constants/links";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { urls } from "../constants/links";

export default function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState([]);
  const [units, setUnits] = useState([]);
  const [students, setStudents] = useState([]);

  const controller = new AbortController();
  const { auth } = useAuth();
  const fetchUser = async () => {
    try {
      const response = await axiosPrivate.get(`me/${auth?.user_id}/`);
      setUser(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUser();
    return () => {
      controller.abort();
    };
  }, []);

  const fetchUnit = async () => {
    try {
      const response = await axiosPrivate.get(urls.MYUNITS);
      setUnits(response.data);
    } catch (error) {
      toast.error("Cannot fetch your units at this time");
    }
  };

  useEffect(() => {
    fetchUnit();
    return () => {
      controller.abort();
    };
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axiosPrivate.get(urls.MYSTUDENTS);
      setStudents(response.data);
    } catch (error) {
      toast.error("Cannot retrieve students data at this time");
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
      <div className="main">
        <Sidenav />
        <main className="content">
          <nav className="page-nav">
            <h2>Your Dashboard</h2>
            <div className="lout">
              <LogoutButton />
            </div>
          </nav>

          <section className="home">
            <div className="row">
              <div className="column">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Your Info</h5>
                    <p className="card-text">
                      Name: <strong>{user.name}</strong>
                      <br></br>Email: <strong>{user.email}</strong>
                    </p>
                    <div className="user-edit">
                      <Link to={privateLinks.EditUser} className="nav-button">
                        Edit Info
                      </Link>
                      <button type="submit" className="delete-nav-button">
                        Delete Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Units</h5>
                    <p className="card-text">
                      Total Units: <strong>{units.count}</strong>
                      <br></br>
                      Units allocated by the admin
                    </p>
                    <Link to="/units" className="nav-button">
                      View Units
                    </Link>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Students</h5>
                    <p className="card-text">
                      Students taking your units:{" "}
                      <strong>{students.count}</strong>
                      <br></br>
                      Already registered to take the unit
                    </p>
                    <Link to="/students" className="nav-button">
                      View Students
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
