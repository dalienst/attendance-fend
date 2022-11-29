/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Sidenav from "../layouts/Sidenav";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { urls } from "../constants/links";
import { toast } from "react-toastify";

export default function Units() {
  const axiosPrivate = useAxiosPrivate();
  const [units, setUnits] = useState([]);

  const controller = new AbortController();
  const fetchUnit = async () => {
    try {
      const response = await axiosPrivate.get(urls.MYUNITS);
      setUnits(response.data.results);
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


  return (
    <>
      <div className="main">
        <Sidenav />
        <main className="content">
          <nav className="page-nav">
            <h2>My Units</h2>
          </nav>

          <section className="home">
            <div className="table-responsive">
              <table className="styled-table" cellSpacing="0">
                <thead>
                  <tr>
                    <th>Unit Code</th>
                    <th>Unit Name</th>
                  </tr>
                </thead>
                <tbody>
                  {units.map((unit) => (
                    <tr key={unit.id}>
                      <td>{unit.code}</td>
                      <td>{unit.name}</td>
                    </tr>
                  ))}
                </tbody>
                <caption>Units created by admin</caption>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
