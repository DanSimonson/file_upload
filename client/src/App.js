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
  color: white;
  padding: 20px 20px;
  margin: 5px 20px;
  cursor: pointer;
`;
const FormLabel = styled.label`
  padding: 0;
  margin: 5px 20px;
`;

const App = () => {
  const [sheet, setSheet] = useState([]);
  const [workSheet, setWorkSheet] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataSheet = XLSX.utils.sheet_to_json(workSheet);
    console.log("dataSheet: ", dataSheet);
    setSheet(dataSheet);
  };
  const readExcel = async (e) => {
    const file = e.target.files[0];
    console.log('file: ', file);
    const data = await file.arrayBuffer();
    /* data is an ArrayBuffer */
    const workbook = XLSX.read(data);
    console.log("workbook: ", workbook);
    const worksheetName = workbook.SheetNames[0];
    console.log("worksheet: ", worksheetName);
    //const worksheet = workbook.Sheets[worksheetName];
    setWorkSheet(workbook.Sheets[worksheetName])
    // console.log('worksheet: ', worksheet)
    // const dataSheet = XLSX.utils.sheet_to_json(worksheet);
    // console.log("dataSheet: ", dataSheet);
    // setSheet(dataSheet);
  };
  return (
    <>
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
      <SpreadSheet sheet={sheet} />
    </>
  );
};

// const App = () => {
// const [data, setData] = useState([]);
// const [file, setFile] = useState("");
// const [filename, setFilename] = useState("Choose File");
// const [uploadedFile, setUploadedFile] = useState({});
// const [message, setMessage] = useState("");

// useEffect(() => {
//   callBackendAPI();
// }, []);

// const callBackendAPI = async () => {
//   let temp = [];
//   try {
//     const res = await axios("/express_backend");
//     temp.push(res.data);
//     setData(temp);
//   } catch (err) {
//     console.log("err.message: ", err.message);
//   }
// };

// const handleChange = (e) => {
//   setFile(e.target.files[0]);
//   setFilename(e.target.files[0].name);
// };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const formData = new FormData();
//   formData.append("file", file);
//   try {
//     const res = await axios.post("/upload", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     const { fileName, filePath } = res.data;

//     setUploadedFile({ fileName, filePath });

//     setMessage("File Uploaded");
//   } catch (err) {
//     console.log("err", err.message);
//   }
// };

// return (
//   <div>
//     <h1>d</h1>
//   </div>
//  <div>
//   {data.map((item, idx) => (
//     <Wrapper key={idx}>
//       <h2>{item.message}</h2>
//     </Wrapper>
//   ))}
//   <Form onSubmit={handleSubmit}>
//     <FormDiv>
//       <FormLabel htmlFor="myfile">Select a file:</FormLabel>
//       <FormButton
//         type="file"
//         id="myfile"
//         name="myfile"
//         onChange={handleChange}
//       ></FormButton>
//       <FormButton type="submit" value="Upload" />
//     </FormDiv>
//   </Form>
//   {uploadedFile ? (
//     <div>
//       <div>
//         <h3>{uploadedFile.fileName}</h3>
//         <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
//       </div>
//     </div>
//   ) : null}
// </div>
//   );
// };

export default App;
