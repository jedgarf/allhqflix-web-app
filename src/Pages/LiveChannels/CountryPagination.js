
// Material UI Components
import { IconButton } from "@mui/material";

// Icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <>
        <IconButton onClick={() => paginate(currentPage-1)} disabled={currentPage === 1}><ArrowBackIosNewIcon/></IconButton>
        {pageNumbers.map((item, index) => {
            return (
                <IconButton key={index} onClick={() => paginate(item)} style={{ color: item === currentPage ? '#3B71CA' : '#ccced1' }}>{item}</IconButton>
            )
        })}
        <IconButton onClick={() => paginate(currentPage+1)} disabled={currentPage === pageNumbers.length}><ArrowForwardIosIcon/></IconButton>
      </>
    );
  }
  
  export default Pagination;
  