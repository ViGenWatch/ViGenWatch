import LayoutComponent from '../../../components/Layout';
import MyProfile from '../../../components/Profile/MyProfile';

const ProfilePage = () => {
  return (
    <LayoutComponent index={5}>
      <MyProfile />
    </LayoutComponent>
  );
};

export default ProfilePage;
