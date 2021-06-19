import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    width: '100vw',
    height: '100vh',
  },
}));

export default function CustomBackdrop() {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open='true'>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}