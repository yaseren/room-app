import { Paper ,styled } from '@mui/material';
import Grid from '@mui/material/Grid';


const MainBox = styled(Paper)(({ theme }) => ({
    
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.light,
    background: theme.palette.primary.main,
    margin:4
   
 }));
const MainPanel = () => {
    return (
        <Grid md={12} xs={12}>
          <MainBox>
           list of camera and screens
          </MainBox>
        </Grid>
    )

}

export default MainPanel