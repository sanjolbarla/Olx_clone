import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import VerificationCard from "./VerificationCard";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";

export default function VerifyPosts() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5002/adminhomepage")
      .then((response) => {
        setData(response["data"].reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <h3>Verify Posts</h3>
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
              return (
                <VerificationCard
                  key={index}
                  id={dataItem._id}
                  title={dataItem.title}
                  image={dataItem.image[0]}
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
