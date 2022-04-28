import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DefaultRoute from './defaultRoute';
import Skyway from '../components/page/skyway/Skyway';


function afterLoginRoute() {
  return (
    <BrowserRouter>
      {/* headerとfooterがいらないページはここでルーティング */}
      <Switch>
        <Route path='/skyway/:isHost/:time/:room/' component={Skyway} />
        <Route path="/" component={ DefaultRoute } />
      </Switch>
    </BrowserRouter>
  )
};
export default afterLoginRoute;