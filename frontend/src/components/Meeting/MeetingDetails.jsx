import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuthState from '../../state/authState';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { TbArrowBackUp } from 'react-icons/tb';
import { MdOutlineIosShare } from 'react-icons/md';
import PopupModal from '../Modal/PopupModal';
import MeetingInfo from './MeetingInfo';
import ShareButton from '../UI/Button/ShareButton';
import ReturnButton from '../UI/Button/ReturnButton';
import MeetingPassword from './MeetingPassword';

function MeetingDetails() {
  const { user } = useAuthState();
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios
        .get('http://localhost:8000/api/meetings/' + id, {
          withCredentials: true,
        })
        .then((response) => {
          if (!response.data) return;
          setMeeting(response.data.meeting);
        })
        .catch((error) => {
          const errorCode = error.request.status;
          if (errorCode === 401) {
            setShowPassword(true);
          }
        });
    };

    fetchData();
  }, []);

  const addUserToMeeting = async () => {
    if (!user) navigate('/login');

    const res = await axios.post(
      `http://localhost:8000/api/meetings/${id}/addUser`,
      {
        userId: user.id,
      }
    );

    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Navbar />
      {meeting && (
        <div className="w-full">
          <main className="mx-auto mt-12 flex max-w-[600px] flex-col gap-2 rounded-lg px-8 py-8 font-poppins shadow-md">
            <MeetingInfo meeting={meeting} />

            <div className="flex flex-col gap-4">
              <button
                onClick={addUserToMeeting}
                className={'w-full bg-green-600 py-2  text-white'}
              >
                Join to meeting
              </button>
              <div className="flex w-full gap-2">
                <ReturnButton navigate={() => navigate('/meetings')} />
                <ShareButton />
              </div>
            </div>
          </main>
        </div>
      )}

      {showPassword && (
        <MeetingPassword
          setShowPassword={setShowPassword}
          setMeeting={setMeeting}
        />
      )}
      {showModal && (
        <PopupModal
          message="Congratulations, you have joined the meeting!"
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default MeetingDetails;
