import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../Items/Pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        Displaying {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount} items
      </Typography>
      <Pagination
        color="secondary"
        count={totalPages}
        variant="outlined"
        shape="rounded"
        size="small"
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
        sx={{ p: 3 }}
      />
    </Box>
  );
}
