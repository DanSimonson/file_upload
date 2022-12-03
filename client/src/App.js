import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./App.css";
import styled from "styled-components";
import SpreadSheet from "./components/SpreadSheet";

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
`;

const App = () => {
  const [data, setData] = useState([]);
  const [sheet, setSheet] = useState([]);
  const [workSheet, setWorkSheet] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [fileError, setFileError] = useState(false);

  useEffect(() => {
    callBackendAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(fileError){
      return;
    }
    try {
      const dataSheet = XLSX.utils.sheet_to_json(workSheet);
      setSheet(dataSheet);
      if (dataSheet) {
        setIsOpen(true);
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const readExcel = async (e) => {
    
    const str = e.target.files[0].name;
    const strCheck = "xlsx";
    if (str.indexOf(strCheck) === -1) {
      setFileError(true)
      alert("Error: File is not of type xlsx -- refresh page");
    } else {
      const file = e.target.files[0];
      const data = await file.arrayBuffer();
      /* data is an ArrayBuffer */
      const workbook = XLSX.read(data);
      const worksheetName = workbook.SheetNames[0];
      setWorkSheet(workbook.Sheets[worksheetName]);
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
      <Form onSubmit={handleSubmit}>
        <FormDiv>
          <FormLabel htmlFor="myfile">Select a file:</FormLabel>
          <FormButton
            type="file"
            id="myfile"
            name="myfile"
            onChange={(e) => readExcel(e)}
          ></FormButton>
          <FormButton type="submit" value="Upload" />
        </FormDiv>
      </Form>
      <div>
        <SpreadSheet isOpen={isOpen} sheet={sheet} />
      </div>
    </>
  );
};

export default App;
