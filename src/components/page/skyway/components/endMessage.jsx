import React,{ useContext } from "react";
import { SkywayStoreContext } from "../Skyway";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link as LinkRouter } from 'react-router-dom';

export default function EndMessage(){
  const {
    isHost, questionId
  } = useContext(SkywayStoreContext);
  return(
    <Box sx={{position: "fixed", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70vw', height: '70vh', backgroundColor: '#FFF'}} >
      <Stack justifyContent="space-evenly" alignItems="center" direction="column" sx={{ height: "100%"}}>
      制限時間が終了しました。評価アンケートにご協力ください。
      {//isHost == 1
      <Button size='large' variant='contained' color="success" component={LinkRouter} to={`/questionnaire/${questionId}/questioner`} >回答する</Button>
      // :<Button size='large' variant='contained' color="success" component={LinkRouter} to={`/questionnaire/${questionId}/respondent`} >回答する</Button>
      }
      </Stack>
    </Box>
  )
}