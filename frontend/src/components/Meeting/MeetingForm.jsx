import Navbar from '../Navbar/Navbar';
import LoadingCircle from '../UI/LoadingCircle/LoadingCircle';
import axios from 'axios';
import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Formik, ErrorMessage } from 'formik';
import { emailRegex, messages } from '../../utils/constants';
import useAuthState from '../../state/authState';
import FormHeading from '../UI/Form/FormHeading';
import Checkbox from '../UI/Form/Checkbox';
import Button from '../UI/Button';
import Input from '../UI/Form/Input';
import Map from '../Map/Map';
import { Modal, Box } from '@mui/material';
import ErrorLabel from '../UI/Error/ErrorLabel';

function MeetingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);

    if (isNaN(Date.parse(values.date))) {
      toast.error(
        'Invalid date format for duration. Please use YYYY-MM-DD format.'
      );
      setIsLoading(false);
      return;
    }

    const [hours, minutes] = values.duration.split(':');
    const durationInMilliseconds =
      (Number(hours) * 60 + Number(minutes)) * 60 * 1000;

    const { confirmPassword, ...otherValues } = values;

    await axios
      .post('http://localhost:8000/api/meetings/createMeeting', {
        ...otherValues,
        duration: durationInMilliseconds,
      })
      .then((response) => {
        toast.success(messages.createMeetingError);
      })
      .catch(() => {
        toast.error(messages.createMeetingError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const initialValues = {
    title: '',
    description: '',
    time: '',
    date: '',
    tag: '',
    city: '',
    attendeesSlots: 0,
    isPrivate: false,
    owner: user.id,
    lat: 0,
    lng: 0,
    password: '',
    confirmPassword: '',
    duration: null,
  };

  const validationSchema = Yup.object().shape({
    isPrivate: Yup.boolean(),
    password: Yup.string().when('isPrivate', {
      is: true,
      then: (schema) =>
        schema
          .oneOf([Yup.ref('confirmPassword'), null], 'Passwords must match')
          .required(messages.fieldRequired),
      otherwise: (schema) => schema.optional(),
    }),
    confirmPassword: Yup.string().when('isPrivate', {
      is: true,
      then: (schema) =>
        schema
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required(messages.fieldRequired),
      otherwise: (schema) => schema.optional(),
    }),
    title: Yup.string()
      .required(messages.fieldRequired)
      .max(50, messages.max50),
    description: Yup.string()
      .required(messages.fieldRequired)
      .max(50, messages.max50),
    tag: Yup.string().required(messages.fieldRequired),
    attendeesSlots: Yup.number()
      .required(messages.fieldRequired)
      .min(2, 'Minimum 2 miejsca')
      .max(30, 'Maksymalnie 30 miejsc'),
    date: Yup.date()
      .min(new Date(), "Time can't be in the past")
      .required(messages.fieldRequired),
    city: Yup.string().required(messages.fieldRequired),
    lat: Yup.number()
      .test(
        'lat',
        'You have to select a meeting location',
        (value) => value !== 0
      )
      .required(messages.fieldRequired),
    lng: Yup.number()
      .test(
        'lng',
        'You have to select a meeting location',
        (value) => value !== 0
      )
      .required(messages.fieldRequired),
    duration: Yup.string().required(messages.fieldRequired),
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
            {console.log(errors)}
            {console.log(values)}

            <div className="w-full max-w-[500px]">
              <FormHeading>Create a new meeting</FormHeading>
              <div className="min w-full px-12">
                <Input
                  type="text"
                  text="Title"
                  id="title"
                  name="title"
                  handleChange={handleChange}
                  error={errors.title}
                />

                <Input
                  type="text"
                  text="Description"
                  id="description"
                  name="description"
                  handleChange={handleChange}
                  error={errors.description}
                />

                <Input
                  type="date"
                  text="Date"
                  id="date"
                  name="date"
                  handleChange={handleChange}
                  error={errors.date}
                />

                <Input
                  type="time"
                  text="Time"
                  id="time"
                  name="time"
                  handleChange={handleChange}
                  error={errors.time}
                />

                <Input
                  type="time"
                  text="Duration"
                  id="duration"
                  name="duration"
                  handleChange={handleChange}
                  error={errors.duration}
                />

                <Input
                  type="text"
                  text="City"
                  id="city"
                  name="city"
                  handleChange={handleChange}
                  error={errors.city}
                />
                <Button
                  type="button"
                  onClick={handleOpenModal}
                  text="Set location"
                  className="text-white rounded-lg bg-blue-500 mt-6 w-full py-2"
                />

                {(errors.lat || errors.lng) && (
                  <ErrorLabel styles="block my-2" error={errors.lng} />
                )}

                <Modal
                  open={isModalOpen}
                  onClose={handleCloseModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  {/* <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor
                      ligula.
                    </Typography>
                  </Box> */}
                  <Box
                    sx={{
                      width: '80%',
                      height: '80%',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      bgcolor: 'background.paper',
                      boxShadow: 24,
                      p: 6,
                    }}
                  >
                    <Map showSearch canSetMarker />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCloseModal}
                      text="Close"
                    />
                  </Box>
                </Modal>

                <Input
                  type="text"
                  text="Tag"
                  id="tag"
                  name="tag"
                  handleChange={handleChange}
                  error={errors.tag}
                />

                <Checkbox
                  text={'Private meeting'}
                  id={'isPrivate'}
                  isChecked={values.isPrivate}
                  handleChange={handleChange}
                />

                {values.isPrivate && (
                  <>
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
                  </>
                )}

                <Input
                  type="number"
                  text="Available slots"
                  id="attendeesSlots"
                  name="attendeesSlots"
                  handleChange={handleChange}
                  error={errors.attendeesSlots}
                />

                <Button type="submit" text="Create meeting" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default MeetingForm;
