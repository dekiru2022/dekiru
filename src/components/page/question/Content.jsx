import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateQuestion1 from "./postQuestion/CreateQuestion1";
import CreateQuestion2 from "./postQuestion/CreateQuestion2";
import CreateQuestion3 from "./postQuestion/CreateQuestion3";
//import { KEYS, setItem, getItem, removeItem } from "./LocalStorage";
import { Link  as LinkRouter } from 'react-router-dom';
import Box from '@mui/material/Box';

//TEST
import { categories } from '../../../database/categories_table';


function Content() {
  const steps = [
    'タイトル',
    '詳細',
    '確認項目'
  ];
  const [activeStep, setActiveStep] = useState(0);
  //フォームの入力値を管理する
  // const [formData, setFormData] = useState({ category_id: '', category:'', title:'', content:''});
  const [formData, setFormData] = useState({ category_id: 1, category:'', title:'', content:''});
  const [categoriesArray, setCategoriesArray] = useState(categories);

    
    useEffect(() => {
      getCategoryData();
      showUserData(1);
    },[]);
    
    //DBからカテゴリ一覧を取得
    const getCategoryData = () => {
      // axios
      //     .get('/api/categories')
      //     .then(response => {
      //         setCategoriesArray(response.data);
      //     })
      //     .catch((error) => {
      //         console.log('通信エラー: '+ error);
              
      //     });
    }
    const showUserData = (id) => {
      // axios
      //     .get('/api/users/' + id)
      //     .then(response => {
      //         console.log(response.data);
      //     })
      //     .catch((error) => {
      //         console.log('通信エラー: '+ error);
      //     });
    }
  
  //入力がされたら（都度）入力値を変更するためのfunction
  const inputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    formData[key] = value;
    if(key == 'category_id'){
      formData.category = categoriesArray[value-1].category;
    }
    let data = Object.assign({}, formData);
    setFormData(data);
  }
  
  //入力値を投げる
  const createQuestion = async() => {
    if(formData == ''){
      return;
    }
    // await axios
    //     .post('/api/questions', formData)
    //     .then((res) => {
    //         setFormData('');
    //         alert('質問を投稿しました！');
    //         handleReset();
    //       })
    //     .catch(error => {
    //       console.log(error);
    //     });
      }

      const handleNext = () => {
        console.log(activeStep)
        if(activeStep == 0){
          if(formData.category_id){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            //TEST
            formData.category_id = 1;
            formData.category = "高齢者";
          }
        }else if(activeStep == 1){
          if(formData.title && formData.content){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            //TEST
            formData.title = "薬の飲み合わせについての相談";
            formData.content = "風邪薬をガン治療中の母に飲ませても大丈夫でしょうか？";
          }
        }
      };
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
      const handleReset = () => {
        setActiveStep(0);
      };
      
      function getStepContent(stepIndex) {
          switch (stepIndex) {
              case 0:
                  return <CreateQuestion1 formData={formData} inputChange={inputChange} categoriesArray={categoriesArray}/>;
              case 1:
                  return <CreateQuestion2 formData={formData} inputChange={inputChange}/>;
              case 2:
                  return <CreateQuestion3 formData={formData} inputChange={inputChange}/>;
              default:
                  return 'Unknown stepIndex';
          }
      }

    return (
        <Grid container>
            <Grid item sm={2}/>
            <Grid item xs={12} lg={8} spacing={10} sx={{ justifyContent: 'center'}}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Typography sx={{ width: '100%'}}>{getStepContent(activeStep)}</Typography>

            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}} m={3}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                    戻る
                </Button>

                {activeStep === steps.length - 1
                ?<Button variant="contained" color="primary" onClick={createQuestion} component={LinkRouter} to="/indexResolver">送信</Button>
                : <Button xs={{width: '100'}} variant="contained" color="primary" onClick={handleNext}>相談する</Button>
                }
            </Box>

            </Grid>
        </Grid>
    )
}

export default Content