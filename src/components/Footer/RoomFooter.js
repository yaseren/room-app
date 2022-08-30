import { AppBar, Paper, styled, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import { theme } from '../../theme';
const useStyles = styled((theme) => ({
    ...theme,
    toolBar: {
        top: 'auto',
        bottom: 0,

    },
  

}))


const RoomFooter = () => {
    const classes = useStyles();
    return (

        <Toolbar className={classes.toolBar} >
            <p>Tools Icons</p>
        </Toolbar>

    )

}

export default RoomFooter