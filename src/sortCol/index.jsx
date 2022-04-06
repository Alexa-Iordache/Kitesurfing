import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import { tableCellClasses } from "@mui/material";
import { styled } from "@mui/material";
import TablePaginationActions from "../TablePagination";

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
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'country',
        numeric: false,
        disablePadding: false,
        label: 'Country',
    },
    {
        id: 'lat',
        numeric: true,
        disablePadding: false,
        label: 'Latitude',
    },
    {
        id: 'long',
        numeric: true,
        disablePadding: false,
        label: 'Longitude',
    },
    {
        id: 'probability',
        numeric: true,
        disablePadding: false,
        label: 'Wind Prob.',
    },
    {
        id: 'month',
        numeric: true,
        disablePadding: false,
        label: 'When to go',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const StyledTableRow = styled(TableRow)(() => ({
        marginTop: '20px'
    }));

    const StyledTableCell = styled(TableCell)(() => ({

        // the cell from the header of the table
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: 'black',
            color: 'white',
            fontSize: '16px',
            border: '1px solid white',
            borderCollapse: 'collapse',
            padding: '10px',
            textAlign: 'center'
        }
    }));

    return (
        <TableHead>
            <StyledTableRow>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </StyledTableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function SortTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('https://5ddbb358041ac10014de140b.mockapi.io/spot');
            for (const obj of request.data) {
                obj.favorite = false;    // attribute 'favorite' helps us to know if the spot is on the favorite list or no
            }
            setRows(request.data);
            console.log(request.data);
            return request;
        }
        fetchData();
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

      // style added on the table container 
    const StyledTableContainer = styled(TableContainer)(() => ({
        marginTop: '20px',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-around'
    }));

    // style added on the cell of the table 
    const StyledTableCell = styled(TableCell)(() => ({

        // the cell from the body of the table
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            border: '1px solid black',
            borderCollapse: 'collapse',
        }
    }));

    // style added on the row of the table
    const StyledTableRow = styled(TableRow)(() => ({
        marginTop: '20px'
    }));

    return (
        <div>
            <StyledTableContainer>
                <Table stickyHeader style={{ tableLayout: 'fixed', maxWidth: '95%' }}>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <StyledTableRow>
                                        <StyledTableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.country}</StyledTableCell>
                                        <StyledTableCell align="right">{row.lat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.long}</StyledTableCell>
                                        <StyledTableCell align="right">{row.probability}</StyledTableCell>
                                        <StyledTableCell align="right">{row.month}</StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </div>
    );
}
