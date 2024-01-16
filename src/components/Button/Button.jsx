import { Button } from '@mui/material';

export default function LoadButton({ onLoadMore, disabled }) {
  return (
    <Button variant="contained" onClick={onLoadMore} disabled={disabled}>
      Load More
    </Button>
  );
}
