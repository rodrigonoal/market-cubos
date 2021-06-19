import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  login: {
    display: "grid",
    placeContent: "center",
    minHeight: "100vh",
    background: "#EEEEEE",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#FFFFFF",
    width: "calc(392-172)",
    height: "calc(562-168)",
    padding: "80px 86px 88px 86px",
    borderRadius: 16,
    boxShadow:
      "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
  },
  titulo: {
    marginBottom: 88,
  },
  input: {
    marginBottom: 40,
    width: "100%",
  },
  button: {
    marginBottom: 24,
    width: 87,
  },
}));

export default useStyles;