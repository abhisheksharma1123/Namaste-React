import React from "react";
import { useFormik } from "formik";

import { IFormValues, validationSchema } from "../../utils";
import { Input } from "../../../components";
import { appLogin } from "../../../slices/loginSlice";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { Navigate } from "react-router-dom";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  profile: "",
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);

  const handleSubmit = (values: IFormValues) => {
    alert(JSON.stringify(values, null, 2));
    dispatch(appLogin(values));
  };

  const formik = useFormik({
    initialValues,
    // A function handling validation of the form
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  if (isLoggedIn) {
    return <Navigate to="/" replace></Navigate>;
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* First Name Input*/}
      <Input
        type="text"
        {...formik.getFieldProps("firstName")}
        value={formik.values.firstName}
        labelText="First Name"
        errorCondition={
          (formik.touched.firstName && formik.errors.firstName) as string
        }
      />
      {/* Last Name Input */}
      <Input
        type="text"
        {...formik.getFieldProps("lastName")}
        value={formik.values.lastName}
        labelText="Last Name"
        errorCondition={
          (formik.touched.lastName && formik.errors.lastName) as string
        }
      />
      {/* email input */}
      <Input
        type="email"
        {...formik.getFieldProps("email")}
        value={formik.values.email}
        labelText="Email Address"
        errorCondition={(formik.touched.email && formik.errors.email) as string}
      />
      <Input
        type="file"
        name="image"
        onChange={formik.handleChange}
        value={formik.values.profile}
        labelText="Profile Picture"
        // errorCondition={formik.errors.email as string}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
