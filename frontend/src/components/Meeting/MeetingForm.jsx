import Navbar from '../Navbar/Navbar';
import LoadingCircle from '../UI/LoadingCircle/LoadingCircle';
import axios from 'axios';
import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Formik } from 'formik';
import { emailRegex, messages } from '../../utils/constants';
import useAuthState from '../../state/authState';
import FormHeading from '../UI/Form/FormHeading';
import Checkbox from '../UI/Form/Checkbox';
import Button from '../UI/Button';
import Input from '../UI/Form/Input';
import Map from '../Map/Map';
import { Modal, Box } from '@mui/material';

function MeetingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);

    await axios
      .post('http://localhost:8000/api/meetings/createMeeting', {
        ...values,
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
    tag: '',
    city: '',
    attendees: [user.id],
    attendeesSlots: 0,
    isPrivate: false,
    owner: user.id,
    lat: 0,
    lng: 0,
  };

  const validationSchema = Yup.object().shape({
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
                  id="time"
                  name="time"
                  handleChange={handleChange}
                  error={errors.time}
                />

                <Input
                  type="text"
                  text="City"
                  id="city"
                  name="city"
                  handleChange={handleChange}
                  error={errors.location}
                />
                <Button
                  type="button"
                  onClick={handleOpenModal}
                  className="text-white rounded-lg bg-blue-500 mt-6 w-full py-2"
                >
                  Wybierz lokalizacje
                </Button>

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
                    <Map />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </Button>
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
