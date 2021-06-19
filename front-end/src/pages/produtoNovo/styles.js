import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    background: "#EEEEEE",
  },
  produtos: {
    padding: "78px 0 25px 212px",
  },
  titulo: {
    marginBottom: 85,
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
    marginBottom: 48,
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
  },
  cor: {
    color: "#007DFF",
  },
  background: {
    backgroundColor: "#007DFF",
  },
}));

export default useStyles;