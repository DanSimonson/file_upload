import React, { useState, useEffect } from "react";
// import FileUpload from "./components/FileUpload";
import axios from "axios";
import "./App.css";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center
  align-items: center
  min-height: 100vh;
`;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    callBackendAPI();
  }, []);

  const callBackendAPI = async () => {
    let temp = [];
    try {
      const res = await axios("/express_backend");
      temp.push(res.data);
      setData(temp);
    } catch (err) {
      console.log("err.message: ", err.message);
    }
  };

  return (
    <div>
      {data.map((item, idx) => (
        <Wrapper key={idx}>
          <h2>{item.message}</h2>
        </Wrapper>
      ))}
    </div>
  );
};

export default App;
