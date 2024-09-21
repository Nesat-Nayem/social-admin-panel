import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import DoctorNewEditForm from 'sections/@dashboard/CRM/Admin/Doctor/DoctorNewEditForm';
import { useCreateMaster } from 'services/Master.Services';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';

// sections

// ----------------------------------------------------------------------

export default function DoctorCreatePage() {
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const { create, isSuccess, isError, errorMessages } = useCreateMaster('doctor');

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Doctor Create Successfully!');
    }
    if (isError) {
      // enqueueSnackbar('Failed to perform the operation', { variant: 'error' });
      Object.keys(errorMessages).forEach((field) => {
        const messages = errorMessages[field].join(', ');
        // enqueueSnackbar(`${field}: ${messages}`, { variant: 'error' });
        enqueueSnackbar(`${messages}`, { variant: 'error' });
      });
    }
  }, [isSuccess, isError, enqueueSnackbar, navigate, errorMessages]);

  return (
    <>
      <Helmet>
        <title> Doctor: Create a new doctor | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create New Client"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,
            // },
            {
              name: 'Client',
              href: PATH_DASHBOARD.doctormaster.list,
            },
            { name: 'New Client' },
          ]}
        />
        <DoctorNewEditForm save={create} />
      </Container>
    </>
  );
}
