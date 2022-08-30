
import ReactDom from 'react-dom'

import App from "./App"
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './theme'




ReactDom.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
    , document.getElementById('root'));



