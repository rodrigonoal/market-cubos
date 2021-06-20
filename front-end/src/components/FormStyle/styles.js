import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imagem: {
    maxHeight: 510,
  },
  containerImagem: {
    position: 'absolute', 
    top: 100,
    right: 120, 
    maxHeight: 500,
    maxWidth: 600,
    borderRadius: 16,
    overflow: 'hidden',
  },
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
  main: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 30,
  },
  input: {
    marginBottom: 48,
    width: 390,
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
    marginTop: 20,
    height: 100
  },
  cor: {
    color: "#007DFF",
  },
  background: {
    backgroundColor: "#007DFF",
  },
  placeholder: {
    width: '100%',
    height: 80,
    backgroundColor: '#EEEEEE',
  }
}));

export default useStyles;