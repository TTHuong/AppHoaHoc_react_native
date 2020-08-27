import React,{Component} from 'react';
import {StyleSheet,Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 592;

const styles=StyleSheet.create({
    radiobutton:{
        marginTop:7/standardHeight*height,
        width:'99%',
        // backgroundColor:'red',
        fontSize:24/standarWidth*width,
        color:'#2a5556',
    },
    container:{
        // backgroundColor:'blue',
        width:'100%',
        height:'100%',
    },
    khungitem:{
        // marginBottom:10/standardHeight*height,
        marginTop:10/standardHeight*height,
        width:width-10/standarWidth*width,
        // height:100/standardHeight*height,
        paddingTop:10/standardHeight*height,
        paddingBottom:10/standardHeight*height,
        backgroundColor:'white',
        borderRadius:10/standarWidth*width,
        borderColor:'#07bca7',
        borderWidth:2/standarWidth*width,
        padding:6/standardHeight*height,
        alignItems:'center',
    },
    chucautraloi:{
        fontSize:14/standarWidth*width,
        color:'#174647',
        // marginRight:6/standarWidth*width,
        paddingRight:15/standarWidth*width,
        // width:'96%',
        // backgroundColor:'blue',
        fontWeight:'500',
        // maxWidth:'95%'

    },  
    cauhoi:{
        fontSize:14/standarWidth*width,
        color:'#00292b',
        fontWeight:'bold'
    },

    khung_nop:{
        width:width,
        marginTop:10/standardHeight*height,
        marginBottom:10/standardHeight*height,
        flexDirection:'row',
        // backgroundColor:'red'
    },
    item_khung:{
        flex:1,
        // backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
    },
    item:{
        flexDirection:'row',
        borderRadius:100,
        borderWidth:3,
        borderColor:'white',
        backgroundColor:'#A49BCB',
        width:'80%',
        height:40/standardHeight*height,
        alignItems:'center',
        justifyContent:'center',
    },
    item_text:{
        fontSize:15/standarWidth*width,
        color:'#00292b',
        fontWeight:'bold',
        marginTop:10/standardHeight*height,
        // backgroundColor:'red',
        width:'87%',

    },
    item_image:{
        marginLeft:15/standarWidth*height,
        height:45/standardHeight*height,
        width:45/standarWidth*width,
    },
    khungdapan_dung:{
        flexDirection:'row',
        marginTop:5/standardHeight*height,
        width:'99%',
        // backgroundColor:'blue',
    },  
    check_image:{
        marginRight:7/standarWidth*width,
        height:35/standardHeight*height,
        width:35/standarWidth*width,
    },
    khungdiem:{
        width:'98%',
        paddingBottom:20/standardHeight*height,
        paddingTop:6/standardHeight*height,
        marginTop:10/standardHeight*height,
        marginBottom:20/standardHeight*height,
        backgroundColor:'white',
        borderColor:'#ff9a35',
        borderRadius:10/standarWidth*width,
        borderWidth:3/standarWidth*width,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'blue'
    },
    tongdiem:{
        fontSize:34/standarWidth*width,
        fontWeight:'bold',
        color:'#4f4f4f',
        // backgroundColor:"yellow",
        // flex:1,
        // textAlign:'center',
        // paddingBottom:5/standardHeight*height,
        // borderBottomColor:'black',
        // borderBottomWidth:1/standardHeight*height,
        marginRight:15/standarWidth*width,
    },
    note_image:{
        marginLeft:9/standarWidth*width,
        height:45/standardHeight*height,
        width:45/standarWidth*width,
        zIndex:10,
        position:'absolute',
        marginTop:-20/standardHeight*height,
    },
    diem_image:{
        // backgroundColor:'red',   
        height:60/standardHeight*height,
        width:80/standarWidth*width,
        // zIndex:10,
        // position:'absolute',
        // marginLeft:200/standarWidth*width,
        // flex:1,
    },  
    item_header:{
        width:'98%',
        // backgroundColor:'green',
        // marginTop:7/standardHeight*height,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    item_noidung:{
        fontSize:16/standarWidth*width,
        fontWeight:'500',
        color:'#4f4f4f',
        // backgroundColor:"blue",
        width:'98%',
    },
});
export default styles;