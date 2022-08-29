import Room from "./components/Room/Room"
import Button from '@mui/material/Button'
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';

const App = ()=>{
    return (
 <div>
    <Button variant="contained" color="primary" startIcon={<PersonIcon/>}>
    hello world
    </Button>
    <Button variant="contained" color="primary" startIcon={<DeleteIcon/>}>
    Remove
    </Button>
 </div>

    )
   }

export default App