import React, {Component} from 'react';
import { StyleSheet, View, StatusBar, Dimensions} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

import Router from './src/Root';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combineReducers from './src/store/reducers/';

const { width } = Dimensions.get('window');

export default class App extends Component {

  constructor(props){
    super(props)
  }
	
  componentDidMount() {
    StatusBar.setHidden(true);
    SplashScreen.hide();
  }


  render() {

    return (
      <Provider store={createStore(combineReducers)}>
        <View style={styles.container}>
          <Router /> 
        </View>
      </Provider>
     
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1
  }
})
