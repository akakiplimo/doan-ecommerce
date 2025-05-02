import { Pagination as MuiPagination, Stack } from "@mui/material";
import { PaginationProps as MuiPaginationProps } from "@mui/material/Pagination";

interface PaginationProps {
  count: number; // Total number of pages
  page: number; // Current page
  onChange: MuiPaginationProps["onChange"]; // Event handler for page change
}

const Pagination = ({ count, page, onChange }: PaginationProps) => {
  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default Pagination;
