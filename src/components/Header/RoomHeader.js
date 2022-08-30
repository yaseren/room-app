import { AppBar, Paper, makeStyles, Toolbar, } from '@mui/material';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import { theme } from '../../theme';
import ToolBar from '../Footer/RoomFooter';
const useStyles = styled((theme) => ({
    ...theme,
   
}))

const RoomHeader = () => {
    const classes = useStyles();
    return (
        <AppBar>
            <Toolbar>

            </Toolbar>
        </AppBar>
    )

}

export default RoomHeader