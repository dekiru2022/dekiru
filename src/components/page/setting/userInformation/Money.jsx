import React from 'react';
import Grid from "@material-ui/core/Grid";
import Moneycard from "./Moneycard";
import Typography from '@material-ui/core/Typography';


export default function Money() {
    return (
        <>
        <Grid container justify="center">
            <Grid item>
        <Typography component="h1" variant="h5" >
              Point購入
            </Typography>
        <Typography component="h1" variant="h6">
              説明
            </Typography>
            </Grid>
            </Grid>
        <Grid container spacing={2}>
        
        <Grid item xs={3}> 
            <Moneycard
            title="Free 200p"
            point="￥200/200p"
             />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard 
            title="Free 400p"
            point="￥0/400p"
            content="400pお得"
            />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard
            title="Free 600p"
            point="￥0/600p"
            content="600pお得"
             />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard
            title="Free 800p"
            point="￥0/800p"
            content="800pお得"
             />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard
            title="Free 1000p"
            point="￥0/1000p"
            content="1000pお得"
             />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard
            title="Free 2000p"
            point="￥0/2000p"
            content="2000pお得"
             />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard
            title="Free 4000p"
            point="￥4000/4000p"
            content="400pお得"
             />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard
            title="Free 400p"
            point="￥5000/5000p"
            content="400pお得"
             />
        </Grid>
    </Grid>
    </>
    );
  }