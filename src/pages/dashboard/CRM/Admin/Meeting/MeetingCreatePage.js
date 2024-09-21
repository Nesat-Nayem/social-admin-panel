import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import MeetingNewEditForm from 'sections/@dashboard/CRM/Admin/Meeting/MeetingNewEditForm';
import { useCreateItem } from 'services/Master.Services';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';

// sections

// ----------------------------------------------------------------------

export default function MeetingCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { createItem, isSuccess, isError, errorMessages } = useCreateItem('meeting-create');

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Meeting Create Successfully!');
      setTimeout(() => {
        navigate(PATH_DASHBOARD.meetingmaster.list);
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
        <title> Meeting: Create a new meeting | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new Meeting"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,
            // },
            {
              name: 'Meeting List',
              href: PATH_DASHBOARD.meetingmaster.list,
            },
            { name: 'New Meeting' },
          ]}
        />
        <MeetingNewEditForm saveItem={createItem} />
      </Container>
    </>
  );
}
