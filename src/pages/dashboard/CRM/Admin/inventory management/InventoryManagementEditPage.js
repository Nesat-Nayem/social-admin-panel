import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// _mock_
import InventoryManagementEditForm from 'sections/@dashboard/CRM/Admin/Sample/InventoryManagementEditForm';
import { useGetMasterById, useUpdateMasterSample } from 'services/Master.Services';

// components
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';
// sections

// ----------------------------------------------------------------------

export default function InventoryManagementEditPage() {
  const { themeStretch } = useSettingsContext();
  const { data } = useGetMasterById('sample');
  console.log(data);
  const { update, isSuccess, isError, errorMessages } = useUpdateMasterSample('sample');

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
              href: PATH_DASHBOARD.InventoryManagement.root,
            },
            { name: data?.name },
          ]}
        />

        <InventoryManagementEditForm
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
