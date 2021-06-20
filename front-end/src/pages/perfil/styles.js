import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    background: "#EEEEEE",
  },
  produtos: {
    padding: "110px 0 0 250px",
  },
  titulo: {
    marginBottom: 65,
  },
  subtitulo: {
    marginBottom: 57,
  },
  adicionarProduto: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 83,
  },
  input: {
    marginBottom: 48,
    width: 392,
  },
  listaInputs: {
    display: "flex",
    marginBottom: -20,
    gap: 24,
  },
  inputNumber: {
    width: 184,
  },
  botoes: {
    display: "flex",
    gap: 24,
    alignItems: "center",
    marginTop: 41,
    height: 100
  },
  cor: {
    color: "#007DFF",
  },
  background: {
    backgroundColor: "#007DFF",
  },
}));

export default useStyles;