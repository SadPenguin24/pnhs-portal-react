import { useGetProfileQuery } from '../redux/api/userApi';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProfileQuery({});

  const navigate = useNavigate();

  const logoutHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('logout clicked');
    //navigate('/login');
  };

  let content = <></>;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    console.log('THIS IS PROFILE: ', user);
    content = (
      <section className="users">
        <h1>User</h1>
        <p>{user.username}</p>
        <button onClick={() => logoutHandler}>Logout</button>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};
export default ProfileScreen;
