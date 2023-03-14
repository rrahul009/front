
import './App.css';
import C from './components/c';
import Download from './components/downloadDelete';
import Upload from './components/upload';
import Save from './components/save';
import Box from '@mui/material/Box';
import {styled} from '@emotion/styled';
import { Button } from '@mui/material';
function App() {

  return (
    <Box
  sx={{
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    padding: '20px',
    width: '80%',
    height: '80vh',
    display: 'flex',
    flexDirection:"column",
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
<Upload />
<Download />
<Save />
</Box>

    
  );
}

export default App;
