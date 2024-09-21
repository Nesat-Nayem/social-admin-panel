import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import GiftNewEditForm from 'sections/@dashboard/CRM/Admin/Gift/GiftNewEditForm';
import { useCreateItem } from 'services/Master.Services';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';

// sections

// ----------------------------------------------------------------------

export default function GiftCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { createItem, isSuccess, isError, errorMessages } = useCreateItem('gift-name');

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Gift Create Successfully!');
      setTimeout(() => {
        navigate(PATH_DASHBOARD.giftmaster.list);
      }, 1000);
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
        <title> Gift: Create a new gift | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new gift"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,
            // },
            {
              name: 'Gift List',
              href: PATH_DASHBOARD.giftmaster.list,
            },
            { name: 'New Gift' },
          ]}
        />
        <GiftNewEditForm saveItem={createItem} />
      </Container>
    </>
  );
}
