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
import { useTranslation } from 'react-i18next';
// import CountrySelector from './CountrySelector';

export default function MyProfile() {
  const authState = useSelector((state) => state.auth);
  const userInfor = authState.user;
  const { t } = useTranslation();
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
      toast.error(t('profile:fill_required_information'));
    } else {
      dispatch(Actions.updateInforRequest(formData));
      if (authState.error) {
        toast.error(t('profile:information_change_failed'));
      } else {
        toast.success(t('profile:information_update_success'));
      }
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    if (formPassword.prePassword && formPassword.newPassword && formPassword.newPasswordConfirm) {
      const response = await changePassword(formPassword);
      if (response.status === 200) {
        toast.success(t('profile:password_change_success'));
        setFormPassword({
          prePassword: '',
          newPassword: '',
          newPasswordConfirm: ''
        });
      } else {
        toast.error(t('profile:password_change_failed'));
      }
    } else {
      toast.error(t('profile:fill_required_information'));
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
            <Typography level='title-md'>{t('profile:personal_information')}</Typography>
            <Typography level='body-sm'>{t('profile:customize_personal_information')}</Typography>
          </Box>
          <Divider />
          <Stack direction='row' spacing={3} sx={{ display: { xs: 'flex', md: 'flex' }, my: 1 }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>{t('profile:fullname')}</FormLabel>
                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                  <Input
                    size='sm'
                    placeholder={t('profile:first_name')}
                    sx={{ flexGrow: 1 }}
                    value={formData.firstName}
                    name='firstName'
                    onChange={handleChange}
                  />
                  <Input
                    size='sm'
                    placeholder={t('profile:last_name')}
                    sx={{ flexGrow: 1 }}
                    value={formData.lastName}
                    name='lastName'
                    onChange={handleChange}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={1}>
                <FormLabel>{t('profile:username')}</FormLabel>
                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                  <Input size='sm' placeholder='Account' readOnly value={userInfor.userName} />
                </FormControl>
              </Stack>
              <Stack direction='row' spacing={2}>
                <FormControl>
                  <FormLabel>{t('profile:role')}</FormLabel>
                  <Input
                    size='sm'
                    readOnly
                    value={userInfor.role === '0x01' ? t('profile:research') : t('profile:authority')}
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
                {t('profile:save')}
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>

        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level='title-md'>{t('profile:change_password')}</Typography>
            <Typography level='body-sm'>{t('profile:password_change_instructions')}</Typography>
          </Box>
          <Divider />
          <Stack direction='row' spacing={3} sx={{ display: { xs: 'flex', md: 'flex' }, my: 1 }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>{t('profile:old_password')}</FormLabel>
                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                  <Input
                    type='password'
                    size='sm'
                    placeholder={t('profile:old_password')}
                    name='prePassword'
                    value={formPassword.prePassword}
                    onChange={handleChangeFormPassword}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={1}>
                <FormLabel>{t('profile:new_password')}</FormLabel>
                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                  <Input
                    type='password'
                    size='sm'
                    placeholder={t('profile:new_password')}
                    name='newPassword'
                    value={formPassword.newPassword}
                    onChange={handleChangeFormPassword}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={1}>
                <FormLabel>{t('profile:confirm_new_password')}</FormLabel>
                <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                  <Input
                    type='password'
                    size='sm'
                    placeholder={t('profile:confirm_new_password')}
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
                {t('profile:save')}
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
