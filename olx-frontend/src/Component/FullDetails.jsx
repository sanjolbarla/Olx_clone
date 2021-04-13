import React, {useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './FullDetails.css';
import {useLocation} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { Formik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from "material-ui-snackbar-provider";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

function FullDetails(props) {
    const [id, setId] = useState("")
    const [state, setState] = useState([]);  
    
    const snackbar = useSnackbar();
    const history = useHistory();
    
        /*{
          "_id": "1",
          "title": "Nike Shoes",
          "image": [
              "https://www.upsieutoc.com/images/2020/06/27/img1.jpg",
              "https://www.upsieutoc.com/images/2020/06/27/img2.jpg",
              "https://www.upsieutoc.com/images/2020/06/27/img3.jpg",
              "https://www.upsieutoc.com/images/2020/06/27/img4.jpg"
            ],
          "description": "UI/UX designing, html css tutorials",
          "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
          "price": 23,
          "colors":["red","black","crimson","teal"],
          "count": 1
        }*/

    //console.log(props.location.search.slice(1));
    const location = useLocation();
    useEffect(() => {
      const tid = location.search.slice(1);
      setId(decodeURI(tid));
      const productId = {
        productID: id
      }
      console.log(id);

      axios({
        method: "post",
        url: "http://localhost:5002/getProduct",
        data: productId,
        headers: { "Content-Type": "application/json" },
      })  
      .then(res => {
        console.log(res.data.sellerName);
        let temp = [];
        temp.push(res.data)
        setState(temp);
      }).catch(err => {
        console.log(err);
      })
    },[location, id])


    return(
      <div>
      <Navbar />
        <div className="app">
          {
            state.map((item, index)=>(
              <div className="details" key={index}>
              <div className="big-img">
                <Carousel>
                    {item["image"].map((value, ind) => {
                        return <img key={ind} src={"http://localhost:5000/images/"+value} alt=""/>
                        })
                    }
                </Carousel>
              </div>
              <div className="box">
                <div className="row" style={{marginBottom:20}}>
                  <h2>{item.title}</h2>
                  <span style={{color: "grey", float: "right", fontSize:13, fontWeight: "500", marginTop:15}}>{item.date}</span>
                </div>
                <div className="row" style={{float: "right"}}>
                  <span style={{fontWeight: "bold"}}>Rs.{item.price}</span>
                </div>
                <p>Sold By: {item.sellerName}</p>
                <p>{item.description}</p>
                <br/>
                
                <div style={{fontSize: 15}}>
                  <div style={{fontWeight: "bold"}}>Contact Info:</div>
                  <div style={{marginLeft:10}}>
                    <span>Email: </span>
                    <span>{item.sellerEmail}</span>
                  </div>
                  <div style={{marginLeft:10}}>
                    <span>Location: </span>
                    <span>{item.city},{item.state}</span>
                  </div>
                  <div style={{marginLeft:10}}>
                    <span>Contact no: </span>
                    <span>{item.phone}</span>
                  </div>
                </div>
              </div>
              <div>
                {
                item["comment"].map((value, ind) => {
                  return (
                    <Card key={ind} style={{minWidth: 700, maxHeight: 200, marginBottom:10}}>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom color="textSecondary">
                            {value.commentBy}
                          </Typography>
                          <Typography variant="body2">
                            {value.commentBody}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })
                }
              </div>
            </div>
            ))        
        }
        <div>
          <Formik
            initialValues={{
              comment: "",
            }}
            onSubmit={async (values) => {
              //let formData = new FormData();

              const commentData = {
                id: id,
                commentBy: props.fullName,
                commentBody: values.comment,
              }
              console.log(commentData);

              
  
              //formData.append("comment", values.comment);
              axios({
                method: "post",
                url: "http://localhost:5002/addComment",
                data: commentData,
                headers: { "Content-Type": "application/json" },
              })
                .then(res => {
                  if(res.data.status === "Success"){
                    snackbar.showMessage(res.data.message, "Success");
                    window.location.reload();
                  } else {
                    snackbar.showMessage(
                      res.data.message,
                      "Try Again",
                      () => {
                        window.location.reload();
                      }
                    );
                  }
                })
                .catch(function (response) {
                  snackbar.showMessage(
                    response,
                    "Try Again",
                    () => {
                      window.location.reload();
                    }
                  );
                });
            }}
            validationSchema={yup.object().shape({
              comment: yup.string().required("Required"),
            })}
          >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
          }) => (
          <form onSubmit={handleSubmit}>
          <div>
          <TextField
            style={{ float:"center", marginLeft: "15%", marginBottom: "1%", minWidth:"70%" }}
            placeholder="Comment Here!"
            multiline
            rows={1}
            margin="normal"
            variant="outlined"
            id="comment"
            name="comment"
            value={values.comment}
            onChange={handleChange}
            error={touched.comment && Boolean(errors.comment)}
            helperText={touched.comment && errors.comment}
          />
          </div>
          <div>
          <Button 
            color="primary" 
            variant="contained" 
            style={{marginLeft: "77.5%", marginBottom: "1%"}}
            type="submit"
          >
            Submit
          </Button>
          </div>
          </form>
          )}
          </Formik>
        </div>
        <div>
            
        </div>  
      </div>
      </div>
    );
}

const mapStatetoProps = (state) => ({
  fullName: state.user.fullName,
});

export default connect(mapStatetoProps)(FullDetails);