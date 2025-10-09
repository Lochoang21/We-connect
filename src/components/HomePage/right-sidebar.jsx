import { Box } from '@mui/material';
import { MessagesPanel } from './message-panel';

export default function RightSidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: 350,
        position: 'sticky',
        top: 73,
        height: 'calc(100vh - 73px)',
        overflowY: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <MessagesPanel />
    </Box>
  );
}