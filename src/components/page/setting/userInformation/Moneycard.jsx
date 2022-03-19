import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@mui/material/Container';
//window.location.href = '/indexResolver';
const useStyles = makeStyles({
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

const handleClick = async (URL) => {
    // 更新処理
    window.location.href = URL ;
}

export default function Moneycard(props) {
    const { title, point, money,content,URL} = props;
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <Card variant="outlined">
            <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                {title}
            </Typography>

            <Typography variant="h5" component="h2">
                ¥{money}/{point}p
            </Typography>

            <Container maxWidth="sm">
            <Typography className={classes.pos} color="textSecondary" sx={{ bgcolor: '#cfe8fc'}}>
                {content}
            </Typography>
            </Container>
            </CardContent>

            <CardActions>
            <Button size="small"
            onClick={() => { handleClick(URL); }}
            >購入</Button>
            </CardActions>
        </Card>
    );
}
