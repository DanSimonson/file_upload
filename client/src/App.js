import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [data, setData] = useState([]);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");

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

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      console.log("err", err.message);
    }
  };

  return (
    <div>
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
            onChange={handleChange}
          ></FormButton>
          <FormButton type="submit" value="Upload" />
        </FormDiv>
      </Form>
      {uploadedFile ? (
        <div>
          <div>
            <h3>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
