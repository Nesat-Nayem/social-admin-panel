import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// _mock_
import InventoryNewEditForm from 'sections/@dashboard/CRM/Admin/Inventory/InventoryNewEditForm';
import { useGetMasterById, useUpdateMaster } from 'services/Master.Services';

// components
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';
// sections

// ----------------------------------------------------------------------

export default function InventoryEditPage() {
  const { themeStretch } = useSettingsContext();

  const { data } = useGetMasterById('medicin-name');
  const { update, isSuccess, isError, errorMessages } = useUpdateMaster('medicin-name');

  return (
    <>
      <Helmet>
        <title> Medicine: Edit medicine | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Medicine"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,s
            // },
            {
              name: 'Medicine List',
              href: PATH_DASHBOARD.inventorymaster.list,
            },
            { name: data?.name },
          ]}
        />

        <InventoryNewEditForm
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
