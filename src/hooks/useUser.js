import { useSelector } from 'react-redux';

function useUser() {
  const userdetail = useSelector((state) => state.userdetail);

  const userprofile = userdetail.profile;
  return { userdetail, userprofile };
}

export default useUser;
