/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProfileSchema } from "../validation/validation";
import { publicLinks } from "../constants/links";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function EditProfile() {

    const navigate = useNavigate();
    const {auth} = useAuth();

    
  return <div>EditProfile</div>;
}
