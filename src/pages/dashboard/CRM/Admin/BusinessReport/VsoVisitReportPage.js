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

import VsoVisitTableRow from 'sections/@dashboard/CRM/Admin/BusinessReport/list/VsoVisit/VsoVisitTableRow';
import VsoVisitTableToolbar from 'sections/@dashboard/CRM/Admin/BusinessReport/list/VsoVisit/VsoVisitTableToolbar';
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
  { id: 'id', label: 'Id', align: 'left', minWidth: 80 },
  { id: 'noOfVisitor', label: 'Visitor', align: 'left', minWidth: 80 },
  { id: 'visitor_id', label: 'Visitor Id', align: 'left', minWidth: 100 },
  { id: 'start_Km', label: 'Start Km', align: 'left', minWidth: 100 },
  { id: 'start_Km_img', label: 'Start Km Meter ', align: 'left', minWidth: 150 },
  { id: 'end_km', label: 'End Km', align: 'left', minWidth: 100 },
  { id: 'end_Km_img', label: 'End Km Meter', align: 'left', minWidth: 150 },
  { id: 'car_select', label: 'Vehical', align: 'left', minWidth: 150 },
  { id: 'miscellaneous_amt', label: 'Miscellaneous Amount', align: 'left', minWidth: 200 },
  { id: 'manager_id', label: 'Manager Id', align: 'left', minWidth: 150 },
  { id: 'created_at', label: 'Created At', align: 'left', minWidth: 150 },
  { id: 'updated_at', label: 'Updated At', align: 'left', minWidth: 150 },
];
// ----------------------------------------------------------------------

export default function VsoVisitReportPage() {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const {
    data,
    isLoading,
    isError: isErrorVso,
  } = useGetBussinessReport('vso-visit', {
    fromDate,
    toDate,
  });

  const _VsoVisitList =
    data?.map((meeting) => ({
      id: meeting?.id,
      noOfVisitor: meeting?.noOfVisitor,
      visitor_id: meeting?.visitor_id,
      start_Km: meeting?.start_Km,
      start_Km_img: meeting?.start_Km_img,
      end_km: meeting?.end_km,
      end_Km_img: meeting?.end_Km_img,
      car_select: meeting?.car_select,
      miscellaneous_amt: meeting?.miscellaneous_amt,
      manager_id: meeting?.manager_id,
      created_at: moment(meeting.created_at).format('DD-MM-YYYY'),
      updated_at: moment(meeting.updated_at).format('DD-MM-YYYY'),
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
    inputData: _VsoVisitList,
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
        <title> Vso Visit Report: List | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Vso Visit Report List"
          links={[
            {
              name: 'Vso Visit',
              // href: PATH_DASHBOARD.business.manager,
            },
          ]}
          action={
            <Button
              variant="contained"
              onClick={() => handleDownloadExcel(data, 'vso-visit')}
              startIcon={<Iconify icon="eva:download-outline" />}
            >
              Export
            </Button>
          }
        />

        <Card>
          <VsoVisitTableToolbar
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
                      <VsoVisitTableRow
                        key={row?.id}
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
      (user) => user.visitor_id.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
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
