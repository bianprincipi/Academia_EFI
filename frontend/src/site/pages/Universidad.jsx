import { Typography, Stack } from '@mui/material';
export default function Universidad(){
  return (
    <Stack spacing={2}>
      <Typography variant="h4">La Universidad</Typography>
      <Typography color="text.secondary">
        Misión, visión, autoridades, calendario académico y normativa institucional.
      </Typography>
    </Stack>
  );
}
