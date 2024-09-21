import { paramCase } from 'change-case';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// _mock_
import VehicleNewEditForm from 'sections/@dashboard/CRM/Admin/Vehicle/VehicleNewEditForm';
import { useGetMasterById, useUpdateMaster } from 'services/Master.Services';
import { _userList } from '../../../../../_mock/arrays';

// components
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../../components/settings';
// sections

// ----------------------------------------------------------------------

export default function VehicleEditPage() {
  const { themeStretch } = useSettingsContext();

  const { data } = useGetMasterById('car-allowance');
  const { update, isSuccess, isError, errorMessages } = useUpdateMaster('car-allowance');

  const { name } = useParams();

  const currentUser = _userList.find((user) => paramCase(user.name) === name);

  return (
    <>
      <Helmet>
        <title> Vehicle: Edit Vehicle | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Vehicle"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: PATH_DASHBOARD.root,s
            // },
            {
              name: 'Vehicle List',
              href: PATH_DASHBOARD.vehiclemaster.list,
            },
            { name: currentUser?.name },
          ]}
        />

        <VehicleNewEditForm
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
