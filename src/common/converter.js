import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Picker, Alert} from 'react-native';
import {CustomInput} from './customInput'
import Image from 'react-native-scalable-image';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

export default class Converter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            baseurl: 'https://api.exchangeratesapi.io/latest?base=',
            moneyRate: 'TRY',
            resultMoneyRate: 'USD',
            resultAmount: 1,
            moneys: [],
            flagRight: require('../img/flag/TRY.png'),
            total: null
        }

        this.exchange = this.exchange.bind(this);
        this.flags = this.flags.bind(this);
    }

    componentDidMount() {
        this.exchange().then(result => {
            this.setState({
                moneys: result
            },() => {
                this.calculation();
            })
            
        })
    }

    calculation() {
        this.setState({
            total: this.state.resultAmount * this.state.moneys[this.state.resultMoneyRate]
        })

    }
    
    flags(flag){
        if(flag === "TRY"){
            return(
                <Image
                    width={width * 0.3}
                    source={require('../img/flag/TRY.png')}
                />
            );
        }else if(flag === "USD"){
            return(
                <Image
                    width={width * 0.3}
                    source={require('../img/flag/USD.png')}
                />
            );
        }else if(flag === "EUR"){
            return(
                <Image
                    width={width * 0.3}
                    source={require('../img/flag/EUR.png')}
                />
            );
        }else if(flag === "GBP"){
            return(
                <Image
                    width={width * 0.3}
                    source={require('../img/flag/GBP.png')}
                />
            );
        }else if(flag === "CHF"){
            return(
                <Image
                    width={width * 0.3}
                    source={require('../img/flag/CHF.png')}
                />
            );
        }else if(flag === "JPY"){
            return(
                <Image
                    width={width * 0.3}
                    source={require('../img/flag/JPY.png')}
                />
            );
        }else if(flag === "RUB"){
            return(
                <Image
                    width={width * 0.3}
                    source={require('../img/flag/RUB.png')}
                />
            );
        }else if(flag === "CNY"){
            return(
                <Image
                    width={width * 0.3}
                    source={require('../img/flag/CNY.png')}
                />
            );
        }
    }

    exchange(){
        return new Promise((resolve, reject) => {
            fetch("http://doviz.mehmetarikan.site/botdoviz.php") 
                .then(response => response.json())
                .then(data => {
                    resolve(data.currency);
                })
                .catch(err => reject(err));
        });
    }

    render() {
        const money = [
            {
                title: 'Türk Lirası',
                value: 'TRY'
            },
            {
                title: 'Amerikan Doları',
                value: 'USD'
            },
            {
                title: 'Euro',
                value: 'EUR'
            },
            {
                title: 'İngiliz Sterlini',
                value: 'GBP'
            },
            {
                title: 'İsviçre Frangı',
                value: 'CHF'
            },
            {
                title: 'Japon Yeni',
                value: 'JPY'
            },
            {
                title: 'Rus Rublesi',
                value: 'RUB'
            },
            {
                title: 'Çin Yuanı',
                value: 'CNY'
            }
          ];
        return(
            <View style={styles.wrapper}>

                <CustomInput 
                    onChangeText = { (number) => {
                        if(number >= 0 || number ===''){
                            this.setState({ resultAmount:  number}, () => {
                                this.calculation();
                            });
                        }else{
                            Alert.alert("Lütfen pozitif sayılar giriniz")
                        }
                        
                        
                    }}
                    value={ String(this.state.resultAmount) }
                />
                <View style={styles.resultExchange}>
                    <Text style={styles.resultExchangeText}>
                        { Number(this.state.total).toFixed(2)} {'\u20BA'}
                    </Text>
                </View>

                <View style={styles.selectedContainer}>
                    <View style={styles.elementPickerView}>
                        <Picker
                            selectedValue={this.state.resultMoneyRate}
                            style={styles.elementPicker}
                            onValueChange={(itemValue, itemIndex) => {
                                this.setState({resultMoneyRate: itemValue}, () => {
                                    this.calculation();
                                })
                            }
                        }>
                            { money.map( (value, index) => {
                                return <Picker.Item key={index} label={ value.title } value={ value.value } />
                            })}
                        </Picker>
                    </View>
                    <View style={styles.elementPickerViewText}>
                        <Text style={styles.tlText}>Türk Lirası</Text> 
                    </View>
                </View>


                <View style={styles.selectedContainer}>
                    <View style={styles.flag}>
                        {this.flags(this.state.resultMoneyRate)}
                    </View>  
                    <View style={styles.arrow}>
                        <Icon color='#455a64' name='arrow-alt-circle-right' size={50} />
                    </View>
                    <View style={styles.flag}>
                        <Image
                            width={width * 0.3}
                            source={this.state.flagRight}
                        />
                    </View>
                         
                    
                </View>
                
        
            </View>
        )
    }

}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 15,
        alignItems: 'center'
    },
    selectedContainer: {
        width: width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-around'
        
    },
    arrow: {
        justifyContent: 'center'
    },
    elementPicker: {
        height: height * 0.05, 
        width: width * 0.4,
        color: '#3558a4',
    },
    elementPickerView: {
        borderColor: '#3558a4',
        borderWidth: 1,
        justifyContent: 'center'
    },
    elementPickerViewText: {
        borderColor: '#3558a4',
        borderWidth: 1,
    },
    tlText: {
        color: '#3558a4',
        fontSize: 17,
        height: height * 0.05, 
        width: width * 0.4,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    resultExchange:{
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#455a64',
        height: height * 0.1,
        width: width,
        marginBottom: height * 0.05,
    },
    resultExchangeText:{
        width: width *0.6,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.3)',
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        textAlignVertical: 'center'
    }

})