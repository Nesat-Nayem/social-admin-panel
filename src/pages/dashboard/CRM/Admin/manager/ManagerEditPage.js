import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// _mock_
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useGetMasterById, useUpdateMaster } from 'services/Master.Services';

// components
import ManagerNewEditForm from 'sections/@dashboard/CRM/Admin/manager/ManagerNewEditForm';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';

// sections

// ----------------------------------------------------------------------

export default function ManagerEditPage() {
  const { themeStretch } = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { data } = useGetMasterById('manager');
  const { update, isSuccess, isError, errorMessages } = useUpdateMaster('manager');

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Update success!');
    }
    if (isError) {
      enqueueSnackbar('Failed to perform the operation', { variant: 'error' });
    }
  }, [isSuccess, isError, enqueueSnackbar, navigate]);

  const currentUser = data;

  return (
    <>
      <Helmet>
        <title> Manager: Edit manager | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Manager"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,s
            // },
            {
              name: 'Manager',
              href: PATH_DASHBOARD.managermaster.list,
            },
            { name: currentUser?.name },
          ]}
        />

        <ManagerNewEditForm isEdit currentUser={currentUser} save={update} />
      </Container>
    </>
  );
}
