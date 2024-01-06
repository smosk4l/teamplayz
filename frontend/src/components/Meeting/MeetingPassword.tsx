import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Input, FormHeading } from '../UI/Form/index';
import Button from '../UI/Button';
import { useParams } from 'react-router-dom';

const initialValues = {
  password: '',
};

const validationSchema = Yup.object({
  password: Yup.string().required('Password is required'),
});

const MeetingPassword = ({ setMeeting, setShowPassword }: any) => {
  const { id } = useParams<{ id: string }>();
  const handleSubmit = async (values: { password: string }) => {
    await axios
      .post(
        `http://localhost:8000/api/meetings/private/single/${id}`,
        {
          ...values,
        },
        { withCredentials: true }
      )
      .then(({ data }) => {
        setMeeting(data.meeting);
        setShowPassword(false);
      })
      .catch((error) => {
        console.log(error);
        // toast.error(messages.createMeetingError);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, handleChange }) => (
        <Form className="my-6 flex flex-col items-center">
          <div className="w-full max-w-[500px]">
            <FormHeading>
              This meeting is private. Please enter the password to continue.
            </FormHeading>
            <div className="min w-full px-12">
              <Input
                type="password"
                text="Password"
                id="password"
                name="password"
                handleChange={handleChange}
                error={errors.password}
              />

              <Button type="submit" text="Display meeting" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MeetingPassword;
