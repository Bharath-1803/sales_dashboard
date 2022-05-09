import { makeStyles } from "@material-ui/core/styles";

export const headerStyles = makeStyles(() => ({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    width: "98%",
    backgroundColor: "#1e90ef",
    fontSize: "14px",
    height: "30%",
    margin: "20px 0px 15px 10px",
  },
  content: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "7% 2% 53% 38%",
    paddingLeft: "10px",
    fontSize: "14px",
    textAlign: "left",
    color: "#ffffff",
  },
  userInfo: {
    color: "greenYellow",
    fontSize: "20px",
  },
}));

export const graphStyles = makeStyles(() => ({
  searchContainer: {
    marginTop: "20px",
    width: "100%",
    textAlign: "center",
  },
  dropdown: {
    width: "100%",
    height: "40px",
    minWidth: "150px",
  },
}));
