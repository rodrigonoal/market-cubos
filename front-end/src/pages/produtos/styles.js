import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    background: "#EEEEEE",
    minHeight: "100vh",
  },
  produtos: {
    padding: "78px 0 25px 212px",
  },
  button: {
    marginTop: 58,
    width: 200,
    backgroundColor: "#007DFF",
  },
  titulo: {
    marginBottom: 85,
  },
  subtitulo: {
    marginBottom: 37,
  },
  listaCards: {
    display: 'flex',
    gap: 24,
    overflowX: 'auto',
  },
  card: {
    maxWidth: 201,
    minWidth: 201,
    minHeight: 355,
    marginBottom: 13,
    borderRadius: 24,
  },
  imagem: {
    width: '100%',
    height: 250,
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  preco: {
    fontWeight: 600,
  }
}));

export default useStyles;