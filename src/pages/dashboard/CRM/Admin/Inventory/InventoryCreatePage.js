import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import InventoryNewEditForm from 'sections/@dashboard/CRM/Admin/Inventory/InventoryNewEditForm';
import { useCreateItem } from 'services/Master.Services';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';

// sections

// ----------------------------------------------------------------------

export default function InventoryCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { createItem, isSuccess, isError, errorMessages } = useCreateItem('medicin-name');

  return (
    <>
      <Helmet>
        <title> Medicine: Create a new medicine |Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new inventory"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,
            // },
            {
              name: 'Medicine List',
              href: PATH_DASHBOARD.inventorymaster.list,
            },
            { name: 'New Medicine' },
          ]}
        />
        <InventoryNewEditForm
          saveItem={createItem}
          isSuccess={isSuccess}
          isError={isError}
          errorMessages={errorMessages}
        />
      </Container>
    </>
  );
}
