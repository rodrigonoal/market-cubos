import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  login: {
    display: "grid",
    placeContent: "center",
    minHeight: "100vh",
    padding: "20px 0 20px 0",
    background: "#EEEEEE",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "center",
    background: "#FFFFFF",
    width: 300,
    height: 220,
    padding: "80px 86px 128px 86px",
    borderRadius: 16,
    boxShadow:
    `0px 8px 9px -5px rgba(0, 0, 0, 0.2),
    0px 15px 22px 2px rgba(0, 0, 0, 0.14),
    0px 6px 28px 5px rgba(0, 0, 0, 0.12)`,
  },
  input: {
    marginBottom: 20,
    width: "100%",
  },
  button: {
    marginBottom: 10,
    width: 136,
  },
}));

export default useStyles;