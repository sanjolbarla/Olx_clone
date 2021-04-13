import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';

import { Col } from "reactstrap";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    minHeight: 275,
    marginTop: 20,
    marginBottom: 20,
    padding: 2,
    borderRadius: 10
  },
  media: {
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
});

function MediaCard(props) {
  const classes = useStyles();
  const history = useHistory();

  const [favorite, setFavotrite] = useState()

  const clickme = () => {
    history.push({
      pathname: "/sub",
      search: props.id,
    });
    //console.log(event);
    // alert("Card Clicked!");
  };

  useEffect(() => {
    const userEmail= {
      email: props.uEmail
    }
    axios({
      method: "post",
      url: "http://localhost:5001/expFavorite",
      data: userEmail,
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        for(var i =0 ;i<res["data"].length;i++){
          if(props.id === res.data[i]){
            setFavotrite(true)
          }
        } 
      })
      .catch(function (response) {
        console.log(response);
      });
  })

  const handleClick = () => {
    let favData;
    if(!favorite){
      favData = {
        email: props.uEmail,
        product_id: props.id,
        action: "ADD"
      }
      setFavotrite(!favorite)
    } else {
      favData = {
        email: props.uEmail,
        product_id: props.id,
        action: "REMOVE"
      }
      setFavotrite(!favorite)
    }
    axios({
      method: "post",
      url: "http://localhost:5001/editFavorite",
      data: favData,
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        if(res.data.status === "success"){
          console.log(res.data.status);
        } else {
          console.log(res.data.error);
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  let icon;

  if(favorite){
    icon=(<FavoriteIcon aria-label="add to favorites"
    style={{ float: "right", marginTop: 6, fill:"red"}}
    onClick={() => {
      handleClick()
    }} />)
  }else{
    icon=(<FavoriteBorderIcon aria-label="add to favorites"
    style={{ float: "right", marginTop: 6}}
    onClick={() => {
      handleClick()
    }} />)
  }

  // const favoriteColor = () => {
  //   if(favorite) return "red";
  //   else return "black";
  // }

  return (
    <Col xs="3">
      <Card
        className={classes.root}
        /*onClick={() => {
          clickme();
        }}*/
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={"http://localhost:5000/images/" + props.image}
            title={props.title}
            onClick={() => {
              clickme();
            }}
          />
          <CardContent>
            <Typography style={{fontSize: 12}}>
              <span style={{color: "red"}}>Rs.{props.price}</span>
              <div style={{ float: "right", color:"grey" }}>
                {props.date}
              </div>
            </Typography>
            <Typography gutterBottom variant="h5" component="span">
              <span 
                onClick={() => {
                  clickme();
                }}
              >
                {props.title}
              </span>
              {
                // <FavoriteIcon
                //   aria-label="add to favorites"
                //   style={{ float: "right", marginTop: 6, color: favoriteColor()}}
                //   onClick={() => {
                //     handleClick()
                //   }}  
                // />
                icon
              }
            </Typography>

            <Typography variant="body2" color="textSecondary">
              {props.description.substring(0, 27)+"..."}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Typography variant="subtitle2">
            {props.city},{props.state}
          </Typography>
        </CardActions>
      </Card>
    </Col>
  );
}

export default MediaCard;