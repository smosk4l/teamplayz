import Navbar from '../Navbar/Navbar'
import LoadingCircle from '../UI/LoadingCircle/LoadingCircle'
import axios from 'axios'
import { useState } from 'react'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Form, Formik } from 'formik'
import { emailRegex, messages } from '../../utils/constants'
import useAuthState from '../../state/authState'
import FormHeading from '../UI/Form/FormHeading'
import Checkbox from '../UI/Form/Checkbox'
import Button from '../UI/Button'
import Input from '../UI/Form/Input'
function MeetingForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuthState()

  const handleSubmit = async (values) => {
    setIsLoading(true)

    await axios
      .post('http://localhost:8000/api/meetings/createMeeting', {
        ...values,
      })
      .then((response) => {
        toast.success(messages.createMeetingError)
      })
      .catch(() => {
        toast.error(messages.createMeetingError)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const initialValues = {
    title: '',
    description: '',
    time: '',
    tag: '',
    location: '',
    attendees: [user.id],
    attendeesSlots: 0,
    isPrivate: false,
    owner: user.id,
  }

  const validationSchema = Yup.object().shape({})

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
                  text="Location"
                  id="location"
                  name="location"
                  handleChange={handleChange}
                  error={errors.location}
                />

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
  )
}

export default MeetingForm
