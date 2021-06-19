import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    background: "#EEEEEE",
  },
  perfil: {
    padding: "78px 0 25px 212px",
  },
  titulo: {
    marginBottom: 85,
  },
  subtitulo: {
    marginBottom: 97,
  },
  inputsPerfil: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 120,
  },
  input: {
    marginBottom: 48,
    width: 392,
  },
  button: {
    marginTop: 35,
    backgroundColor: "#007DFF",
  },
}));

export default useStyles;