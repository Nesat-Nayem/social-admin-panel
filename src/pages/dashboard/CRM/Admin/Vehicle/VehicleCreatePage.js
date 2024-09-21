import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// components
import VehicleNewEditForm from 'sections/@dashboard/CRM/Admin/Vehicle/VehicleNewEditForm';
import { useCreateItem } from 'services/Master.Services';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';

// sections

// ----------------------------------------------------------------------

export default function VehicleCreatePage() {
  const { themeStretch } = useSettingsContext();
  const { createItem, isSuccess, isError, errorMessages } = useCreateItem('car-allowance');

  return (
    <>
      <Helmet>
        <title> Vehicle: Create a new vehicle | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new vehicle"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,
            // },
            {
              name: 'Vehicle List',
              href: PATH_DASHBOARD.vehiclemaster.list,
            },
            { name: 'New Vehicle' },
          ]}
        />
        <VehicleNewEditForm
          saveItem={createItem}
          isSuccess={isSuccess}
          isError={isError}
          errorMessages={errorMessages}
        />
      </Container>
    </>
  );
}
