import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { BiLastPage } from 'react-icons/bi';
import { BiFirstPage } from 'react-icons/bi';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';

// functions used to make possible changing the 5 rows displayed at a time in the table

export default function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  // function for the case in which the user is at the first page of the table
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  // function for the case in which the user wants to move on the the next page
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

   // function for the case in which the user wants to move back the the previous page
  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  // function for the case in which the user is at the final page of the table
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box style={{width: '700px', marginLeft: '15px'}}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0} // if there is the first page, then the button to move back is disabled
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <BiLastPage /> : <BiFirstPage />}
      </IconButton>

      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1} // if the current page number is equal to the 
                                    // maximum number of pages that can exist, then the button is disabled
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />}
      </IconButton>

      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <BiFirstPage /> : <BiLastPage />}
      </IconButton>
    </Box>
  );
}

// make sure the data we receive si valid
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};