import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import Auth from '../Auth';
import TabPersonal from '../TabPersonal';
import TabFriends from '../TabFriends';
import TabGroups from '../TabGroups/TabGroups';

import { VkServiceProvider } from '../VkServiceContext';
import VkService from '../../services/VkService';
import ErrorIndicator from '../ErrorIndicator';

export default class App extends Component {

  vkService = new VkService(null);

  render() {
    return (
      <div className="app">
        <VkServiceProvider value={ this.vkService } >
          <Router basename = "/projects/react-vk-app/" >
            <Switch>

            <Route path="/" 
                exact 
                render = { () => <Auth /> } 
              />

              <Route path="/auth" 
                exact 
                render = { () => <Auth /> } 
              />
       
              <Route path="/profile/:id" 
                exact
                render = { () => <TabPersonal /> } 
              />

              <Route path="/profile/:id/friends" 
                exact
                render = { () => <TabFriends /> }
              />

              <Route path="/profile/:id/groups" 
                exact
                render = { () => <TabGroups /> }
              />

              <Route render = { 
                () => { return <ErrorIndicator error = { { message: 'Страница не найдена', name: 404 } } /> }
              } />
            </Switch>

          </Router>
        </VkServiceProvider>
      </div>
    )
  }
}
