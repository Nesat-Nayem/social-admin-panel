import { paramCase } from 'change-case';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// _mock_
// components
import moment from 'moment';
import { useDeleteMaster, useGetMaster } from 'services/Master.Services';
import ConfirmDialog from '../../../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import Iconify from '../../../../../components/iconify';
import Scrollbar from '../../../../../components/scrollbar';
import { useSettingsContext } from '../../../../../components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  getComparator,
  useTable,
} from '../../../../../components/table';
import UserCityTableRow from '../../../../../sections/@dashboard/CRM/Admin/Sample/list/UserCityTableRow';
// sections
import {
  UserTableRow,
  UserTableToolbar,
} from '../../../../../sections/@dashboard/CRM/Admin/Doctor/list';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

const TABLE_HEAD = [
  { id: '' },
  { id: 'image', label: 'Profile', align: 'left', minWidth: 100 },
  { id: 'id', label: 'ID', align: 'left', minWidth: 100 },
  { id: 'name', label: 'Name', align: 'left', minWidth: 100 },
  { id: 'email', label: 'Email', align: 'left', minWidth: 100 },
  { id: 'phone', label: 'Phone', align: 'left', minWidth: 100 },
  { id: 'designation', label: 'Desgination', align: 'left', minWidth: 180 },
  { id: 'doctor_type', label: 'Doctor Type', align: 'left', minWidth: 180 },
  { id: 'ids_attend', label: 'IDS Attend', align: 'left', minWidth: 180 },
  { id: 'coupon_collected', label: 'Coupon Collected', align: 'left', minWidth: 180 },
  { id: 'sample_given', label: 'Sample Given', align: 'left', minWidth: 180 },
  { id: 'coupon_settled', label: 'Coupon Settled', align: 'left', minWidth: 180 },
  { id: 'special_gift', label: 'Special Gift', align: 'left', minWidth: 180 },
  { id: 'last_two_month_visit', label: 'Last Two Month Visit', align: 'left', minWidth: 200 },
  { id: 'total_point', label: 'Total Point', align: 'left', minWidth: 180 },

  { id: 'created_at', label: 'Created At', align: 'left', minWidth: 180 },
  { id: 'updated_at', label: 'Updated At', align: 'left', minWidth: 180 },
];

// ----------------------------------------------------------------------

export default function DoctorListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();
  const { data, isLoading, isError: isErrorVso } = useGetMaster('posts');
  console.log('data dd', data);
  const { deleteUser, isSuccess, isError } = useDeleteMaster('doctor');

  const _doctorList =
    data?.map((doctor) => ({
      image: doctor.image,
      id: doctor.id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      qualification: doctor.qualification,
      dob: moment(doctor.dob).format('DD-MM-YYYY'),
      route: doctor.route,
      area: doctor.area,
      designation: doctor.designation,
      doctor_type: doctor.doctor_type,
      ids_attend: doctor.ids_attend,
      coupon_collected: doctor.coupon_collected,
      sample_given: doctor.sample_given,
      coupon_settled: doctor.coupon_settled,
      special_gift: doctor.special_gift,
      last_two_month_visit: doctor.last_two_month_visit,
      total_point: doctor.total_point,
      adhar_card_no: doctor.adhar_card_no,
      pan_card_no: doctor.pan_card_no,
      account_holder_name: doctor.account_holder_name,
      bank_name: doctor.bank_name,
      account_number: doctor.account_number,
      ifsc_code: doctor.ifsc_code,

      created_at: moment(doctor.created_at).format('DD-MM-YYYY'),
      updated_at: moment(doctor.updated_at).format('DD-MM-YYYY'),
    })) || [];

  const navigate = useNavigate();

  const [tableData, setTableData] = useState(data || []);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');

  const dataFiltered = applyFilter({
    inputData: _doctorList,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    isLoading ||
    isError ||
    isErrorVso ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
    deleteUser(id);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.doctormaster.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  return (
    <>
      <Helmet>
        <title> Doctor: List | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Doctor List"
          links={[
            // // { name: 'Dashboard', href: PATH_DASHBOARD.vsomaster.root },
            // { name: 'User', href: PATH_DASHBOARD.vsomaster.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.doctormaster.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Doctor
            </Button>
          }
        />

        <Card>
          {/* <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs> */}
          {/* <Divider /> */}
          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            optionsRole={ROLE_OPTIONS}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
            data={data && data}
          />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'all') {
    inputData = inputData.filter((user) => user.status === filterStatus);
  }

  if (filterRole !== 'all') {
    inputData = inputData.filter((user) => user.role === filterRole);
  }

  return inputData;
}
