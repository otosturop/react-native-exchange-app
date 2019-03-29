import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, ActivityIndicator} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class GoldList extends Component {

    constructor(props){
        super(props)

        this.state = {
            golds: [],
            goldsRates: [],
            spiner: true
        }
    }

    componentWillMount() {
        this.exchange().then(result => {
            this.setState({
                golds: result.currency,
                goldsRates: result.rates
            }, () => {
                this.setState({
                    spiner: false
                })
                console.log(this.state.spiner)
            })
            
        })
        
    }

    exchange(){
        return new Promise((resolve, reject) => {
            fetch("******") 
                .then(response => response.json())
                .then(data => {
                    console.log(data, "gold")
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }
    listItem(itemName, itemValue, itemRate) {
        if(this.state.spiner === false){
            return(
                <View style={styles.listExchange}>
                    <Text style={styles.listExchangeText}>
                        {itemName}: 
                    </Text>
                    <Text style={styles.listExchangeText}>
                        <Text style={{color: itemRate < 0 ? 'red' : 'green', fontSize:16, fontWeight: 'bold'}}>{itemRate}% </Text> 
                        { Number(itemValue).toFixed(2)} {'\u20BA'}
                    </Text>
            </View>
            );
        }else {
            return(
                <View style={styles.listExchange}>
                    <Text style={styles.listExchangeText}>
                        {itemName}: 
                    </Text>
                    <ActivityIndicator color="#ffffff"/>
                </View>
            );
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.listExchange}>
                    <Text style={styles.listExchangeText}>
                        Para Birimi
                    </Text>
                    <Text style={styles.listExchangeText}>
                        TL Değeri
                    </Text>
                </View>
                {this.listItem("Gram Altın", this.state.golds.GRM, this.state.goldsRates.GRM)}
                {this.listItem("Çeyrek Altın", this.state.golds.CYR, this.state.goldsRates.CYR)}
                {this.listItem("Yarım Altın", this.state.golds.YRM, this.state.goldsRates.YRM)}
                {this.listItem("Tam Altın", this.state.golds.TAM, this.state.goldsRates.TAM)}
                {this.listItem("Cumhuriyet Altını", this.state.golds.CUM, this.state.goldsRates.CUM)}
                {this.listItem("18 Ayar Altın", this.state.golds.A18, this.state.goldsRates.A18)}
                {this.listItem("24 Ayar Altın", this.state.golds.A24, this.state.goldsRates.A24)}  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    listExchange: {
        backgroundColor: '#455a64',
        height: height * 0.07,
        width: width,
        marginBottom: height * 0.001,
        paddingLeft: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    listExchangeText: {
        fontSize: 20,
        color: '#ffffff',
        textAlignVertical: 'center'
    }

});
