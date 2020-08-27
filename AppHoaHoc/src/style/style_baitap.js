import React,{Component} from 'react';
import {StyleSheet,Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 592;

const styles=StyleSheet.create({
    flatlist:{
        width:'100%',
        height:'100%',
        // backgroundColor:'green',
    },
    monhoc:{
        // justifyContent:'center',
        alignItems:'center',
        paddingBottom:6/standardHeight*height,
        // backgroundColor:'blue',
        width:"100%",
        height:150/standardHeight*height,
    },
    home_danhsachmonhoc:{
        width:'100%',
        backgroundColor:'#F9F9F9',
        borderBottomLeftRadius:10/standarWidth*width,
        borderBottomRightRadius:10/standarWidth*width,
        // marginTop:5/standardHeight * height,
        borderWidth:2/standarWidth*width,
        borderColor:'#aaaaaa',
        flexDirection:'column',
        // paddingBottom:6/standardHeight * height,
        paddingTop:10/standardHeight * height
    },
    home_khunglophoc:{
        height:55/standardHeight*height,
        width:'100%',
        // marginTop:10/standardHeight*height,
        borderBottomColor:'#d1caca',
        borderBottomWidth:3/standarWidth*width,
        flexDirection:'row',
    },
    home_khungchulophoc:{
        flex:1,
        borderLeftColor:'#ED2542',
        borderLeftWidth:5/standarWidth*width,
        height:'70%',
        justifyContent:'center',
        alignItems:'center'
    },
    home_chulophoc:{
        fontSize:16/standarWidth*width,
        color:'#ED2542',
        fontFamily:'Times New Roman',
        fontWeight:'bold'
    },
    home_khungtimkiemlop:{
        flex:2,
        // backgroundColor:'green',
        alignItems:'center'
    },
    home_khungtimkiem:{
        backgroundColor:'#edeaea',
        width:'87%',
        height:'70%',
        borderRadius:50/standardHeight*height,
        flexDirection:'row',
        paddingLeft:15/standarWidth*width,
        alignItems:'center'
    },
    home_chutimkiem:{
        color:'#09353D',
        fontSize:17/standarWidth*width,
        fontWeight:'bold',
        flex:5,
        // backgroundColor:'blue'
    },
    home_icontimkiem:{
        color:'#09353D',
        fontSize:24/standarWidth*width,
        fontWeight:'bold',
        flex:1,
        // backgroundColor:'blue',
    },
    home_khungmonhoc:{
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'green',
        width:'100%',
        height:70/standardHeight*height,
    },
    home_khungmonhocnho:{
        justifyContent:'center',
        alignItems:'center',
        height:100/standardHeight*height,
        width:80/standarWidth*width,
        // backgroundColor:'red',
        // borderColor:'blue',
        // borderWidth:1
        // marginTop:18/standardHeight*height,
        // marginBottom:18/standardHeight*height,
        // marginLeft:18/standarWidth*width,
        // marginRight:18/standarWidth*width,
    },
    home_anhmonhocnho:{
        height:60/standardHeight*height,
        width:60/standarWidth*width,
        borderRadius:10/standardHeight*height,
    },
    home_chumonhocnho:{
        fontSize:15/standarWidth*width,
        color:'#5e5f60',
        fontFamily:'Times New Roman',
        fontWeight:'800',
        marginTop:5/standardHeight*height,
    },
    dkdn_khunghienlop:{
        flex:1,
        backgroundColor:'white',
    },
    dkdn_khungbangchonlop_top:{
        flex:1,
        // backgroundColor:'pink',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    dkdn_khungbangchonlop_top_khungtieude:{
        width:'85%',
        justifyContent:'center',
        // backgroundColor:'blue'
    },
    dkdn_khungbangchonlop_top_tieude:{
        fontWeight:'bold',
        color:'black',
        fontSize:15,
    },
    dkdn_khungbangchonlop_middle:{
        flex:8,
        // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
    },
    dkdn_khungbangchonlop_middle_khung:{
        width:'95%',
        // backgroundColor:'blue',
        height:'90%',
    },
    dkdn_khungbangchonlop_middle_button:{
        marginTop:10/standardHeight*height,
        marginBottom:10/standardHeight*height,
        marginLeft:10/standarWidth*width,
        marginRight:10/standarWidth*width,
        flex:1,
        height:37/standardHeight*height,
        alignItems:'center',
        borderRadius:1000,
        borderWidth:2/standarWidth*width,
    },
    dkdn_khungbangchonlop_middle_text:{
        fontSize:15,
        color:'black',
        fontWeight:'900',

    },
    dkdn_khungbuttonluu:{
        flex:2,
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'#ffdd9e',

    },
    dkdn_buttonluu:{
        height:'60%',
        width:'70%',
        borderRadius:1000,
        backgroundColor:'#ffdd9e',
        alignItems:'center',
        justifyContent:'center',
    },
    dkdn_buttonluu_text:{
        fontSize:25/standarWidth*width,
        color:'#515050',
        fontWeight:'bold'
    },
    dkdn_iconmatkhau:{
        fontSize:20/standarWidth*width,
        color:'#a8a8a8',
    },
    khung:{
        alignItems:'center',
        width:'100%',
        // backgroundColor:"red",
        marginTop:20/height*standardHeight,
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
    activityindicator:{
        width: '100%',
        height: '100%',
        zIndex:6,
        position:'absolute',
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'center',
    },
    khungtimkiem:{
        flexDirection:'row',
        width:'100%',
        // backgroundColor:'green',
    },
    khungnhaptimkiem:{
        flex:9,
        backgroundColor:'#efefef',
        borderRadius:20/standarWidth*width,
        borderColor:'#383838',
        borderWidth:2,
        paddingLeft:20/standarWidth*width,
        fontSize:18/standarWidth*width,
        marginLeft:10/standarWidth*width,
    },
    buttontimkiem:{
        flex:2,
        // backgroundColor:'yellow',
        alignItems:'center',
        justifyContent:'center',
    },
    icontimkiem:{
        fontSize:35,
        color:'#09aeef'
    },

});

export default styles;