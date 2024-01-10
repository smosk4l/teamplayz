import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { messages } from '../../utils/constants';
import * as Yup from 'yup';
import Navbar from '../Navbar/Navbar';
import { Form, Formik } from 'formik';
import { FormHeading, Input } from '../UI/Form';
import Button from '../UI/Button';
import { Navigate, useParams, useNavigate } from 'react-router-dom';

const ResetPasswordByCode = () => {
  const { id } = useParams<{ id: string }>();
  const [isValid, setIsValid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkResetPassword = async () => {
      await axios
        .post(
          `http://localhost:8000/api/users/password/check-reset-password/`,
          { resetCode: id },
          { withCredentials: true }
        )
        .then(({ data }) => setIsValid(data.exists))
        .catch((err) => console.log(err));
    };

    checkResetPassword();
  }, []);

  if (isValid === false) {
    return <Navigate to="/404" replace />;
  }

  const handleSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    const { confirmPassword, ...otherValues } = values;
    console.log(otherValues);
    await axios
      .post(
        `http://localhost:8000/api/users/password/reset-password`,
        {
          ...otherValues,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success(messages.resetPasswordSuccess);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        toast.error(messages.resetPasswordError);
      });
  };

  const initialValues = {
    password: '',
    confirmPassword: '',
    resetCode: id,
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .oneOf([Yup.ref('confirmPassword')], 'Passwords must match')
      .required(messages.fieldRequired),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required(messages.fieldRequired),
  });

  return (
    <>
      <Navbar />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, handleChange }) => (
          <Form className="my-6 flex flex-col items-center">
            <div className="w-full max-w-[500px]">
              <FormHeading title="If you want to return password enter a valid e-mail." />
              <div className="min w-full px-12">
                <Input
                  type="password"
                  text="Password"
                  id="password"
                  name="password"
                  handleChange={handleChange}
                  error={errors.password}
                />
                <Input
                  type="password"
                  text="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  handleChange={handleChange}
                  error={errors.confirmPassword}
                />

                <Button type="submit" text="Change password" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordByCode;
