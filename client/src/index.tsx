import ReactDOM from 'react-dom';

import { ThemeProvider } from '@mui/styles';
import { ModalProvider } from 'react-declarative';

import AlertProvider from './components/AlertProvider';

import App from './components/App';

import THEME_DARK from './theme';

const wrappedApp = (
    <ThemeProvider theme={THEME_DARK}>
        <ModalProvider>
            <AlertProvider>
                <App />
            </AlertProvider>
        </ModalProvider>
    </ThemeProvider>
);

ReactDOM.render(wrappedApp, document.getElementById('root'));
