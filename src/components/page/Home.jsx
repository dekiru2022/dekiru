import * as React from 'react';
import { Grid } from '@material-ui/core'
import HomeTop from '../../images/HOME-Top.png'
import { StyleButton, BackButton } from '../ui/styleButton';

export default function Home() {
  return (
    <>
      <p style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
        <img width="100%" src={HomeTop} alt="Top" style={{ position: 'relative', top: '-330px' }} ></img>
      </p>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <StyleButton title="相談する" to="/postQuestion" />
        </Grid>
        <Grid item>
          <StyleButton title="解決する" to="/indexQuestion" />
        </Grid>
      </Grid>
    </>
  );
}
