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
  containerEditar: {
    display: "flex",
    gap: 166,
    marginBottom: 48,
  },
  editarProduto: {
    display: "flex",
    flexDirection: "column",
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
  imagem: {
    width: 308,
    height: 402,
    borderRadius: 16,
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