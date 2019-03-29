import React, {Component} from 'react';
import { View} from 'react-native';

import { Router, Scene} from 'react-native-router-flux';

import Home from './scene/Home';
import Exchange from './scene/Exchange';
import Gold from './scene/Gold';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

const iconHome= () => (
    <Icon color='#fff' name='home' size={25} />
)

const iconExchange = () => (
    <Icon color='#fff' name='exchange' size={25} />
)

const iconGold = () => (
    <Icon5 color='#fff' name='coins' size={25} />
)


export default class Root  extends Component {
    render() {
        return(
            <Router>
                <Scene 
                key="tab" 
                initial  
                hideNavBar 
                activeBackgroundColor="#455a64"
                inactiveBackgroundColor="#D3D3D3"
                activeTintColor="#ffffff"
                tabs>
                    <Scene 
                        key="Home" 
                        component={Home} 
                        title="Döviz"
                        hideNavBar
                        icon={iconHome}
                    />
                    <Scene 
                        key="Exchange" 
                        component={Exchange} 
                        title="Kur Hesaplama"
                        hideNavBar
                        icon={iconExchange}
                    />
                    <Scene 
                        key="Gold" 
                        component={Gold} 
                        title="Altın"
                        hideNavBar
                        icon={iconGold}
                    />
                </Scene>
            </Router>
        );
    }
}