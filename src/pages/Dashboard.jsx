/* eslint-disable no-unused-vars */
import React from "react";
import Sidenav from "../layouts/Sidenav";
import LogoutButton from "../layouts/LogoutButton";

export default function Dashboard() {
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
        </main>
      </div>
    </>
  );
}
