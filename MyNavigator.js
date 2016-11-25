import Exponent, { Asset, Components } from 'exponent';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Store from './components/utils/Store';


import EventEmitterExample from './components/EventEmitterExample';

import MainDrawerNavigation from './components/MainDrawerNavigation';
import HomeScreen from './components/HomeScreen';

import SearchPage from './components/search-component/SearchPage';
import Settings from './components/settings-component/Settings';
import Help from './components/help-component/Help'
import TemplateScreen from './components/TemplateScreen';
import ProfilePage from './components/profile-component/ProfilePage';
import BrowseUploads from './components/browse-uploads-component/BrowseUploads';
import TestApi from './components/test-api-component/TestApi';
import SuperUserCreate from './components/super-user-component/SuperUserCreate';
import TestAuthentication from './components/TestAuthentication';


import {
  NavigationContext,
  createRouter,
  NavigationProvider,
} from '@exponent/ex-navigation';

const navigationContext = new NavigationContext({
  router: Router,
  store: Store,
})

const assets = [
  require('./assets/beetle.jpg'),
  require('./assets/cat.gif'),
  require('./assets/colorful-windows.jpg'),
  require('./assets/paintbrush.jpg'),
  require('./assets/space.jpg'),
  require('./assets/sparkles.jpg'),
];

/**
  * This is where we map route names to route components. Any React
  * component can be a route, it only needs to have a static `route`
  * property defined on it, as in HomeScreen below
  */
export const Router = createRouter(() => ({
  home: () => HomeScreen,
  help: () => Help,
  template: () => TemplateScreen,
  settings: () => Settings,
  searchPage: () => SearchPage,
  eventEmitterExample: () => EventEmitterExample,
  profilePage: () => ProfilePage,
  superUserCreate: () => SuperUserCreate,
  browseUploads: ()=> BrowseUploads,
  testApi: () => TestApi,
  testAuthentication: () => TestAuthentication
}));

export default class MyNavigator extends Component {

  state = {
    bootstrapped: false,
  };

  componentDidMount() {
    this._bootstrap();
  }

  _bootstrap = async () => {
    const promises = assets.map(module => Asset.fromModule(module).downloadAsync());
    await Promise.all(promises);
    this.setState({
      bootstrapped: true,
    });
  };

  render() {
    if (!this.state.bootstrapped) {
      return <Components.AppLoading />;
    }

    /**
      * NavigationProvider is only needed at the top level of the app,
      * similar to react-redux's Provider component. It passes down
      * navigation objects and functions through context to children.
      *
      * StackNavigation represents a single stack of screens, you can
      * think of a stack like a stack of playing cards, and each time
      * you add a screen it slides in on top. Stacks can contain
      * other stacks, for example if you have a tab bar, each of the
      * tabs has its own individual stack. This is where the playing
      * card analogy falls apart, but it's still useful when thinking
      * of individual stacks.
      */
    return (
      <NavigationProvider context={navigationContext}>
        <StatusBar barStyle="light-content" />
        <MainDrawerNavigation />
      </NavigationProvider>
    );
  }
}
