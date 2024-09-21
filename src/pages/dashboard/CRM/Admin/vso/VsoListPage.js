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
// sections
import {
  UserTableRow,
  UserTableToolbar,
} from '../../../../../sections/@dashboard/CRM/Admin/vso/list';

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
  { id: 'profile_image', label: 'Profile', align: 'left', minWidth: 100 },
  { id: 'id', label: 'ID', align: 'left', minWidth: 100 },
  { id: 'name', label: 'Name', align: 'left', minWidth: 100 },
  { id: 'dob', label: 'Date of birth', align: 'left', minWidth: 150 },
  { id: 'phone', label: 'Phone', align: 'left', minWidth: 180 },
  { id: 'email', label: 'Email', align: 'left', minWidth: 180 },
  { id: 'qualification', label: 'Qualification', align: 'left', minWidth: 150 },
  { id: 'headoffice', label: 'Branch', align: 'left', minWidth: 100 },
  { id: 'advance', label: 'Advance', align: 'left', minWidth: 150 },
  { id: 'allowancepending', label: 'Allowance Pending', align: 'left', minWidth: 200 },
  { id: 'reportingmanager', label: 'Reporting Manager', align: 'left', minWidth: 200 },
  { id: 'bank_name', label: 'Bank Name', align: 'left', minWidth: 200 },
  { id: 'account_holder_name', label: 'Account Holder Name', align: 'left', minWidth: 180 },
  { id: 'account_number', label: 'Account Number', align: 'left', minWidth: 180 },
  { id: 'ifsc_code', label: 'IFSC Code', align: 'left', minWidth: 150 },
  { id: 'pan_card_no', label: 'PAN Number', align: 'left', minWidth: 150 },
  { id: 'adhar_card_no', label: 'Aadhar Number', align: 'left', minWidth: 150 },
  { id: 'current_month_visit', label: 'Current Month Visit', align: 'left', minWidth: 180 },
  { id: 'total_visit', label: 'Total Visit', align: 'left', minWidth: 150 },
  { id: 'created_at', label: 'Created At', align: 'left', minWidth: 150 },
  { id: 'updated_at', label: 'Updated At', align: 'left', minWidth: 150 },
];

// ----------------------------------------------------------------------

export default function VsoListPage() {
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

  const { data, isLoading, isError: isErrorVso } = useGetMaster('vso');
  const { deleteUser, isSuccess, isError } = useDeleteMaster('vso');

  console.log('KKKK', data);

  const _vsoList =
    data?.map((vso) => ({
      profile_image: vso.profile_image,
      id: vso.id,
      name: vso.name,
      dob: moment(vso.dob).format('DD-MM-YYYY'),
      phone: vso.phone,
      email: vso.email,
      qualification: vso.qualification,
      headoffice: vso.headoffice,
      advance: vso.advance,
      allowancepending: vso.allowancepending,
      reportingmanager: vso.reportingmanager,
      bank_name: vso.bank_name,
      account_holder_name: vso.account_holder_name,
      account_number: vso.account_number,
      ifsc_code: vso.ifsc_code,
      pan_card_no: vso.pan_card_no,
      adhar_card_no: vso.adhar_card_no,
      current_month_visit: vso.current_month_visit,
      total_visit: vso.total_visit,
      created_at: moment(vso.created_at).format('DD-MM-YYYY'),
      updated_at: moment(vso.updated_at).format('DD-MM-YYYY'),
    })) || [];

  const navigate = useNavigate();

  const [tableData, setTableData] = useState(data || []);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');

  const dataFiltered = applyFilter({
    inputData: _vsoList,
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
    (!dataFiltered.length && !!filterRole) ||
    isLoading ||
    isError ||
    isErrorVso ||
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
    navigate(PATH_DASHBOARD.vsomaster.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title> User: List | Voiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="VSO List"
          links={[
            // // { name: 'Dashboard', href: PATH_DASHBOARD.vsomaster.root },
            // { name: 'User', href: PATH_DASHBOARD.vsomaster.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.vsomaster.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Vso
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
            isSuccess={isSuccess}
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
                        isSuccess={isSuccess}
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
