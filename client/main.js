import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { SignInPage } from '/imports/ui/pages';
import { PrivateRouteContainer } from '/imports/ui/containers';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

Meteor.startup(() => {
  render(
    <Router>
      <Switch>
        <Route exact path="/signin">
          <SignInPage />
        </Route>
        <PrivateRouteContainer path="/">
          <App />
        </PrivateRouteContainer>
      </Switch>
    </Router>,
    document.getElementById('react-target')
  );
});
