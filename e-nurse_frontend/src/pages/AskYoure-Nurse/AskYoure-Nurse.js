import { useRef, useState, useEffect } from 'react'
// import "bootstrap/dist/css/bootstrap.css";

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Layout from '../../components/layout/Layout';
import { AlertContex } from "../../context/AlertContex"



function AskNurse() {
  const [isValid, setIisValid] = useState(false);
  const { toggleOn } = React.useContext(AlertContex)

  const [inputValue, setInputValue] = useState("");
  const Drug = useRef("");

  useEffect(() => {
    Drug.current = inputValue;
  });
  // console.log(Drug)


  const apiKey = 'Bearer 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';
  const prompt = `${Drug.current} drug is used for`;
  const prompt2 = `${Drug.current} drug should be taken at`;
  const maxTokens = 70;

  const fetchCompletions = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey
        },
        body: JSON.stringify({
          prompt,
          max_tokens: maxTokens
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      // console.error(error);
    }
  };


  const fetchCompletions2 = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiKey
        },
        body: JSON.stringify({
          prompt: prompt2,
          max_tokens: maxTokens
        })
      });
      const data2 = await response.json();
      return data2;
    } catch (error) {
      // console.error(error);
    }
  };

  const [completions, setCompletions] = useState(null);

  const [completions2, setCompletions2] = useState(null);

  const handleButtonClick = async () => {
    const data = await fetchCompletions();
    setCompletions(data);
  };

  const handleButtonClick2 = async () => {
    const data2 = await fetchCompletions2();
    setCompletions2(data2);
  };

  // console.log(completions?.choices)

  const checkDrug = async (inputValue) => {
    inputValue = Drug.current;
    try {
      const response = await fetch(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${Drug.current}&allsrc=1`);
      const data = await response.json();
      if (data.idGroup.rxnormId[0] > 0) {
        return true;
      }
      return false;
    } catch (error) {
      // console.error(error);
      return false;
    }
  };
  const handleDrugvalidation = async () => {
    const valid = await checkDrug(inputValue);
    if (valid) {
      setIisValid(true)
      const data = await fetchCompletions();
      setCompletions(data);
    } else {
      setIisValid(false)
      toggleOn("Invalid drug name. Please enter a valid FDA approved drug name.")

    }
  };
  console.log(isValid);



  return (
    <>
      {/* <Layout >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 500,
              height: 500,
            },
          }}>

          <Paper elevation={3}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField sx={{ margin: "5px" }} id="outlined-basic" value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} label="what drug do you want to ask about?" variant="outlined" style={{ "width": "350px" }} />
            </Box>
            <div>

            </div>
            <Stack spacing={2} direction="row">

              <Button variant="contained" sx={{ marginLeft: "5px" }} onClick={() => {
                handleButtonClick();
                handleDrugvalidation();
              }}>My Drug's Function</Button>
              <Button variant="contained" onClick={() => {
                handleButtonClick2();
                handleDrugvalidation();
              }}>My Drug's Timings</Button>

            </Stack>
            {isValid && completions && (
              <Paper elevation={3} style={{
                "height": "150px",
                "width": "80%"
              }}>{JSON.stringify(!isValid ? "Invalid drug name. Please enter a valid FDA approved drug name." : completions?.choices[0].text, null, 2)}</Paper>

            )}
            {completions2 && (
              <Paper elevation={3} style={{
                "height": "150px",
                "width": "80%"
              }}>{JSON.stringify(!isValid ? "Invalid drug name. Please enter a valid FDA approved drug name." : completions2?.choices[0].text, null, 2)}</Paper>

            )}
          </Paper>

        </Box>
      </Layout> */}


<div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="mt-0 mb-2">Ask e-Nurse</h1>
            <p>get more information on a specific drug</p>
          </div>
        </div>
      </div>

      <div className="row mb-3 d-flex align-items-center" >
                  <div className="col-9">
                    <input
                      type='text'
                      value={inputValue}
                      className={`form-control `}
                      placeholder="Drug Name ..."
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
      </div>
      

      <div className="row mb-4">
              <div className="col-9">
              <button type="button" className="btn btn-info" onClick={() => {
                handleButtonClick();
            handleDrugvalidation();
            handleButtonClick2();
          }}>Get drug info</button>{' '}
           {/* <button type="button" className="btn btn-info" onClick={() => {
                handleButtonClick2();
                handleDrugvalidation();
              }}>My Drug's Timing</button> */}
        </div>
        {isValid && completions && (
        <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h3 className="mt-0 mb-2">Drug's function</h3>
            <div className="row mb-3 d-flex align-items-center"><p>{JSON.stringify(isValid && completions?.choices[0].text, null, 2)}</p></div>
          </div>
        </div>
      </div>
        )}
          
            
          {isValid && completions2 && (
        <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h3 className="mt-0 mb-2">Drug's Timing</h3>
            <div className="row mb-3 d-flex align-items-center " ><p>{JSON.stringify(isValid && completions2?.choices[0].text, null, 2)}</p></div>
          </div>
        </div>
      </div>
        )}
        
           
          </div>
    </>


  )
}
export default AskNurse