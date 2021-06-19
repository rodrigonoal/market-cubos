import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { NavLink } from 'react-router-dom';
import { get } from '../../services/ApiClient';
import useAuth from '../../hooks/useAuth';


const drawerWidth = '8.6rem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth})`,
    boxShadow: 'none',
    marginLeft: drawerWidth,
  },
  toolBar: {
    backgroundColor: '#EEEEEE',

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#434343",
    alignItems: 'center'

  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#434343",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),

  },
  listIcon: {
    height: '60px',
  },
  image: {
    height: '40px',
    margin: '10px',
  },
  activeIcon: {
    borderRadius: '50%',
    backgroundColor: '#C4C4C4',
  },
}));

export default function CustomDrawer() {
  const classes = useStyles();
  const { token, deslogar } = useAuth();
  const [values, setValues] = useState({
    erro: '',
    usuario: {},
  })


  async function onLoad() {

    try {
      const resposta = await get('perfil', token)

      setValues({ ...values, usuario: (await resposta.json()) })

    } catch (error) {
      console.log(error);
    }


  };

  useEffect(() => {
    onLoad()
  }, []);


  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography
            variant="h3"
            noWrap
            style={{ color: 'black' }}>
            {values.usuario.nome_loja}
          </Typography>
        </Toolbar>
      </AppBar>


      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem
            button key='1'>
            <NavLink
              to='/produtos'
              activeClassName={classes.activeIcon}>
              <ListItemIcon className={classes.listIcon}>
                <img
                  className={classes.image}
                  src={'/assets/store.svg'}
                  alt='loja' />
              </ListItemIcon>
            </NavLink>
          </ListItem>
          <ListItem button key='2'>
            <NavLink
              to='/perfil'
              activeClassName={classes.activeIcon}>
              <ListItemIcon className={classes.listIcon}>
                <img
                  className={classes.image}
                  src={'/assets/user.svg'}
                  alt='usuario' /></ListItemIcon>
            </NavLink>
          </ListItem>
          <ListItem button key='3'>
            <NavLink
              onClick={deslogar}
              to='/'
            >
              <CancelIcon style={{ marginLeft: '5px',height: '60px', color: '#0000008A', fontSize:'50' }}>
                <img
                  className={classes.image}
                  src={'/assets/close.svg'}
                  alt='fechar' /></CancelIcon>
            </NavLink>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}