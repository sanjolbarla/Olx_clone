import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import Navbar from "./Navbar";
import MediaCard from "./Card";
import { connect } from "react-redux";

/*1: fetch data from backend
2: map the data in Card
3: use useffect */

function Home(props) {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");

  const callback = (childData) => {
    setData(childData);
    console.log("Searched data :", search);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5002/homepage")
      .then((response) => {
        setData(response["data"].reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar parentCallback={callback} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Container>
          <Row>
            {data.map((dataItem, index) => {
              console.log(props.email);
              return (
                <MediaCard
                  key={index}
                  id={dataItem._id}
                  title={dataItem.title}
                  price={dataItem.price}
                  uEmail={props.email}
                  email={dataItem.sellerEmail}
                  date={dataItem.date}
                  image={dataItem.image[0]}
                  city={dataItem.city}
                  state={dataItem.state}
                  description={dataItem.description}
                />
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStatetoProps)(Home);