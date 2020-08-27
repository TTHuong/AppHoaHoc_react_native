import React,{Component} from 'react';
import {
StyleSheet,Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 592;

const Styles=StyleSheet.create({
    khungbaoboc:{
        width:'100%',
        height:50/standardHeight*height,
        backgroundColor:'white',
        flexDirection:'row',
        borderTopColor:'#b7b7b7',
        borderTopWidth:2,
    },
    khungbuttontab:{
        flex:1,
        // backgroundColor:'yellow',
    },
    khungtab:{
        flex:1,
        // backgroundColor:'pink',
        alignItems:'center',
        justifyContent:'center',
    },
    buttontab:{
        width:'100%',
        height:'100%',
        // backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',

    },
    chubottomtab:{
        fontSize:15,
        fontWeight:'bold',
    },



});

export default Styles;
