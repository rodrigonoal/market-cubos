import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Login from "./pages/login";
import Produtos from "./pages/produtos";
import ProdutoNovo from "./pages/produtoNovo";
import { Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAuth from "./hooks/useAuth";
import Cadastro from "./pages/cadastro";
import Perfil from "./pages/perfil";
import EditarProduto from "./pages/editarProduto";

function RotasProtegidas(props) {
  const { token } = useAuth();

  return (
    <Route
      render={() => (token ? props.children : <Redirect to="/" />)}
    />
  );
}

export default function Routes() {

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/cadastro' component={Cadastro}/>
          <RotasProtegidas>
            <Route path='/produtos' exact component={Produtos} />
            <Route path='/produtos/novo' component={ProdutoNovo} />
            <Route path='/produtos/:id/editar' component={EditarProduto} />
            <Route path='/perfil' component={Perfil} />
          </RotasProtegidas>
        </Switch>
      </Router>
    </AuthProvider>
  )
};