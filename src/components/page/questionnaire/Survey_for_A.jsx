import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
// Graphql インポート
import { createQuestionQuestionnaire as createQuestionQuestionnaireMutation } from '../../../graphql/mutations';
import { API, Auth, graphqlOperation } from 'aws-amplify';

const labels_total = {
  1: 'トラブルがあった',
  2: '解決しなかった',
  3: '問題なく解決した',
  4: 'よかった',
  5: '非常によかった',
};
const labels_time = {
  1: '解決しなかった',
  2: '時間がかかってしまった',
  3: '時間通りに解決した',
  4: '余裕を持って解決した',
  5: 'とても早く解決した',
};
const labels_naiyou = {
  1: 'とてもわかりにくかった',
  2: 'わかりにくかった',
  3: '普通だった',
  4: 'わかりやすかった',
  5: 'とてもわかりやすかった',
};
const labels_taiou = {
  1: 'とても雑に対応された',
  2: '雑に対応された',
  3: '普通だった',
  4: '丁寧に対応してもらった',
  5: 'とても丁寧に対応してもらった',
};
const labels_solution = {
  1: '低い',
  2: 'やや低い',
  3: '普通',
  4: 'やや高い',
  5: '高い',
};

function Survey_for_A(props) {
  const [total, setTotal] = React.useState(5);
  const [h_total, setH_Total] = React.useState(5);
  const [time, setTime] = React.useState(5);
  const [h_time, setH_Time] = React.useState(5);
  const [naiyou, setNaiyou] = React.useState(5);
  const [h_naiyou, setH_Naiyou] = React.useState(5);
  const [taiou, setTaiou] = React.useState(5);
  const [h_taiou, setH_Taiou] = React.useState(5);
  const [solution, setSolution] = React.useState(5);
  const [h_solution, setH_Solution] = React.useState(5);
  //const initialFormState = { title: '', content: '' }
  const [formData, setFormData] = useState([]);

  // 入力チェック
  async function inputCheck() {
    let result = window.confirm('相談を送信してもよろしいですか？');
    // OKボタン押下時
    if (result) {
      createQuestions();
      //window.location.href = '/indexResolver';
      // キャンセルボタン押下時
    } else {
      // 何も処理を行わない
    }

  }

  // データ送信
  async function createQuestions() {
    let user1 = await Auth.currentAuthenticatedUser();
    let datetime = new Date().toISOString();

    formData.userId = user1.attributes.sub;
    formData.questionId = "";
    // formData.categoryId = 1;
    formData.publicQuestionValue = total;
    formData.privateQuestionValue1 = time;
    formData.privateQuestionValue2 = naiyou;
    formData.privateQuestionValue3 = taiou;
    formData.privateQuestionValue4 = solution;

    formData.createdAt = datetime;
    formData.updatedAt = datetime;
    formData.deleteFlg = 0;
    console.log(formData);
    await API.graphql({ query: createQuestionQuestionnaireMutation, variables: { input: formData } });
  }

  return (
    <div align="center">
      <Typography variant='h3'>解決者に向けての評価</Typography>
      <p><font color="gray">丁寧なコメントを心がけましょう。不快な言葉遣いは利用制限や退会処分になることがあります。</font></p>
      <hr></hr>
      <Typography variant='h4'>公開評価</Typography>
      <p><font color="gray">公開評価は解決者に通知されます。</font></p>
      <p><font color="gray">評価が１,2の場合は7割の支払いとなります。評価３以上の場合は100%支払いとなります。</font></p>
      <p><font color="gray">しかし、回答者が辞退した場合は支払いはなしになります。</font></p>
      <Typography variant='h5'>総合評価</Typography>

      <Box sx={{ width: 400, display: 'flex', alignItems: 'center', }}>
        <Rating
          name="hover-feedback"
          size="large"
          value={total}
          onChange={(event, newValue) => {
            setTotal(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setH_Total(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {total !== null && (
          <Box sx={{ ml: 2 }}>{labels_total[h_total !== -1 ? h_total : total]}</Box>
        )}
      </Box>

      <hr></hr>
      <Typography variant='h4'>非公開評価</Typography>
      <p><font color="gray">非公開評価は相手に通知されません。</font></p>

      {/* privateQuestionValue1 */}
      <Typography component="legend">希望した時間通りに問題は解決しましたか？</Typography>

      <Box sx={{ width: 400, display: 'flex', alignItems: 'center', }}>
        <Rating
          name="hover-feedback"
          size="small"
          value={time}
          onChange={(event, newValue) => {
            setTime(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setH_Time(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {time !== null && (
          <Box sx={{ ml: 2 }}>{labels_time[h_time !== -1 ? h_time : time]}</Box>
        )}
      </Box>

      {/* privateQuestionValue2 */}
      <Typography component="legend">解答内容はわかりやすかったですか？</Typography>

      <Box sx={{ width: 400, display: 'flex', alignItems: 'center', }}>
        <Rating
          name="hover-feedback"
          size='small'
          value={naiyou}
          onChange={(event, newValue) => {
            setNaiyou(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setH_Naiyou(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {time !== null && (
          <Box sx={{ ml: 2 }}>{labels_naiyou[h_naiyou !== -1 ? h_naiyou : naiyou]}</Box>
        )}
      </Box>

      {/* privateQuestionValue3 */}
      <Typography component="legend">コミュニケーションは取れていましたか？</Typography>
      <Box sx={{ width: 400, display: 'flex', alignItems: 'center', }}>
        <Rating
          name="hover-feedback"
          size='small'
          value={taiou}
          onChange={(event, newValue) => {
            setTaiou(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setH_Taiou(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {time !== null && (
          <Box sx={{ ml: 2 }}>{labels_taiou[h_taiou !== -1 ? h_taiou : taiou]}</Box>
        )}
      </Box>

      {/* privateQuestionValue3 */}
      <Typography component="legend">専門性の高さはどのくらいでしたか？</Typography>

      <Box sx={{ width: 400, display: 'flex', alignItems: 'center', }}>
        <Rating
          name="hover-feedback"
          size='small'
          value={solution}
          onChange={(event, newValue) => {
            setSolution(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setH_Solution(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {time !== null && (
          <Box sx={{ ml: 2 }}>{labels_solution[h_solution !== -1 ? h_solution : solution]}</Box>
        )}
      </Box>

      <hr></hr>
      <Typography variant='h5'>評価へのご協力ありがとうございます。</Typography>
      <Button variant="contained" onClick={inputCheck}>送信</Button>
    </div>
  )
}

export default Survey_for_A;