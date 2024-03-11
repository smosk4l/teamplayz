import axios from 'axios';
import useSWR from 'swr';
import { useEffect } from 'react';
import useAuthState from '../state/authState';
import { User } from '../types/types';

const fetcher = async (url: string): Promise<User> => {
  const response = await axios.get(url, { withCredentials: true });
  const data = response.data;
  return { ...data, id: data._id };
};

const useSession = () => {
  const { user, setUser } = useAuthState();
  const { data, error } = useSWR<User>(
    'http://localhost:8000/api/users/getAuth',
    fetcher
  );

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSession;
