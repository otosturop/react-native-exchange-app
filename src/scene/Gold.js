import React, {Component} from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import Image from 'react-native-scalable-image';
import GoldList from '../common/goldList';

const { width } = Dimensions.get('window');

export default class Gold extends Component {

    constructor(props){
      super(props)
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image
                        width={width * 0.4}
                        source={require('../img/logo.png')}
                    />
                </View>      
                <GoldList />
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
    