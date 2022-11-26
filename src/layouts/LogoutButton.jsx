import React from 'react'
import { NavLink } from 'react-router-dom'
import { publicLinks } from "../constants/links";

export default function LogoutButton() {
  return (
    <div>
        <NavLink to={publicLinks.Login} className="nav-button">Logout</NavLink>
    </div>
  )
}
