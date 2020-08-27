import React, { Component } from 'react'
import {
ImageBackground,StyleSheet,StatusBar,
} from 'react-native';

export default class Intro extends Component {

    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate('Home');
        }, 3000);
    }


    render() {
        return (
            <ImageBackground source={require('../image/nen.png')} style={{width: '100%', height: '100%'}}>
                <StatusBar backgroundColor="#08C1DC" barStyle="dark-content"/>
            </ImageBackground>
        )
    }
}
