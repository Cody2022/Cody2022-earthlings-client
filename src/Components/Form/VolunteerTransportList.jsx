import * as React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { visuallyHidden } from '@mui/utils';

function createData(data_startTime, endTime, languages, accessories, maxPassengers) {
  return {
    data_startTime,
    endTime,
    languages,
    accessories,
    maxPassengers
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'data_startTime',
    numeric: false,
    disablePadding: true,
    label: 'Start Time',
  },
  {
    id: 'endTime',
    numeric: false,
    disablePadding: false,
    label: 'End Time',
  },
  {
    id: 'languages',
    numeric:false,
    disablePadding: false,
    label: 'Languages',
  },
  {
    id: 'accessories',
    numeric: false,
    disablePadding: false,
    label: 'Accessories',
  },
  {
    id: 'maxPassengers',
    numeric: true,
    disablePadding: false,
    label: 'Max. Passengers',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount } =
    props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
         </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}                ///makechanges
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
            //   onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
     <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Transportation Service Schedule
        </Typography>
     </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function VolunteerTransportList(props) {
    const transportList=props.transportList;
    const rerender=props.rerender;
    const setRerender=props.setRerender;
    const { user } = useAuth0();
    const email = user.email;
    const rows=[];

    transportList.forEach((transportInfo) => {
      let startTime=new Date (transportInfo.startTime).toLocaleString('en-US', {
        hour12: false,
        day:    'numeric',
        month:  'numeric',
        year:   'numeric',
        hour:   '2-digit',
        minute: '2-digit',});
      let endTime=new Date (transportInfo.endTime).toLocaleString('en-US', {
        hour12: false,
        day:    'numeric',
        month:  'numeric',
        year:   'numeric',
        hour:   '2-digit',
        minute: '2-digit',
    });
      let languages=transportInfo.languages.join(", ")
      let accessories=transportInfo.accessories.join(", ")
      rows.push(createData(startTime, endTime, languages, accessories, transportInfo.maxPassengers));
    });
    
    const [selected, setSelected] = React.useState([]);
 
    const deleteTransportInfo = async ({email, startTime}) => {
        const response = await fetch(`/transport/delete`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email, startTime}),
        });
        return response.json();
      };
      
    const handleDelete = async (event) => {
      event.preventDefault();
      if (selected.length > 0) {
        selected.forEach(async (element) => {
        let startTime = new Date(element);
          const deletedTransportInfo = await deleteTransportInfo({
            email: email,
            startTime: startTime,
          });
        });
      }
      setRerender(!rerender);
    };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('startTime');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n) => n.data_startTime);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, data_startTime) => {
    const selectedIndex = selected.indexOf(data_startTime);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, data_startTime);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (data_startTime) => selected.indexOf(data_startTime) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" , paddingTop: 1}}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              //   onSelectAllClick={handleSelectAllClick}
              //   onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.data_startTime);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row.data_startTime)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.data_startTime}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.data_startTime}
                      </TableCell>
                      <TableCell align="center">{row.endTime}</TableCell>
                      <TableCell align="center">{row.languages}</TableCell>
                      <TableCell align="center">{row.accessories}</TableCell>
                      <TableCell align="center">{row.maxPassengers}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        { (selected.length>0) &&
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon sx={{ color: "red" }} />
            </IconButton>
          </Tooltip>
        }
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense mode"
      />
    </Box>
  );
}

