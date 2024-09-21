import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// _mock_
import GiftNewEditForm from 'sections/@dashboard/CRM/Admin/Gift/GiftNewEditForm';
import { useGetMasterById, useUpdateMaster } from 'services/Master.Services';

// components
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';
// sections

// ----------------------------------------------------------------------

export default function GiftEditPage() {
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { data } = useGetMasterById('gift-name');
  const { update, isSuccess, isError, errorMessages } = useUpdateMaster('gift-name');

  const currentUser = data;

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Update success!');
      setTimeout(() => {
        navigate(PATH_DASHBOARD.giftmaster.list);
      }, 1000);
    }
    if (isError) {
      // enqueueSnackbar('Failed to perform the operation', { variant: 'error' });
      Object.keys(errorMessages).forEach((field) => {
        const messages = errorMessages[field].join(', ');
        enqueueSnackbar(`${messages}`, { variant: 'error' });
      });
    }
  }, [isSuccess, isError, enqueueSnackbar, navigate, errorMessages]);

  return (
    <>
      <Helmet>
        <title> Gift: Edit manager | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Gift"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,s
            // },
            {
              name: 'Gift List',
              href: PATH_DASHBOARD.giftmaster.list,
            },
            { name: currentUser?.name },
          ]}
        />

        <GiftNewEditForm isEdit currentUser={currentUser} saveItem={update} />
      </Container>
    </>
  );
}
