import React from 'react';
import { View, TextInput, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CustomInput = ({onChangeText, value}) => {

    return (
       <View 
            style={{
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#455a64',
                marginBottom: height* 0.01,
                height: height * 0.1,
                width: width
            }}>
           <TextInput 
                style={{
                    width: width *0.6,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    borderRadius: 25,
                    paddingHorizontal: 20,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 16,
                    color: '#ffffff',

                }}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='Alınacak tutarı giriniz'
                placeholderTextColor='#ffffff'
                keyboardType= 'numeric'
                maxLength= {10}
                onChangeText={onChangeText}
                value={value}
           />
       </View>
    );
}

export {CustomInput};