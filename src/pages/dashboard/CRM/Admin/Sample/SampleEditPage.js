import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// _mock_
import SampleNewEditForm from 'sections/@dashboard/CRM/Admin/Sample/SampleNewEditForm';
import { useGetMasterById, useUpdateMaster } from 'services/Master.Services';

// components
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';
// sections

// ----------------------------------------------------------------------

export default function SampleEditPage() {
  const { themeStretch } = useSettingsContext();
  const { data } = useGetMasterById('sample-name');
  const { update, isSuccess, isError, errorMessages } = useUpdateMaster('sample-name');

  return (
    <>
      <Helmet>
        <title> Sample: Edit sample | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Sample"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,s
            // },
            {
              name: 'Sample List',
              href: PATH_DASHBOARD.samplemaster.list,
            },
            { name: data?.name },
          ]}
        />

        <SampleNewEditForm
          isEdit
          currentUser={data}
          saveItem={update}
          isSuccess={isSuccess}
          isError={isError}
          errorMessages={errorMessages}
        />
      </Container>
    </>
  );
}
