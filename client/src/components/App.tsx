import React from 'react';
import { useState } from "react";

import { makeStyles } from '@mui/styles';

import { Switch } from 'react-declarative';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import LinearProgress from '@mui/material/LinearProgress';

import Footer from './common/Footer';

import routes from '../routes';

import ioc from '../lib/ioc';

const useStyles = makeStyles({
  loaderBar: {
    marginBottom: -4,
  },
});

const Fragment = () => <></>;

const App = () => {

  const classes = useStyles();

  const [loader, setLoader] = useState(false);

  const handleLoadStart = () => setLoader(true);
  const handleLoadEnd = () => setLoader(false);

  return (
    <Box>
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
      <Footer />
    </Box>
  );
};

export default App;
