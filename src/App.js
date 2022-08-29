import Room from "./components/Room/Room"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}));
const App = () => {
   return (
      <Grid container spacing={1} padding={2}>
         <Grid md={12} xs={12}>
            <Box>
               <Paper variant="outlined" square />
            </Box>
         </Grid>
         <Grid item md={10} xs={12} height={Screen.a}>
           
                      
            
         </Grid>
         <Grid item md={2} xs={12}>
            <Item>user and chat </Item>
         </Grid>
         <Grid item md={12} xs={12}>
            <Item>toolbar</Item>
         </Grid>
      </Grid>

   )
}

export default App