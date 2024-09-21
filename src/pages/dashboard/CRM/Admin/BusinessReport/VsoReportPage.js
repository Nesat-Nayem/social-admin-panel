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

import VsoTableRow from 'sections/@dashboard/CRM/Admin/BusinessReport/list/Vso/VsoTableRow';
import VsoTableToolbar from 'sections/@dashboard/CRM/Admin/BusinessReport/list/Vso/VsoTableToolbar';
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
  { id: '' },
];
// ----------------------------------------------------------------------

export default function VsoReportPage() {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const {
    data,
    isLoading,
    isError: isErrorVso,
  } = useGetBussinessReport('vso', {
    fromDate,
    toDate,
  });

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
    inputData: _vsoList,
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
        <title> VSO Report: List | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="VSO Report List"
          links={[
            {
              name: 'VSO',
              // href: PATH_DASHBOARD.business.manager,
            },
          ]}
          action={
            <Button
              onClick={() => handleDownloadExcel(data, 'vso')}
              variant="contained"
              startIcon={<Iconify icon="eva:download-outline" />}
            >
              Export
            </Button>
          }
        />

        <Card>
          <VsoTableToolbar
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
                      <VsoTableRow
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
