import React, { Component} from 'react'
import {
ImageBackground,StyleSheet,StatusBar,View,ScrollView,Text,Button,TextInput,
SafeAreaView,Image,TouchableOpacity,FlatList,Dimensions,Linking ,
} from 'react-native';
import {firebaseApp} from '../firebaseconfig/firebaseconfig';

export default class Bosung_Khac_Admin extends Component {

    render() {
        return(
          <ImageBackground resizeMode='stretch' source={require('../image/baotri.png')} style={{width: '100%', height: '100%'}} >
            
          </ImageBackground>
        )
    }
}