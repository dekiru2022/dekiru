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
import { createAnswerQuestionnaire } from '../../../graphql/mutations';
import { API, Auth, graphqlOperation } from 'aws-amplify';

const labels_total = {
  1: 'トラブルがあった',
  2: '解決しなかった',
  3: '問題なく解決した',
  4: 'よかった',
  5: '非常によかった',
};

const labels_soudan = {
  1: 'とてもわかりにくかった',
  2: 'わかりにくかった',
  3: '普通だった',
  4: 'わかりやすかった',
  5: 'とてもわかりやすかった',
};
const labels_comu = {
  1: 'とても雑に対応された',
  2: '雑に対応された',
  3: '普通だった',
  4: '丁寧に対応してもらった',
  5: 'とても丁寧に対応してもらった',
};
const labels_time = {
  1: '解決しなかった',
  2: '時間がかかってしまった',
  3: '時間通りに解決した',
  4: '余裕を持って解決した',
  5: 'とても早く解決した',
};

function Survey_for_Q(props) {
  const [total, setTotal] = React.useState(5);
  const [h_total, setH_Total] = React.useState(5);
  const [sodan, setSodan] = React.useState(5);
  const [h_sodan, setH_Sodan] = React.useState(5);
  const [comu, setComu] = React.useState(5);
  const [h_comu, setH_Comu] = React.useState(5);
  const [time, setTime] = React.useState(5);
  const [h_time, setH_Time] = React.useState(5);
  const roomId = props.match.params.questionId;

  const initialFormState = { questionId: roomId};
  const [formData] = useState(initialFormState);


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


    let datetime = new Date().toISOString();
    let user1 = await Auth.currentAuthenticatedUser();
    formData.userId = user1.attributes.sub;
    // formData.categoryId = 1;
    formData.publicAnswerValue = total;
    formData.privateAnswerValue1 = sodan;
    formData.privateAnswerValue2 = comu;
    formData.privateAnswerValue3 = time;
    formData.createdAt = datetime;
    formData.updatedAt = datetime;
    // formData.deleteFlg = 0;
    console.log(formData);
    const r =  await API.graphql({ query: createAnswerQuestionnaire, variables: { input: formData } });
    console.log(r);
  }

  return (
    <div align="center">
      <Typography variant='h3'>相談者に向けての評価</Typography>
      <p><font color="gray">丁寧なコメントを心がけましょう。不快な言葉遣いは利用制限や退会処分になることがあります。</font></p>
      <hr></hr>
      <Typography variant='h4'>公開評価</Typography>
      <p><font color="gray">公開評価は解決者に通知されます。</font></p>
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

      {/* privateAnswerValue1 */}
      <Typography component="legend">相談はわかりやすかったですか？？</Typography>

      <Box sx={{ width: 400, display: 'flex', alignItems: 'center', }}>
        <Rating
          name="hover-feedback"
          size="small"
          value={sodan}
          onChange={(event, newValue) => {
            setSodan(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setH_Sodan(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {sodan !== null && (
          <Box sx={{ ml: 2 }}>{labels_soudan[h_sodan !== -1 ? h_sodan : sodan]}</Box>
        )}
      </Box>

      {/* privateAnswerValue2 */}
      <Typography component="legend">コミュニケーションは取れていましたか？</Typography>
      <Box sx={{ width: 400, display: 'flex', alignItems: 'center', }}>
        <Rating
          name="hover-feedback"
          size='small'
          value={comu}
          onChange={(event, newValue) => {
            setComu(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setH_Comu(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {comu !== null && (
          <Box sx={{ ml: 2 }}>{labels_comu[h_comu !== -1 ? h_comu : comu]}</Box>
        )}
      </Box>

      {/* privateAnswerValue3 */}
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

      <hr></hr>
      <p><font color="gray">相談を解決できなかった、力になれなかったと判断した場合は、下のボタンから辞退をすることが可能です。</font></p>
      <p><font color="gray">辞退をすることで、受け取る費用をキャンセルすることができます。</font></p>
      <p><font color="gray">その際、相談者からの評価は反映されません。</font></p>
      <Button variant="contained">辞退</Button>
      <hr></hr>
      <Typography variant='h5'>評価へのご協力ありがとうございます。</Typography>
      <Button variant="contained" onClick={inputCheck}>送信</Button>
    </div>
  )
}

export default Survey_for_Q;