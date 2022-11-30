import React, { useState, useEffect } from "react";
// import FileUpload from "./components/FileUpload";
import axios from "axios";
import "./App.css";

const App = () => {
  useEffect(() => {
    callBackendAPI();
  }, []);

  const callBackendAPI = async () => {
    const res = await axios("/express_backend");
    console.log("res: ", res);
    // const response = await fetch("/express_backend");
    // const body = await response.json();

    // if (response.status !== 200) {
    //   throw Error(body.message);
    // }
    // return body;
  };
  return <h1>frontend</h1>;
};

export default App;
