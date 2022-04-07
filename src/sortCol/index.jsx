import React, { useState } from 'react';
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
import { tableCellClasses } from "@mui/material";
import { styled } from "@mui/material";
import TablePaginationActions from "../TablePagination";
import MaterialTable from 'material-table';


// function that returns -1, 1 or 0 depending on the value received by 'order'
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {  // if the items are placed in a descending order, then return -1
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {  // if the items are placed in an ascending order, then return 1
        return 1;
    }
    return 0;
}


function getComparator(order, orderBy) {
    return order === 'desc' // if the items need to be sorted in descending order
        ? (a, b) => descendingComparator(a, b, orderBy) // 'descendingComparator' function returns the standard values
        : (a, b) => -descendingComparator(a, b, orderBy);   // otherwise, we exchange values ​​with each other
}

// function to sort the elem of an array
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

// headCells is an array with the info that should be in the head of the table
const headCells = [
    {
        id: 'name', // the id, according to which the elements will be ordered
        numeric: false, // if it is a numeric value or not
        label: 'Name',  // what appears in the cell
    },
    {
        id: 'country',
        numeric: false,
        label: 'Country',
    },
    {
        id: 'lat',
        numeric: true,
        label: 'Latitude',
    },
    {
        id: 'long',
        numeric: true,
        label: 'Longitude',
    },
    {
        id: 'probability',
        numeric: true,
        label: 'Wind Prob.',
    },
    {
        id: 'month',
        numeric: true,
        label: 'When to go',
    },
];

// function used to display the head of the table
function TableHeadFunction(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    // style added to the table row
    const StyledTableRow = styled(TableRow)(() => ({
        marginTop: '20px'
    }));

    // style added to the table cel
    const StyledTableCell = styled(TableCell)(() => ({

        // the cell from the header of the table
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: 'rgb(128,128,128)',
            color: 'white',
            fontSize: '16px',
            border: '1px solid black',
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

TableHeadFunction.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

// the main function
export default function SortTable(props) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('country');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // const [rows, setRows] = useState(props.vector); // in this case, rows = spots
    const rows = props.vector;
    const [searched, setSearched] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);
    const [searchInput, setSearchInput] = useState('');

    // const cancelSearch = () => {
    //     setSearched('');
    //     requestSearch(searched);
    // }

    // function used to handling the sorting
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // function for changing the page 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // function to change how many rows are displayed on one page of the table 
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeSearch = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    // if (searchInput.length > 0) {
    //     const filteredRows = rows.filter((row) => {
    //         //console.log(row.name.includes(searchInput));
    //         // return row.name.includes(searchInput);
    //         if (row.name.includes(searchInput) === true) {
    //             console.log(row);
    //             //setFilteredRows(row);
    //             return row;
    //         }
    //     });
    //     // setFilteredRows(filteredRows);
    //     //console.log(filteredRows);


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

    const filteredData = rows.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.name.toLowerCase().includes(props.input)
        }
    })

    return (
        <div>
            

            <StyledTableContainer>
                <Table stickyHeader
                    style={{ tableLayout: 'fixed', maxWidth: '95%' }}
                    options={{ search: true }}
                >
                    <TableHeadFunction
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {/* sorting function is called and the rows will be displayed in order, but only 5/10/25 on a page */}
                        {stableSort(filteredData, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <StyledTableRow>
                                        <StyledTableCell>{row.name}</StyledTableCell>
                                        <StyledTableCell>{row.country}</StyledTableCell>
                                        <StyledTableCell>{row.lat}</StyledTableCell>
                                        <StyledTableCell>{row.long}</StyledTableCell>
                                        <StyledTableCell>{row.probability}</StyledTableCell>
                                        <StyledTableCell>{row.month}</StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}    // the user can choose how many rows should be dispalyed in the table at a time (5 rows, 10 rows or 25 rows)
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
