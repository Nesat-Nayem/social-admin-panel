import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// _mock_
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import DoctorNewEditForm from 'sections/@dashboard/CRM/Admin/Doctor/DoctorNewEditForm';
import { useGetMasterById, useUpdateMaster } from 'services/Master.Services';

// components
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';
// sections

// ----------------------------------------------------------------------

export default function DoctorEditPage() {
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { data } = useGetMasterById('doctor');
  const { update, isSuccess, isError, errorMessages } = useUpdateMaster('doctor');

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Update success!');
      navigate(PATH_DASHBOARD.doctormaster.list);
    }
    if (isError) {
      // enqueueSnackbar('Failed to perform the operation', { variant: 'error' });
      Object.keys(errorMessages).forEach((field) => {
        const messages = errorMessages[field].join(', ');
        enqueueSnackbar(`${messages}`, { variant: 'error' });
      });
    }
  }, [isSuccess, isError, enqueueSnackbar, navigate, errorMessages]);

  const currentUser = data;

  return (
    <>
      <Helmet>
        <title> Doctor: Edit Doctor | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Doctor"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,s
            // },
            {
              name: 'Doctor',
              href: PATH_DASHBOARD.doctormaster.list,
            },
            { name: currentUser?.name },
          ]}
        />

        <DoctorNewEditForm isEdit currentUser={currentUser} save={update} />
      </Container>
    </>
  );
}
