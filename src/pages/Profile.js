/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { privateLinks } from "../constants/links";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Sidenav from "../layouts/Sidenav";

export default function Profile() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState([]);

  const controller = new AbortController();
  const { auth } = useAuth();
  const fetchProfile = async () => {
    try {
      const response = await axiosPrivate.get(`profile/${auth?.user_id}/`);
      setProfile(response.data);
      console.log(response.data);
    } catch (error) {
      //   toast.error(
      //     "Profile cannot be fetched at this time\n",
      //     "You need to log in again"
      //   );
    }
  };

  useEffect(() => {
    fetchProfile();
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
            <h2>Profile</h2>
          </nav>

          <section className="home">
            <div className="greeting">
              <h3 className="greeting-title">Hello {profile.name}</h3>
              <span className="greeting-span">
                <p className="greeting-passage">
                  This is your profile page. You can see your personal details.
                  <br></br>To edit just click the button below
                </p>
              </span>
            </div>

            <div className="profile-edit-button">
              <Link to={privateLinks.EditProfile} className="nav-button">
                Edit Profile
              </Link>

            <button type="submit" className="delete-nav-button" >
              Delete Profile
            </button>

            </div>


            <div className="profile-row">
              <div className="profile-card">
                <h6 className="profile-card-header">User Information</h6>
                <div className="profile-card-body">
                  <form className="profile-card-form">
                    <div className="form-row">
                      <div className="profile-column">
                        <label className="form-row-label">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          className="form-row-input"
                          value={profile.name}
                          readOnly
                        />
                      </div>

                      <div className="profile-column">
                        <label className="form-row-label">Contact</label>
                        <input
                          type="text"
                          id="name"
                          className="form-row-input"
                          value={profile.contact}
                          readOnly
                        />
                      </div>

                      <div className="profile-column">
                        <label className="form-row-label">Location</label>
                        <input
                          type="text"
                          id="name"
                          className="form-row-input"
                          value={profile.location}
                          readOnly
                        />
                      </div>

                      <div className="profile-column">
                        <label className="form-row-label">
                          A little about yourself...
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-row-input"
                          value={profile.bio}
                          readOnly
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
