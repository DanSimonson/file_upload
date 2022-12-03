import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./App.css";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center
  align-items: center
  font-size: 18px;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center
  align-items: center
`;
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const FormButton = styled.input`
  background-color: orange;
  border: none;
  border-radius: 2%;
  text-decoration: none;
  color: #222;
  padding: 20px 20px;
  margin: 5px 20px;
  cursor: pointer;
`;
const FormLabel = styled.label`
  padding: 0;
  margin: 5px 20px;
  font-size: 1rem;
`;

const App = () => {
  const [data, setData] = useState([]);
  const [fileError, setFileError] = useState(false);

  useEffect(() => {
    callBackendAPI();
  }, []);

  

  const readExcel = async (e) => {
    //check for xlsx extension of a spreadsheet
    const str = e.target.files[0].name;
    const strCheck = "xlsx";
    if (str.indexOf(strCheck) === -1) {
      setFileError(true);
      alert("Error: File is not of type xlsx");
    } else {
      //dynamically add html table
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(e.target.files[0]);
      fileReader.onload = () => {
        let dataSht = new Uint8Array(fileReader.result);
        let wb = XLSX.read(dataSht, { type: "array" });
        let ws = wb.SheetNames[0];
        let htmlStr = XLSX.write(wb, {
          sheet: `${ws}`,
          type: "binary",
          bookType: "html",
        });
        
        document.getElementById("wrapper").innerHTML += htmlStr;
      };
    }
  };

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
    <>
      {data.map((item, idx) => (
        <Wrapper key={idx}>
          <h2>{item.message}</h2>
        </Wrapper>
      ))}
      <Form>
        <FormDiv>
          <FormLabel htmlFor="myfile">Select an Excel Spreadsheet: </FormLabel>
          <FormButton
            type="file"
            id="myfile"
            name="myfile"
            onChange={(e) => readExcel(e)}
          ></FormButton>
        </FormDiv>
      </Form>
      <div id="wrapper"></div>
    </>
  );
};

export default App;
