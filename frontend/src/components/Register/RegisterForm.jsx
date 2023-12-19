import axios from 'axios'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'

import Navbar from '../Navbar/Navbar'
import Button from '../UI/Button'
import Checkbox from '../UI/Form/Checkbox'
import FormHeading from '../UI/Form/FormHeading'
import FormSubHeading from '../UI/Form/FormSubHeading'
import Input from '../UI/Form/Input'
import LoadingCircle from '../UI/LoadingCircle/LoadingCircle'
import { emailRegex, messages } from '../../utils/constants'
import { validationSchema } from './validation'
function RegistrationForm() {
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    await axios
      .post('http://localhost:8000/api/users/', {
        ...values,
      })
      .then(() => {
        toast.success('Konto zostało utworzone')
        navigate('/login')
      })
      .catch(({ response }) => {
        if (response.status === 409) toast.error('User already exists')
        else toast.error('Something went wrong')
      })
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isTermsAccepted: false,
  }

  return (
    <>
      <Navbar />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnMount={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
          <>
            {isSubmitting && <LoadingCircle />}

            <Form
              onSubmit={handleSubmit}
              method="POST"
              className="my-6 flex flex-col items-center"
            >
              <div className="w-full max-w-[500px]">
                <FormHeading title={'Create an Account'} />
                <FormSubHeading
                  title={'Sign up now to get started with an account.'}
                />

                <div className="w-full px-12">
                  <Input
                    type="text"
                    text="First name"
                    id="firstName"
                    name="firstName"
                    handleChange={handleChange}
                    error={errors.firstName}
                    required
                  />
                  <Input
                    type="text"
                    text="Last name"
                    id="lastName"
                    name="lastName"
                    handleChange={handleChange}
                    error={errors.lastName}
                    required
                  />
                  <Input
                    type="email"
                    text="Email Address"
                    id="email"
                    name="email"
                    handleChange={handleChange}
                    error={errors.email}
                    required
                  />
                  <Input
                    type="password"
                    text="Password"
                    id="password"
                    name="password"
                    handleChange={handleChange}
                    error={errors.password}
                    required
                  />
                  <Input
                    type="password"
                    text="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    handleChange={handleChange}
                    error={errors.confirmPassword}
                    required
                  />
                  <Checkbox
                    id={'isTermsAccepted'}
                    isChecked={values.isTermsAccepted}
                    handleChange={handleChange}
                    text={'I have read and agree to the'}
                    spanText={'Terms of Service'}
                  />
                  <Button type={'submit'} text={'Get Started'} />
                  <p className="mt-4 text-center">
                    Have an account?
                    <Link to={'/login'} className="text-blue-500 underline">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

export default RegistrationForm
