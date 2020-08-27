import React,{Component} from 'react';
import {StyleSheet,Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 592;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#adeaff',

    },
    header:{
        width:"100%",
        height:58/height*standardHeight,
        backgroundColor:'#ffffff',
        flexDirection:"row",
        // borderBottomLeftRadius:15/width*standarWidth,
        borderBottomRightRadius:15/width*standarWidth,
        marginBottom:15/height*standardHeight,
        borderWidth:2,
        borderColor:'black'
        
    },
    buttonback:{
        flex:2,
        backgroundColor:'transparent',
        backgroundColor:'#ffb23f',
        borderTopRightRadius:1000,
        borderBottomRightRadius:1000,
        alignItems:'center',
        paddingTop:9/height*standardHeight,
        // borderWidth:2,
        // borderColor:'black'
    },
    iconback:{
        flex:1,
        fontSize:35/width*standarWidth,
        color:"#565656",

    },
    headertimkiem:{
        flex:8,
        flexDirection:'row',
        paddingLeft:10/width*standarWidth,
        // backgroundColor:'black'
    },
    headerkhungtimkiem:{
        fontSize:17/width*standarWidth,
        flex:8,
        color:"black",
    },
    buttonsearch:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'black'
    },
    iconsearch:{
        fontSize:30/width*standarWidth,
        color:'black',

    },
    khung:{
        alignItems:'center',
        width:'100%',
        // backgroundColor:"red",
        marginTop:20/height*standardHeight,
    },
    flatlist:{
        width:'100%',
        height:'100%',
    },
    khungnoidung:{
        width:'95%',
        height:200/height*standardHeight,
        backgroundColor:'#fcfcfc',
        borderColor:'black',
        borderWidth:2,
        borderRadius:15/width*standarWidth,
        alignItems:'center',
        flexDirection:"column",
    },
    khungtieude:{
        width:"95%",
        flex:2,
        flexDirection:"row",
        borderBottomColor:'#f9be57',
        borderBottomWidth:2,
        paddingBottom:8/height*standardHeight,
        marginTop:5/height*standardHeight,
        marginBottom:8/height*standardHeight,
    },
    tieude:{
        width:"95%",
        color:'#515151',
        fontFamily:"Time new roman",
        fontSize:20/width*standarWidth,
        paddingRight:5/width*standarWidth,
        // backgroundColor:'black'
        fontWeight:'bold',
    },
    iconcheck:{
        fontSize:26/width*standarWidth,
        color:"#5a9b04",
        fontWeight:'bold'
    },
    khungghichu:{
        flex:8,
        // backgroundColor:'blue',  
        width:'95%',
        marginBottom:9/height*standardHeight,
    },
    noidung:{
        color:'#262626',
        fontSize:18/width*standarWidth,

    },
    scrollview_noidungmonhoc:{
        flex:1,
        // backgroundColor:'red'
      },
    khungtieude_noidung:{
        width:'100%',
        marginTop:10/height*standardHeight,
        marginBottom:10/height*standardHeight,
        backgroundColor:"white",
        justifyContent:'center',
        paddingLeft:10/width*standarWidth,
    },
    tieude_noidungmonhoc:{
        fontSize:22,
        fontWeight:'bold',
        color:"#3d3d3d",
    },
    noidungmonhoc:{
        fontSize:17,
        fontWeight:'700',
        color:"#636363",
    },
    khunghinhnoidung:{
        width:'100%',
        height:250/height*standardHeight,
        marginTop:30/height*standardHeight,
        marginBottom:30/height*standardHeight,
        // backgroundColor:'black'
    },
    anhnoidung:{
        width:'100%',
        height:"100%",
        marginTop:10/height*standardHeight,
        marginBottom:10/height*standardHeight,
        backgroundColor:'black'
    },  
    video:{
        width:'100%',
        height:350/height*standardHeight,
        marginTop:10/height*standardHeight,
        marginBottom:10/height*standardHeight,
    },
    nutthoat:{
        width:"100%",
        height:50/height*standardHeight,
        // backgroundColor:'red',
        marginBottom:10/height*standardHeight,
        alignItems:'center',
        justifyContent:'center',
    
    },
    iconbuttonthoat:{
        fontSize:35/width*standarWidth,
        color:'#ffb23f'
    },
    activityindicator:{
        width: '100%',
        height: '100%',
        zIndex:6,
        position:'absolute',
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
    },
});

export default styles;