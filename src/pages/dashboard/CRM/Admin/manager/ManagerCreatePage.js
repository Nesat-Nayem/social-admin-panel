import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import ManagerNewEditForm from 'sections/@dashboard/CRM/Admin/manager/ManagerNewEditForm';
import { useCreateMaster } from 'services/Master.Services';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';

// sections

// ----------------------------------------------------------------------

export default function ManagerCreatePage() {
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { create, isSuccess, isError, errorMessages } = useCreateMaster('manager');

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Manager Create Successfully!');
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
        <title> Manager: Create a new manager | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new manager"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,
            // },
            {
              name: 'Manager',
              href: PATH_DASHBOARD.managermaster.list,
            },
            { name: 'New manager' },
          ]}
        />
        <ManagerNewEditForm save={create} />
      </Container>
    </>
  );
}
