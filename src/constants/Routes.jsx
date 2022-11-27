import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicLinks, privateLinks } from "./links";
import RequireAuth from "../components/RequireAuth";
import PersistLogin from "../components/PersistLogin";

const Login = React.lazy(() => import("../pages/Login"));
const Registration = React.lazy(() => import("../pages/Registration"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Units = React.lazy(() => import("../pages/Units"));
const Students = React.lazy(() => import("../pages/Students"));
const Statistics = React.lazy(() => import("../pages/Statistics"));
// const Profile = React.lazy(() => import("../pages/Profile"));
// const UpdateProfile = React.lazy(() => import("../pages/UpdateProfile"));

function BaseRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path={publicLinks.Login} element={<Login />} />
          <Route path={publicLinks.Registration} element={<Registration />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route path={privateLinks.Dashboard} element={<Dashboard />} />
                <Route path={privateLinks.Units} element={<Units />} />
                <Route path={privateLinks.Students} element={<Students/>} />
                <Route path={privateLinks.Statistics} element={<Statistics />} />
              </Route>
            </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default BaseRouter;
