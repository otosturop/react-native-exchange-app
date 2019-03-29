import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, ActivityIndicator} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class ListExchange extends Component {

    constructor(props){
        super(props)

        this.state = {
            moneys: [],
            moneysRates: [],
            spiner: true
        }
    }

    componentWillMount() {
        this.exchange().then(result => {
            this.setState({
                moneys: result.currency,
                moneysRates: result.rates
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
            fetch("****") 
                .then(response => response.json())
                .then(data => {
                    console.log(data, "exchange")
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
                {this.listItem("Dolar", this.state.moneys.USD, this.state.moneysRates.USD)}
                {this.listItem("Euro", this.state.moneys.EUR, this.state.moneysRates.EUR)}
                {this.listItem("İngiliz Sterlini", this.state.moneys.GBP, this.state.moneysRates.GBP)}
                {this.listItem("İsviçre Frangı", this.state.moneys.CHF, this.state.moneysRates.CHF)}
                {this.listItem("Japon Yeni", this.state.moneys.JPY, this.state.moneysRates.JPY)}
                {this.listItem("Rus Rublesi", this.state.moneys.RUB, this.state.moneysRates.RUB)}
                {this.listItem("Çin Yuanı", this.state.moneys.CNY, this.state.moneysRates.CNY)}  
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
        fontSize: 24,
        color: '#ffffff',
        textAlignVertical: 'center'
    }

});
