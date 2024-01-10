import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FormHeading, Input } from '../UI/Form';
import Button from '../UI/Button';
import { toast } from 'react-toastify';
import { messages } from '../../utils/constants';
import Navbar from '../Navbar/Navbar';

const ForgotPassword = () => {
  const handleSubmit = async (values: { email: string }) => {
    await axios
      .post(
        `http://localhost:8000/api/users/password/forget-password`,
        {
          ...values,
        },
        { withCredentials: true }
      )
      .then(() => {
        toast.success(messages.resetPasswordEmail);
      })
      .catch((error) => {
        console.log(error);
        toast.error(messages.resetPasswordEmailError);
      });
  };

  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required('Password is required'),
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
                  type="email"
                  text="Email"
                  id="email"
                  name="email"
                  handleChange={handleChange}
                  error={errors.email}
                />

                <Button type="submit" text="Send email" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPassword;
