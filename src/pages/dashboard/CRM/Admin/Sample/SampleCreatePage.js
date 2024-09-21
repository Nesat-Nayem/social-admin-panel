import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import SampleNewEditForm from 'sections/@dashboard/CRM/Admin/Sample/SampleNewEditForm';
import { useCreateItem } from 'services/Master.Services';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';

// sections

// ----------------------------------------------------------------------

export default function SampleCreatePage() {
  const { themeStretch } = useSettingsContext();

  const { createItem, isSuccess, isError, errorMessages } = useCreateItem('sample-name');

  return (
    <>
      <Helmet>
        <title> Sample: Create a new sample | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new sample"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,
            // },
            {
              name: 'Sample List',
              href: PATH_DASHBOARD.samplemaster.list,
            },
            { name: 'New Sample' },
          ]}
        />
        <SampleNewEditForm
          saveItem={createItem}
          isSuccess={isSuccess}
          isError={isError}
          errorMessages={errorMessages}
        />
      </Container>
    </>
  );
}
