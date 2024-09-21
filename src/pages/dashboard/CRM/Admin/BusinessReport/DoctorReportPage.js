import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Button,
  Card,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// _mock_
// components
// utils

// _mock_

// components
import moment from 'moment';

import DoctorTableRow from 'sections/@dashboard/CRM/Admin/BusinessReport/list/Doctor/DoctorTableRow';
import DoctorTableToolbar from 'sections/@dashboard/CRM/Admin/BusinessReport/list/Doctor/DoctorTableToolbar';
import { useGetBussinessReport } from 'services/Master.Services';
import { handleDownloadExcel } from 'utils/convertArrayToCSVFile';
import { fTimestamp } from 'utils/formatTime';
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

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'all',
  'full stack development',
  'backend development',
  'ui design',
  'ui/ux design',
  'front end development',
];

const TABLE_HEAD = [
  { id: 'image', label: 'Profile', align: 'left', minWidth: 100 },
  { id: 'id', label: 'ID', align: 'left', minWidth: 100 },
  { id: 'name', label: 'Name', align: 'left', minWidth: 100 },
  { id: 'email', label: 'Email', align: 'left', minWidth: 100 },
  { id: 'phone', label: 'Phone', align: 'left', minWidth: 100 },
  { id: 'qualification', label: 'Qualification', align: 'left', minWidth: 100 },
  { id: 'dob', label: 'Date of Birth', align: 'left', minWidth: 180 },
  { id: 'route', label: 'Route', align: 'left', minWidth: 100 },
  { id: 'area', label: 'Area', align: 'left', minWidth: 100 },
  { id: 'designation', label: 'Desgination', align: 'left', minWidth: 180 },
  { id: 'doctor_type', label: 'Doctor Type', align: 'left', minWidth: 180 },
  { id: 'ids_attend', label: 'IDS Attend', align: 'left', minWidth: 180 },
  { id: 'coupon_collected', label: 'Coupon Collected', align: 'left', minWidth: 180 },
  { id: 'sample_given', label: 'Sample Given', align: 'left', minWidth: 180 },
  { id: 'coupon_settled', label: 'Coupon Settled', align: 'left', minWidth: 180 },
  { id: 'special_gift', label: 'Special Gift', align: 'left', minWidth: 180 },
  { id: 'last_two_month_visit', label: 'Last Two Month Visit', align: 'left', minWidth: 200 },
  { id: 'total_point', label: 'Total Point', align: 'left', minWidth: 180 },
  { id: 'adhar_card_no', label: 'Adhar Card No', align: 'left', minWidth: 200 },
  { id: 'pan_card_no', label: 'Pan Card No', align: 'left', minWidth: 200 },
  { id: 'account_holder_name', label: 'Account Holder Name', align: 'left', minWidth: 200 },
  { id: 'bank_name', label: 'Bank Name', align: 'left', minWidth: 200 },
  { id: 'account_number', label: 'Account Number', align: 'left', minWidth: 200 },
  { id: 'ifsc_code', label: 'IFSC Code', align: 'left', minWidth: 100 },
  { id: 'created_at', label: 'Created At', align: 'left', minWidth: 180 },
  { id: 'updated_at', label: 'Updated At', align: 'left', minWidth: 180 },
];
// ----------------------------------------------------------------------

export default function DoctorReportPage() {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const {
    data,
    isLoading,
    isError: isErrorVso,
  } = useGetBussinessReport('doctor', {
    fromDate,
    toDate,
  });

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
  } = useTable({ defaultOrderBy: 'createDate' });

  const [tableData, setTableData] = useState(data || []);

  const [filterName, setFilterName] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');

  const [filterEndDate, setFilterEndDate] = useState(null);

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const dataFiltered = applyFilter({
    inputData: _doctorList,
    comparator: getComparator(order, orderBy),
    filterName,
    filterService,
    filterStatus,
    filterStartDate,
    filterEndDate,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 56 : 76;

  const isFiltered =
    filterStatus !== 'all' ||
    filterName !== '' ||
    filterService !== 'all' ||
    (!!filterStartDate && !!filterEndDate) ||
    fromDate !== null ||
    toDate !== null;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterService) ||
    // (!dataFiltered.length && !!filterEndDate) ||
    isLoading ||
    isErrorVso;
  // (!dataFiltered.length && !!filterStartDate);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterService = (event) => {
    setPage(0);
    setFilterService(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

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
    navigate(PATH_DASHBOARD.invoice.edit(id));
  };

  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.view(id));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterStatus('all');
    setFilterService('all');
    setFilterEndDate(null);
    setFilterStartDate(null);
    setFromDate(null);
    setToDate(null);
  };

  return (
    <>
      <Helmet>
        <title> Doctor Report: List | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Doctor Report List"
          links={[
            {
              name: 'Doctor',
              // href: PATH_DASHBOARD.business.manager,
            },
          ]}
          action={
            <Button
              startIcon={<Iconify icon="eva:download-outline" />}
              onClick={() => handleDownloadExcel(data, 'doctor')}
              variant="contained"
            >
              Export
            </Button>
          }
        />

        <Card>
          <DoctorTableToolbar
            filterName={filterName}
            isFiltered={isFiltered}
            filterService={filterService}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            optionsService={SERVICE_OPTIONS}
            filterStartDate={filterStartDate}
            onResetFilter={handleResetFilter}
            onFilterService={handleFilterService}
            onFilterStartDate={(newValue) => {
              console.log('newValue', newValue);
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
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
                <Stack direction="row">
                  <Tooltip title="Sent">
                    <IconButton color="primary">
                      <Iconify icon="ic:round-send" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton color="primary">
                      <Iconify icon="eva:download-outline" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="eva:printer-fill" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={handleOpenConfirm}>
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Tooltip>
                </Stack>
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
                      <DoctorTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
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

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
  filterService,
  filterStartDate,
  filterEndDate,
}) {
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
    inputData = inputData.filter((invoice) => invoice.status === filterStatus);
  }

  if (filterService !== 'all') {
    inputData = inputData.filter((invoice) =>
      invoice.items.some((c) => c.service === filterService)
    );
  }

  if (filterStartDate && filterEndDate) {
    inputData = inputData.filter(
      (invoice) =>
        fTimestamp(invoice.createDate) >= fTimestamp(filterStartDate) &&
        fTimestamp(invoice.createDate) <= fTimestamp(filterEndDate)
    );
  }

  return inputData;
}

// function DoctorReportPage() {
//   return <div>DoctorReportPage</div>;
// }

// export default DoctorReportPage;
