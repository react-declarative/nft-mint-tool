import React from 'react';

import { Switch, ISwitchItem } from 'react-declarative';

import HomePage from './pages/HomePage';

import ioc from './lib/ioc';
import { Container, CssBaseline } from '@mui/material';

const routes: ISwitchItem[] = [
    {
        path: '/',
        element: HomePage,
    }
];

const App = () => {
  return (
    <Container>
      <CssBaseline />
      <Switch
        Loader={() => <></>}
        history={ioc.routerService}
        items={routes}
      />
    </Container>
  ) 
}

export default App;