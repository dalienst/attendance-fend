/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Sidenav from "../layouts/Sidenav";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { urls } from "../constants/links";
import { toast } from "react-toastify";

export default function Statistics() {
  const axiosPrivate = useAxiosPrivate();
  const [stats, setStats] = useState([]);

  const controller = new AbortController();
  const fetchStat = async () => {
    try {
      const response = await axiosPrivate.get(urls.STUDENTSTATS);
      setStats(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error("Cannot fetch statistics at this time");
    }
  };

  useEffect(() => {
    fetchStat();
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
            <h2>Attendance Statistics</h2>
          </nav>

          <section className="home">
            <div className="table-responsive">
              <table className="styled-table" cellSpacing="0">
                <caption>Statistics are ordered by date and units</caption>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Unit Code</th>
                    <th>Student</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((stat) => (
                    <tr key={stat.id}>
                      <td>{stat.created_at}</td>
                      <td>{stat.unit}</td>
                      <td>{stat.student}</td>
                      <td>{stat.present.toString()}</td>
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
