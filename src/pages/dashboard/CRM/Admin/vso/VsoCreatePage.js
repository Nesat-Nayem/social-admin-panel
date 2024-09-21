import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import VsoNewEditForm from 'sections/@dashboard/CRM/Admin/vso/VsoNewEditForm';
import { useCreateMaster } from 'services/Master.Services';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';

// sections

// ----------------------------------------------------------------------

export default function VsoCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { create, isSuccess, isError, errorMessages } = useCreateMaster('vso');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Vso Create Successfully!');
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
        <title> VSO: Create a new Vso | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new vso"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,
            // },
            {
              name: 'Vso',
              href: PATH_DASHBOARD.vsomaster.list,
            },
            { name: 'New VSO' },
          ]}
        />
        <VsoNewEditForm save={create} />
      </Container>
    </>
  );
}
