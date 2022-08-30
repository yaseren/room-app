import { Paper, styled } from '@mui/material';
import Grid from '@mui/material/Grid';
const CahtBox = styled(Paper)(({ theme }) => ({
    ...theme.palette,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.light,
    background: theme.palette.primary.main,
    height:400,
    margin:4

    
 }));
const ChatPanel = () => {
    return (
        <Grid md={12} xs={12} >
           <CahtBox>
            <p>chat</p>
           </CahtBox>
        </Grid>
    )

}

export default ChatPanel