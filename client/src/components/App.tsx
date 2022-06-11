import React from 'react';

import { Switch } from 'react-declarative';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import routes from '../routes';

import ioc from '../lib/ioc';

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
  ); 
};

export default App;
