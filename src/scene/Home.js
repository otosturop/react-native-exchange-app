import React, {Component} from 'react';
import { StyleSheet, View, Dimensions, BackHandler, DeviceEventEmitter} from 'react-native';
import Image from 'react-native-scalable-image';

import Listexchange from '../common/listExchange';

const { width } = Dimensions.get('window');

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.backPressSubscriptions = new Set()
      }
    
    componentDidMount = () => {
        DeviceEventEmitter.removeAllListeners('hardwareBackPress')
        DeviceEventEmitter.addListener('hardwareBackPress', () => {
          let invokeDefault = true
          const subscriptions = []
    
          this.backPressSubscriptions.forEach(sub => subscriptions.push(sub))
    
          for (let i = 0; i < subscriptions.reverse().length; i += 1) {
            if (subscriptions[i]()) {
              invokeDefault = false
              break
            }
          }
    
          if (invokeDefault) {
            BackHandler.exitApp()
          }
        })
    
        this.backPressSubscriptions.add(this.handleHardwareBack)
    }
    
    componentWillUnmount = () => {
        DeviceEventEmitter.removeAllListeners('hardwareBackPress')
        this.backPressSubscriptions.clear()
    }
    
    handleHardwareBack = () => { /* do your thing */ }
   
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image
                        width={width * 0.4}
                        source={require('../img/logo.png')}
                    />
                </View>
                <Listexchange />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        alignItems: 'center'
    }
});
    