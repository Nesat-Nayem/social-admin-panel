import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// _mock_
import { useSnackbar } from 'notistack';
import MeetingNewEditForm from 'sections/@dashboard/CRM/Admin/Meeting/MeetingNewEditForm';
import { useGetMasterById, useUpdateItem } from 'services/Master.Services';

// components
import { useEffect } from 'react';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';
// sections

// ----------------------------------------------------------------------

export default function MeetingEditPage() {
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { data } = useGetMasterById('meeting-create');
  const { update, isSuccess, isError, errorMessages } = useUpdateItem('meeting-create');
  const currentUser = data;

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar('Update success!');
      setTimeout(() => {
        navigate(PATH_DASHBOARD.meetingmaster.list);
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
        <title> Meeting: Edit Incentive | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Meeting"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,s
            // },
            {
              name: 'Meeting List',
              href: PATH_DASHBOARD.meetingmaster.list,
            },
            { name: currentUser?.name },
          ]}
        />

        <MeetingNewEditForm isEdit currentUser={currentUser} saveItem={update} />
      </Container>
    </>
  );
}
