

import { createRoot } from 'react-dom/client'

import App from "./App"
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ThemeProvider theme={theme} breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs">
    <App />
</ThemeProvider>)





