import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '../store';
import { selectCurrentUser } from '../slice/authSlice';
import { useState } from 'react';
// import NavBar from '../../components/navbar/NavBar';
// import Sidebar from '../../components/sidebar/Sidebar';

function RequireAuth() {
  const token = getCookie('access_token');

  const user = JSON.parse(localStorage.getItem('userInfo')!);
  const location = useLocation();
  const navigate = useNavigate();
  let userValidator = true;

  const userRole = user?.role[0];
  userValidator = location.pathname.includes(userRole);

  console.log(userValidator);

  const content = token ? (
    userValidator ? (
      <>
        <Outlet />
      </>
    ) : (
      <>
        {navigate(`/${userRole}/home`)} <Outlet />
      </>
    )
  ) : (
    <>
      <Navigate to="/" state={{ from: location }} replace />;
      <Outlet />
    </>
  );

  return content;
}
export default RequireAuth;
