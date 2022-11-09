/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../redux/api/userApi';

function sameRole() {
  const role = window.location.pathname.split('/');

  const navigate = useNavigate();

  const { data: user } = useGetProfileQuery({});
  console.log(user.role[0]);
  //   if (role[1] !== user.role[0]) {
  //     navigate(`/${user.role[0]}/home`);
  //   }
}

export default sameRole;
