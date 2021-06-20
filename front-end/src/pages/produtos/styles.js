import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  body: {
    background: "#EEEEEE",
    minHeight: "100vh",
  },
  produtos: {
    padding: "78px 0 25px 212px",
  },
  cardActions: {
    display: "flex",
    marginTop: "20%",
    justifyContent: "space-between",
  },
  card: {
    width: 300,
    height: 450,
    marginBottom: 13,
    borderRadius: 24,
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
  imagem: {
    width: '100%',
    height: 250,
  },
  button: {
    marginTop: 48,
    width: 200,
    backgroundColor: "#007DFF",
  },
  preco: {
    fontWeight: 600,
  }
}));

export default useStyles;