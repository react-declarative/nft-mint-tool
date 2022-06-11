import React from 'react';
import { useState } from "react";

import { makeStyles } from '@mui/styles';

import { Switch } from 'react-declarative';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import LinearProgress from '@mui/material/LinearProgress';

import routes from '../routes';

import ioc from '../lib/ioc';

const useStyles = makeStyles({
  loaderBar: {
    marginTop: -4,
  },
});

const Fragment = () => <></>;

const App = () => {

  const classes = useStyles();

  const [loader, setLoader] = useState(false);

  const handleLoadStart = () => setLoader(true);
  const handleLoadEnd = () => setLoader(false);

  return (
    <Container>
      {loader && (
        <Box className={classes.loaderBar}>
          <LinearProgress color="secondary" />
        </Box>
      )}
      <CssBaseline />
      <Switch
        Loader={Fragment}
        history={ioc.routerService}
        items={routes}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
    </Container>
  );
};

export default App;
