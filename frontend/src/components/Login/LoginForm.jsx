import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useState } from 'react';
import useAuthStore from '../../state/authState';
import LoadingCircle from '../UI/LoadingCircle/LoadingCircle';
import PopupModal from '../Modal/PopupModal';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Formik } from 'formik';
import { emailRegex, messages } from '../../utils/constants';
import Input from '../UI/Form/Input';
import FormHeading from '../UI/Form/FormHeading';
import Button from '../UI/Button';

function Login() {
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);

    await axios
      .post(
        'http://localhost:8000/api/users/login',
        { ...values },
        { withCredentials: true }
      )
      .then(({ data }) => {
        setUser(data);
        toast.success('Logowanie powiodło się');
        setShowModal(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Logowanie nie powiodło się.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCloseModal = () => setShowModal(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(messages.fieldRequired),
    email: Yup.string()
      .email(messages.invalidEmail)
      .matches(emailRegex, messages.invalidEmail)
      .required(messages.fieldRequired),
  });

  return (
    <>
      <Navbar />
      {isLoading && <LoadingCircle />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnMount={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form
            onSubmit={handleSubmit}
            className="my-6 flex flex-col items-center"
          >
            <div className="w-full max-w-[500px]">
              <FormHeading>Log in to your account</FormHeading>
              <div className="my-2 w-full px-12">
                <Input
                  type="email"
                  text="E-mail"
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

                <label className="text-xs ">
                  I have forgotten my password{' '}
                  <span className="text-blue-500 underline">Reset</span>
                </label>

                <Button type={'submit'} text={'Login'} />

                <p className="mt-4 text-center">
                  Don't have an account?{' '}
                  <Link to={'/signin'} className="text-blue-500 underline">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {showModal && (
        <PopupModal
          message="Congratulations, you have created an account!"
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default Login;
