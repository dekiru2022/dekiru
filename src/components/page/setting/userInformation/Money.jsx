import React, { useState, useEffect, useMemo } from 'react';
import Grid from "@material-ui/core/Grid";
import Moneycard from "./Moneycard";
import Typography from '@material-ui/core/Typography';

import { Auth } from 'aws-amplify'

export default function Money(props) {
    const userId = props.match.params.userId;
    const [userMail, setUserMail] = useState([]);

    useEffect(() => {
        getUserDateAws();
    }, [])

    const getUserDateAws = async () => {
        let user1 = await Auth.currentAuthenticatedUser();
        const mail = user1.attributes.email;
        setUserMail(mail);
    }

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
            point="200"
            money="200"
            content="一般"
            URL={`https://secure.telecomcredit.co.jp/inetcredit/secure/order.pl?clientip=00043&money=200&sendid=${userId}&usrmail=${userMail}`}

             />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard 
            title="Free 400p"
            point="400"
            money="400"
            content="400pお得"
            URL={`https://secure.telecomcredit.co.jp/inetcredit/secure/order.pl?clientip=00043&money=400&sendid=${userId}&usrmail=${userMail}`}
            />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard
            title="Free 600p"
            point="600"
            money="600"
            content="600pお得"
            URL={`https://secure.telecomcredit.co.jp/inetcredit/secure/order.pl?clientip=00043&money=600&sendid=${userId}&usrmail=${userMail}`}
             />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard
            title="Free 800p"
            point="800"
            money="800"
            content="800pお得"
            URL={`https://secure.telecomcredit.co.jp/inetcredit/secure/order.pl?clientip=00043&money=800&sendid=${userId}&usrmail=${userMail}`}
             />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard
            title="Free 1000p"
            point="1000"
            money="1000"
            content="1000pお得"
            URL={`https://secure.telecomcredit.co.jp/inetcredit/secure/order.pl?clientip=00043&money=1000&sendid=${userId}&usrmail=${userMail}`}
             />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard
            title="Free 2000p"
            point="2000"
            money="2000"
            content="2000pお得"
            URL={`https://secure.telecomcredit.co.jp/inetcredit/secure/order.pl?clientip=00043&money=2000&sendid=${userId}&usrmail=${userMail}`}
             />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard
            title="Free 4000p"
            point="4000"
            money="4000"
            content="400pお得"
            URL={`https://secure.telecomcredit.co.jp/inetcredit/secure/order.pl?clientip=00043&money=4000&sendid=${userId}&usrmail=${userMail}`}
             />
        </Grid>
        <Grid item xs={3}> 
            <Moneycard
            title="Free 400p"
            point="5000"
            money="5000"
            content="400pお得"
            URL={`https://secure.telecomcredit.co.jp/inetcredit/secure/order.pl?clientip=00043&money=5000&sendid=${userId}&usrmail=${userMail}`}
             />
        </Grid>
    </Grid>
    </>
    );
  }