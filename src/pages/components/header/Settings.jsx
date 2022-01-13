import React, { useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BackImg from '../../images/DEKIRU-logo1.jpg';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Setting(){
  const [value, setValue] = React.useState(0);

  const handleChange1 = (event1, newValue) => {
    setValue(newValue);
  };

  const [tanka, setTanka] = React.useState('');
  const handleChange2 = (event2) => {
    setTanka(event2.target.value);
  };

  const [ichi_info, setIchi_info] = React.useState('');
  const handleChange3 = (event3) => {
    setIchi_info(event3.target.value);
  };

  const [kokai_info, setKokai_info] = React.useState('');
  const handleChange4 = (event4) => {
    setKokai_info(event4.target.value);
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [user, setUser] = useState('');

  return(
  <div>
    <Container>
    <Typography align='right' variant='h3'>設定</Typography>
    <Divider />
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs value={value} onChange={handleChange1} aria-label="basic tabs example">
    <Tab label="アカウント設定" {...a11yProps(0)} />
    <Tab label="本人確認" {...a11yProps(1)} />
    <Tab label="資格" {...a11yProps(2)} />
    <Tab label="通知設定" {...a11yProps(3)} />
    <Tab label="支払い関係" {...a11yProps(4)} />
    <Tab label="秘密保持契約" {...a11yProps(5)} />
    <Tab label="位置情報" {...a11yProps(6)} />
    <Tab label="公開設定" {...a11yProps(7)} />
  </Tabs>
</Box>
{/* タブ１つ目 */}
<TabPanel value={value} index={0}>
<Paper elevation={3}>
  <Grid container spacing={3} >
    <Grid item xs={5}>
      <Typography variant='h4'>ビデオチャット</Typography>
    </Grid>
    <Grid item xs={7}>
      <Typography>背景のぼかし<Switch {...label} /></Typography>
      <Divider/>
      <Typography>プロフィール画像の選択</Typography>
      <img src={BackImg} alt='BackImg' width={200} align='middle'/><Button variant="outlined">画像をアップロード</Button><Button disabled variant="contained">保存</Button>
    </Grid>
  </Grid>
</Paper>
<Paper elevation={3}>
  <Grid container spacing={3} >
    <Grid item xs={5}>
      <Typography variant='h4'>ブロック</Typography>
    </Grid>
    <Grid item xs={7}>
      <Typography>ブロックしたユーザー<Button variant="outlined">確認する</Button></Typography>
    </Grid>
  </Grid>
</Paper>
<Paper elevation={3}>
  <Grid container spacing={3} >
    <Grid item xs={5}>
      <Typography variant='h4'>退会</Typography>
    </Grid>
    <Grid item xs={7}>
      <Typography>あなたのアカウントを削除します。この操作は取り消しできません。</Typography>
      <Button variant="outlined" color='error'>退会する</Button>
    </Grid>
  </Grid>
</Paper>
</TabPanel>
{/* タブ２つ目 */}
<TabPanel value={value} index={1}>
  <Paper elevation={3}>
      <Grid container spacing={3} >
        <Grid item xs={5}>
          <Typography variant='h4'>本人確認</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>本人確認を行うことで、〇〇が可能になります（要検討）</Typography>
          <Typography>本人確認書類をご用意の上、アップロードボタンを押してください。</Typography>
          <Button variant="outlined">アップロード</Button>
        </Grid>
      </Grid>
    </Paper>
</TabPanel>
{/* タブ3つ目 */}
<TabPanel value={value} index={2}>
  <Paper elevation={3}>
    <Grid container spacing={3} >
      <Grid item xs={5}>
        <Typography variant='h4'>新規資格登録</Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography>新規に資格を登録する際は、「登録する」ボタンを押してください。</Typography>
        <Button variant="outlined">登録する</Button>
      </Grid>
    </Grid>
  </Paper>
  <Paper elevation={3}>
    <Grid container spacing={3} >
      <Grid item xs={5}>
        <Typography variant='h4'>資格編集</Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography>登録済みの資格の確認・編集・削除を行います</Typography>
        <Button variant="outlined">確認する</Button>
      </Grid>
    </Grid>
  </Paper>
</TabPanel>
{/* タブ4つ目 */}
<TabPanel value={value} index={3}>
  <Paper elevation={3}>
      <Grid container spacing={3} >
        <Grid item xs={5}>
          <Typography variant='h4'>プッシュ通知設定</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>プッシュ通知のON/OFF<Switch {...label} /></Typography>
        </Grid>
      </Grid>
    </Paper>
    <Paper elevation={3}>
      <Grid container spacing={3} >
        <Grid item xs={5}>
          <Typography variant='h4'>メール通知設定</Typography>
        </Grid>
        <Grid item xs={7}>
        <Typography>メール通知のON/OFF<Switch {...label} /></Typography>
        </Grid>
      </Grid>
    </Paper>
</TabPanel>
{/* 支払い関係タブ */}
<TabPanel value={value} index={4}>
  <Paper elevation={3}>
      <Grid container spacing={3} >
        <Grid item xs={5}>
          <Typography variant='h4'>カード情報</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>クレジットカードの登録・削除を行います</Typography>
          <Button variant="outlined">登録</Button><Button variant="outlined">削除</Button>
        </Grid>
      </Grid>
    </Paper>
    <Paper elevation={3}>
      <Grid container spacing={3} >
        <Grid item xs={5}>
          <Typography variant='h4'>pay口座</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>pay口座の登録・削除を行います</Typography>
          <Button variant="outlined">登録</Button><Button variant="outlined">削除</Button>
        </Grid>
      </Grid>
    </Paper>
    <Paper elevation={3}>
      <Grid container spacing={3} >
        <Grid item xs={5}>
          <Typography variant='h4'>チケット</Typography>
        </Grid>
        <Grid item xs={7}>
        <Typography>チケット</Typography>
        <Button variant="outlined">確認</Button>
        </Grid>
      </Grid>
    </Paper>
    <Paper elevation={3}>
      <Grid container spacing={3} >
        <Grid item xs={5}>
          <Typography variant='h4'>ポイント</Typography>
        </Grid>
        <Grid item xs={7}>
        <Typography>ポイント</Typography>
        <Button variant="outlined">確認</Button>
        </Grid>
      </Grid>
    </Paper>
    <Paper elevation={3}>
      <Grid container spacing={3} >
        <Grid item xs={5}>
          <Typography variant='h4'>料金単価設定</Typography>
        </Grid>
        <Grid item xs={7}>
        <Typography>10分あたりの値段を設定できます。</Typography>
        <FormControl fullWidth>
          <InputLabel id="tanka">値段</InputLabel>
          <Select
            labelId="nedan"
            id="nedan"
            value={tanka}
            label="nedan"
            onChange={handleChange2}
          >
            <MenuItem value={10}>￥10</MenuItem>
            <MenuItem value={20}>￥20</MenuItem>
            <MenuItem value={30}>￥30</MenuItem>
          </Select>
        </FormControl>
        </Grid>
      </Grid>
    </Paper>
</TabPanel>
{/* 秘密保持契約 */}
<TabPanel value={value} index={5}>
  <Paper elevation={3}>

  <Box sx={{ width: '100%' }}>
    
    <head>

    <title>秘密保持契約書</title>
    </head>
    
    <body>
    <h1 style={{'text-align':'center'}}>秘密保持契約書（NDA）</h1>

    <h4 style={{'padding-top':'3em'}}>秘密保持契約（NDA）とは</h4>
    <div>
    秘密保持契約（NDA）とは、トークルームや見積もり依頼・メッセージ等の非公開のやりとりでお互いが知り得た秘密情報を第三者に漏らさないことを定める契約です。
    </div>

    <div style={{'padding-bottom':'1em'}}>
    <ul>
    <li>※本人確認情報が更新された場合、契約締結済み情報も自動的に更新されます。</li>
    </ul>
    </div>

    <div style={{'padding-bottom':'1em'}}>
    <h4>契約違反をした場合</h4>
    <div>
    本契約に違反すると、8条に基づき損害賠償を請求させていただく場合がございますので、契約の遵守をお願いいたします。
    </div>
    </div>

    <h4 style={{'padding-top':'1em'}}>秘密保持契約書</h4>
    <div style={{'padding-bottom':'5em'}}>
    ユーザー名（以下「甲」という）と株式会社コスミック（以下「乙」という）とは、両当事者が開示する情報の取り扱いについて、下記のとおりに契約を締結します。
    </div>
    
    <div style={{'overflow':'scroll','height':'500px','border':'solid 2px black'}}>

    <h5 style={{'padding-top':'1em'}}>第1条(目的)</h5>
    <div style={{'padding-bottom':'2em'}}>
    本契約は、甲が乙のサービスを利用するにあたり、甲または乙がそれぞれ保有する情報を、相手方に提供または開示する際の条件を定めることを目的とします。   
    </div>
    
    <h5>第2条(機密情報)</h5>
    <div>
    1. 本契約において機密情報とは、甲または乙が本契約の有効期間中に提供または開示された、次の各号に定める情報をいいます。
    </div>
    <div>
    <ul>
    <li>乙のサービスを利用して甲が提供する役務等の購入者（以下「サービス購入者」という）に関する一切の情報</li>
    <li>サービス購入者が、甲に対して相談または依頼した事実、または、甲が提供する役務等を購入した事実</li>
    <li>甲が提供する役務等の購入の前後を問わず、サービス購入者から受領した一切の情報</li>
    </ul>
    </div>

    <div>
    2.	前項の規定にかかわらず、次の各号に定める情報は、機密情報から除外するものとします。
    </div>
    <div>
    <ul>
    <li>開示者から開示を受ける前に、被開示者が正当に保有していたことを証明できる情報</li>
    <li>開示者から開示を受ける前に、公知となっていた情報</li>
    <li>開示者から開示を受けた後に、被開示者の責に帰すべからざる事由により公知となった情報</li>
    <li>被開示者が、正当な権限を有する第三者から機密保持義務を負うことなく正当に入手した情報</li>
    <li>被開示者が、開示された情報によらず独自に開発した情報</li>
    </ul>
    </div>

    <h5>第3条(機密保持)</h5>
    <div style={{'padding-bottom':'1em'}}>
    1. 甲は、機密情報を掲載した画面を閲覧する際は、第三者に閲覧されないよう注意を払うとともに、閲覧した情報を機密として保持し、第三者への開示または漏洩をしてはならないものとします。
    </div>
    <div style={{'padding-bottom':'1em'}}>
    2. 甲および乙は、相手方から開示された機密情報を機密として保持し、事前に開示者の書面による承諾を得ることなく、第三者への開示または漏洩、乙のサービス上で利用する以外の目的での使用をしてはならないものとします。
    </div>
    <div style={{'padding-bottom':'1em'}}>
    3. 甲および乙は、相手方から開示された機密情報について、自己の役員または使用人のうち、当該機密情報を業務遂行上知る必要のある者に限定して開示するものとし、それ以外の役員または使用人に対して開示または漏洩してはならないものとします。
    </div>
    <div style={{'padding-bottom':'2em'}}>
    4. 甲および乙は、相手方から開示された機密情報について、乙のサービス上で、業務遂行上必要な範囲で複製することができるものとします。ただし、複製した情報も機密情報として取り扱わなければならないものとします。
    </div>

    <h5>第4条(被開示者の責務)</h5>
    <div>
    1. 甲および乙は、相手方から開示された機密情報を知得した自己の役員または使用人（機密情報を知得後退職した者も含む）に対し、本契約に定める機密保持契約の順守を徹底させるものとします。
    </div>
    <div style={{'padding-bottom':'2em'}}>
    2. 甲および乙は、相手方から開示された機密情報を知得後に退職した自己の役員または使用人の本契約条項に違反する行為について、相手方に対して一切の責を負うものとします。
    </div>

    <h5>第5条(第三被開示者)</h5>
    <div>
    1. 甲及び乙は、相手方の事前の承諾に基づき、第三者に相手方の機密情報を開示したときは（以下、当該第三者を「第三被開示者」という。）、第三被開示者に対し、本契約に基づき自己が負うのと同一の責任ないし義務を課し、遵守させなくてはならないものとします。
    </div>
    <div style={{'padding-bottom':'2em'}}>
    2. 前項の規定にかかわらず、第三被開示者に相手方の機密情報を開示した当事者は、第三被開示者の本契約条項に違反する行為について、相手方に対して一切の責を負うものとします。
    </div>

    <h5>第6条(管理責任)</h5>
    <div style={{'padding-bottom':'2em'}}>
    甲および乙は、相手方から開示された機密情報の機密を保持するため、当該機密情報の一部または全部を含む資料、記憶媒体およびそれらの複写物等（以下、「機密情報資料」という。）につき、機密が不当に開示されまたは漏洩されないよう、他の資料等と明確に区別を行い、善良な管理者の注意義務をもって管理しなければならないものとします。    
    </div>

    <h5>第7条(返還義務)</h5>
    <div style={{'padding-bottom':'2em'}}>
    甲および乙は、本契約終了後、相手方から要請があったときは、開示された機密情報の一部または全部を含む機密情報資料（複写物を含む）を、相手方の指示にしたがい、返還または破棄するものとし、破棄したときはその旨を書面にて相手方に通知するものとします。    
    </div>

    <h5>第8条(損害賠償)</h5>
    <div style={{'padding-bottom':'2em'}}>
    甲または乙は、本契約条項に違反したときは、相手方が被った損害を賠償する責を負うものとします。    
    </div>

    <h5>第9条(有効期間)</h5>
    <div style={{'padding-bottom':'2em'}}>
    本契約は、本契約締結の日から、甲または乙が、本契約を終了する旨、相手方に申し入れるまで有効に存続するものとします。ただし、本契約の終了後といえども、第3条、第4条、第5条、第7条、第8条、第10条および本条但書の規定については、本契約終了後も3年間存続するものとします。
    </div>

    <h5>第10条(合意管轄)</h5>
    <div style={{'padding-bottom':'2em'}}>
    甲および乙は、本契約に関連して生じた紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。    
    </div>

    <h5>第11条(協議)</h5>
    <div style={{'padding-bottom':'1em'}}>
    甲および乙は、本契約に定めのない事項または本契約の条項の解釈に疑義が生じたときは、本契約締結の趣旨に則り、甲乙誠意をもって協議の上解決するものとします。    
    </div>

    </div>

    <div style={{'padding-top':'1em'}}>
    XXXX年X月XX日
    </div>

    <div style={{'padding-top':'1em'}}>甲</div>
    <Grid item xs={12}>
            ハンドルネーム:
            <label id="outlined-basic" variant="outlined" value="name" >
                {user.name}
            </label>
        </Grid>

    

    <div style={{'padding-top':'1em'}}>乙</div>
    <div>
    北海道北見市寿町１丁目1-5
    </div>
    <div>
    株式会社 コスミック
    </div>
    <div style={{'padding-bottom':'5em'}}>
    代表取締役 山中 大輔
    </div>

    <div style={{'padding-bottom':'3em'}}>
    <div style={{'text-align':'center'}}>契約内容を確認し合意の上で、「機密保持契約（NDA）を締結する」ボタンを押して下さい</div>
    </div>

<div style={{'text-align':'center'}}>
<button>秘密保持契約(NDA)を締結する</button>
</div>
    
    

    




    </body>




</Box>
  </Paper>
</TabPanel>
{/* 位置情報 */}
<TabPanel value={value} index={6}>
  <Paper elevation={3}>
      <Grid container spacing={3} >
        <Grid item xs={5}>
          <Typography variant='h4'>位置情報</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>位置情報の設定を行います。</Typography>
          <FormControl fullWidth>
          <InputLabel id="ichi_info">位置情報</InputLabel>
          <Select
            labelId="ichi_info"
            id="ichi_info"
            value={ichi_info}
            label="ichi_info"
            onChange={handleChange3}
          >
            <MenuItem value={0}>常に許可</MenuItem>
            <MenuItem value={1}>Appの使用中は許可</MenuItem>
            <MenuItem value={2}>許可しない</MenuItem>
          </Select>
        </FormControl>
        </Grid>
      </Grid>
    </Paper>
  </TabPanel>
    {/* 公開設定 */}
  <TabPanel value={value} index={7}>
    <Paper elevation={3}>
        <Grid container spacing={3} >
          <Grid item xs={5}>
            <Typography variant='h4'>公開設定</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>公開情報の設定を行います。</Typography>
            <FormControl fullWidth>
            <InputLabel id="kokai_info">公開情報</InputLabel>
            <Select
              labelId="kokai_info"
              id="kokai_info"
              value={kokai_info}
              label="kokai_info"
              onChange={handleChange4}
            >
              <MenuItem value={0}>電話帳に登録されている電話版号には表示しない</MenuItem>
              <MenuItem value={1}>企業に情報公開を許可</MenuItem>
            </Select>
          </FormControl>
          </Grid>
        </Grid>
      </Paper>
  </TabPanel>
    </Container>
  </div>
  );
}

export default Setting;