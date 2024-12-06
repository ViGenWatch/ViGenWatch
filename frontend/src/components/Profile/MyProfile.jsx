import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useToast } from '../Toast/ToastContext';
import { Actions } from '../../redux/reducer/authReducer';
import { changePassword } from '../../service/auth';
// import CountrySelector from './CountrySelector';

export default function MyProfile() {
  const authState = useSelector((state) => state.auth);
  const userInfor = authState.user;
  const [formData, setFormData] = useState({
    firstName: userInfor.firstName || '',
    lastName: userInfor.lastName || ''
  });
  const [formPassword, setFormPassword] = useState({
    prePassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  });
  const dispatch = useDispatch();

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeFormPassword = (e) => {
    const { name, value } = e.target;
    setFormPassword((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveInfor = async (e) => {
    e.preventDefault();
    if (!formData.firstName && !formData.lastName) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
    } else {
      dispatch(Actions.updateInforRequest(formData));
      if (authState.error) {
        toast.error('Chỉnh sửa thông tin không thành công');
      } else {
        toast.success('Bạn đã chỉnh sửa thông tin thành công');
      }
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    if (formPassword.prePassword && formPassword.newPassword && formPassword.newPasswordConfirm) {
      const response = await changePassword(formPassword);
      if (response.status === 200) {
        toast.success('Bạn đã thay đổi mật khẩu thành công');
        setFormPassword({
          prePassword: '',
          newPassword: '',
          newPasswordConfirm: ''
        });
      } else {
        toast.error('Thay đổi mật khẩu không thành công');
      }
    } else {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
    }
  };
  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          marginTop: '40px',
          maxWidth: '800px',
          marginLeft: '15vw',
          py: { xs: 2, md: 3 }
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level='title-md'>Thông tin cá nhân</Typography>
            <Typography level='body-sm'>Tùy chỉnh thông tin cá nhân của bạn</Typography>
          </Box>
          <Divider />
          <Stack direction='row' spacing={3} sx={{ display: { xs: 'flex', md: 'flex' }, my: 1 }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                  <Input
                    size='sm'
                    placeholder='First name'
                    sx={{ flexGrow: 1 }}
                    value={formData.firstName}
                    name='firstName'
                    onChange={handleChange}
                  />
                  <Input
                    size='sm'
                    placeholder='Last name'
                    sx={{ flexGrow: 1 }}
                    value={formData.lastName}
                    name='lastName'
                    onChange={handleChange}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={1}>
                <FormLabel>Username</FormLabel>
                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                  <Input size='sm' placeholder='Account' readOnly value={userInfor.userName} />
                </FormControl>
              </Stack>
              <Stack direction='row' spacing={2}>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    size='sm'
                    defaultValue='Researcher'
                    readOnly
                    value={userInfor.role === '0x01' ? 'Researcher' : 'Authority'}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size='sm'
                    type='email'
                    startDecorator={<EmailRoundedIcon />}
                    placeholder='email'
                    sx={{ flexGrow: 1 }}
                    readOnly
                    value={userInfor.email}
                  />
                </FormControl>
              </Stack>
              {/* <div>
                <CountrySelector />
              </div> */}
            </Stack>
          </Stack>

          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size='sm' variant='solid' onClick={(e) => handleSaveInfor(e)}>
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>

        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level='title-md'>Thay đổi mật khẩu</Typography>
            <Typography level='body-sm'>Bạn cần nhập đầy đủ mật khẩu cũ và mới để chúng tôi xác nhận</Typography>
          </Box>
          <Divider />
          <Stack direction='row' spacing={3} sx={{ display: { xs: 'flex', md: 'flex' }, my: 1 }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Mật khẩu cũ</FormLabel>
                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                  <Input
                    type='password'
                    size='sm'
                    placeholder='Mật khẩu cũ'
                    name='prePassword'
                    value={formPassword.prePassword}
                    onChange={handleChangeFormPassword}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={1}>
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                  <Input
                    type='password'
                    size='sm'
                    placeholder='Mật khẩu mới'
                    name='newPassword'
                    value={formPassword.newPassword}
                    onChange={handleChangeFormPassword}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={1}>
                <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                  <Input
                    type='password'
                    size='sm'
                    placeholder='Xác nhận mật khẩu mới'
                    name='newPasswordConfirm'
                    value={formPassword.newPasswordConfirm}
                    onChange={handleChangeFormPassword}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size='sm' variant='solid' onClick={(e) => handlePassword(e)}>
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
