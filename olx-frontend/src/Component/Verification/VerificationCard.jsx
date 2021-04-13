import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "material-ui-snackbar-provider";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    maxWidth: 300,
    margin: "20px 20px",
    // maxHeight: 275,
    // marginTop: 20,
    // marginBottom: 20,
  },
  media: {
    height: 180,
  },
});

export default function VerificationCard(props) {
  const history = useHistory();
  const snackbar = useSnackbar();
  const classes = useStyles();

  function handleClick() {
    console.log(props.title);
    const product = {
      title: props.title,
      product_id: props.id,
    };
    console.log(product);

    axios({
      method: "post",
      url: "http://localhost:5002/approveProduct",
      data: product,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (res) {
        //handle success
        console.log(res.data);
        if (res.data.status === "success") {
          snackbar.showMessage("Verified Succesfully", "Reload", () => {
            history.push("/verify");
          });
        }
        // if (res.data.status === "success") {
        //   const user = res.data;
        //   dispatch(fetchUserSuccess(user));
        //   localStorage.setItem("user", JSON.stringify(res.data));

        //   history.push("/secret");
        // } else {
        //   // alert("");
        //   // history.push("/login");
        //   snackbar.showMessage(
        //     "Invalid email-id or password",
        //     "Try Again",
        //     () => {
        //       history.push("/login");
        //     }
        //   );
        // }
      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={"http://localhost:5000/images/" + props.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClick}>
          Approve
        </Button>
        {/* <Button
          size="small"
          color="primary"
          onClick={() => {
            alert(props.title);
          }}
        >
          Deny
        </Button> */}
      </CardActions>
    </Card>
  );
}
