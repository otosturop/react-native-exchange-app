import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Picker, Alert} from 'react-native';
import {CustomInput} from './customInput'
import Image from 'react-native-scalable-image';
import Icon from 'react-native-vector-icons/FontAwesome';


const { width, height } = Dimensions.get('window');

export default class Converter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            moneyRate: 'TRY',
            resultMoneyRate: 'USD',
            resultAmount: 1,
            moneys: [],
            moneysSign: [],
            currencySign: '\u20BA',
            flagRight: require('../img/flag/TRY.png'),
            total: null,
            changeFlag: true
        }

        this.exchange = this.exchange.bind(this);
        this.flags = this.flags.bind(this);
    }

    componentDidMount() {
        this.exchange().then(result => {
            this.setState({
                moneys: result.currency,
                moneysSign: result.sign
            },() => {
                this.calculation();
            })
            
        })
    }

    calculation() {
        if(this.state.changeFlag === true){
            this.setState({
                total: this.state.resultAmount * this.state.moneys[this.state.resultMoneyRate]
            },() => {
                this.definitionMoneySign();
            })
        }else {
            this.setState({
                total: this.state.resultAmount / this.state.moneys[this.state.resultMoneyRate]
            },() => {
                this.definitionMoneySign();
            })
        }

    }

    definitionMoneySign(){
        if(this.state.changeFlag === false){
            this.setState({
                currencySign: this.state.moneysSign[this.state.resultMoneyRate]
            })
        }else {
            this.setState({
                currencySign: '\u20BA'
            })
        }
    } 
    
    flags(flag){
        if(flag === "USD"){
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
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }

    render() {
        const {changeFlag, currencySign, resultAmount} = this.state;
        const money = [
            {
                title: 'Amerikan Doları',
                value: 'USD',
                sign:  '\u0024'
            },
            {
                title: 'Euro',
                value: 'EUR',
                sign:  '\u20AC'
            },
            {
                title: 'İngiliz Sterlini',
                value: 'GBP',
                sign:  '\uFFE1'
            },
            {
                title: 'İsviçre Frangı',
                value: 'CHF',
                sign: '\u20A3'
            },
            {
                title: 'Japon Yeni',
                value: 'JPY',
                sign:  'u00a5'
            },
            {
                title: 'Rus Rublesi',
                value: 'RUB',
                sign:  'u20bd'
            },
            {
                title: 'Çin Yuanı',
                value: 'CNY',
                sign:  'u00a5'
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
                    value={ String(resultAmount) }
                />
                <View style={styles.resultExchange}>
                    <Text style={styles.resultExchangeText}>
                        { Number(this.state.total).toFixed(2)} {currencySign}
                    </Text>
                </View>
                {
                changeFlag ?
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
                        <View style={{justifyContent:'center'}}>
                            <Icon color='#455a64' name='arrow-circle-right' size={20} />
                        </View>
                        <View style={styles.elementPickerViewText}>
                            <Text style={styles.tlText}>Türk Lirası</Text> 
                        </View>
                    </View>    
                :
                    <View style={styles.selectedContainer}>
                        <View style={styles.elementPickerViewText}>
                            <Text style={styles.tlText}>Türk Lirası</Text> 
                        </View>
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
                    </View>
                }
                <View style={styles.selectedContainer}>
                    {
                    changeFlag ? 
                        <View style={styles.flag}>
                            {this.flags(this.state.resultMoneyRate)}
                        </View>
                    :
                        <View style={styles.flag}>
                            <Image
                                width={width * 0.3}
                                source={this.state.flagRight}
                            />
                        </View>
                    }        
                    <View style={styles.arrow}>
                        <TouchableOpacity onPress={() => {
                                this.setState({
                                    changeFlag : !this.state.changeFlag
                                }, () => {
                                    this.calculation();
                                })
                            }}>
                            <Icon color='#455a64' name='exchange' size={40} />
                        </TouchableOpacity>    
                    </View>
                    {
                    changeFlag ? 
                        <View style={styles.flag}>
                            <Image
                                width={width * 0.3}
                                source={this.state.flagRight}
                            />
                        </View>
                    :
                        <View style={styles.flag}>
                            {this.flags(this.state.resultMoneyRate)}
                        </View>
                    }
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
        width: width * 0.35,
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
        width: width * 0.35,
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
