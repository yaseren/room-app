import { Paper ,styled } from '@mui/material';
import Grid from '@mui/material/Grid';


const Box = styled(Paper)(({ theme }) => ({
    ...theme.palette,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.light,
    background: theme.palette.primary.main,
    height:300,margin:4

    
 }));
const UsersList = () => {
    return (
        <Grid md={12} xs={12}>
          <Box>
            list of users 
          </Box>
        </Grid>
    )

}

export default UsersList