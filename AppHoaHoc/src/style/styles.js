import React,{Component} from 'react';
import {StyleSheet,Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 592;

const styles=StyleSheet.create({

    //khung này dùng để chỉnh cho trang app
    app_khungtieude_dkdn:{
        width:"100%",
        alignItems:'center',
        justifyContent:'center',
    },
    app_anhtieude_dkdn:{
        width:250/standarWidth*width,
        height:80/standardHeight*height,
    },




    //khung này dùng để hiển thị thông tin cá nhân trong trang home





    srollview:{
        flex:1,
        // backgroundColor:'red'
    },
    home_thongtincanhan:{
        // backgroundColor:'green',
        height:90/standardHeight * height,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    home_khungthongtin:{
        height:50/standardHeight * height,
        width:'95%',
        backgroundColor:'#F9F9F9',
        borderRadius:10/standarWidth*width,
        marginTop:18/standardHeight * height,
        flexDirection:'row',
        borderWidth:1,
        borderColor:'black',
    },
    home_khunganh:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:40/standardHeight*height,
        // backgroundColor:'blue',
    },
    home_anh:{
        width:60/standarWidth*width,
        height:56/standardHeight*height,
        backgroundColor:'#eae8e8',
        borderRadius:1000,
        borderColor:'#d1caca',
        borderWidth:2
    },
    home_khungchu:{
        flex:5,
        justifyContent:'center',
    },
    home_chutieude:{
        fontSize:14/standarWidth*width,
        color:'#282C34',
        fontWeight:'bold',
        fontFamily:'Times New Roman',
        marginTop:-3/standardHeight*height,
    },
    home_chuhoitham:{
        fontSize:12/standarWidth*width,
        color:'#5e5f60',
        fontFamily:'Times New Roman',
        fontWeight:'800'

    },
    home_khungdangky_dangnhap:{
        flex:3,
        overflow:'visible',
    },
    home_dangky_dangnhap_container:{
        flexDirection:'row',
        marginLeft:-26/standarWidth*width,
        marginTop:6/standardHeight*height,
    },
    home_chudangky_dangnhap:{
        color:'#FFA801',
        fontSize:13/standarWidth*width,
        fontWeight:'900',
    },


    //khung quảng cáo trong trang home




    home_khungquangcao:{
        // height:180/standardHeight * height,
        // width:'100%',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'pink'
    },
    home_khungquangcaocontainer:{
        backgroundColor:'#F9F9F9',
        // height:150/standardHeight * height,
        width:'95%',
        borderRadius:10/standarWidth*width,
        paddingBottom:18/standardHeight*height,
    },
    home_khungquangcaonho:{
        justifyContent:'center',
        alignItems:'center',
    },
    home_tenquangcao:{
        // width:'100%',
        // height:100,
        marginTop:5/standardHeight * height,
        marginBottom:10/standardHeight * height,
        paddingLeft:15/standarWidth*width,
        // backgroundColor:'yellow'
    },
    home_chuquangcao:{
        fontSize:15/standarWidth*width,
        color:'#5e5f60',
        fontFamily:'Times New Roman',
        fontWeight:'bold',
    },
    // home_scrollviewquangcao:{
    //     width:'100%',
    //     height:'100%',
    //     backgroundColor:'red',
    // },
    home_flatlistquangcao:{
        // backgroundColor:'blue',
        width:'95%',
        
    },
    home_khunganhquangcao:{
        height:90/standardHeight*height,
        width:"99%",
        // backgroundColor:'red',
        // borderColor:'green',
        // borderWidth:2/standarWidth*width,
        // marginRight:40/standarWidth*width,
    },
    // home_anhquangcao:{
    //     height:80/standardHeight*height,
    //     width:240/standarWidth*width,
    //     borderRadius:10/standarWidth*width,
    // },
    home_khungnutslide:{
        height:15/standardHeight*height,
        // backgroundColor:"blue",
        position:'absolute',
        marginLeft:22/standarWidth*width,
        marginTop:96/standardHeight*height,
        // justifyContent:'center',
        // alignItems:'center',
        flexDirection:'row'
    },
    home_nutslidechay:{
        height:10/standardHeight*height,
        width:10/standarWidth*width,
        borderRadius:500,
        borderColor:'#F9F9F9',
        borderWidth:1,
        backgroundColor:'#F7901E',
        marginRight:10/standarWidth*width,
    },
    home_nutslidekhongchay:{
        height:8/standardHeight*height,
        width:8/standarWidth*width,
        borderRadius:500,
        backgroundColor:'#d3d3d3',
        marginRight:10/standarWidth*width,
    },







    //khung môn học ,nơi dùng để chọn môn học trong trang home





    home_monhoc:{
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'blue',
        paddingBottom:6/standardHeight*height,
        paddingTop:1/standardHeight*height,
    },
    home_danhsachmonhoc:{
        width:'95%',
        backgroundColor:'#F9F9F9',
        borderRadius:10/standarWidth*width,
        marginTop:18/standardHeight * height,
        flexDirection:'column',
        overflow:'scroll',
        paddingBottom:30/standardHeight * height,
        paddingTop:10/standardHeight * height
    },
    home_khunglophoc:{
        height:55/standardHeight*height,
        flex:1,
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
        flex:1
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





    //khung này dùng để chỉnh cho trang đăng ký đăng nhập

    dkdn_container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fcd485'
    },
    dkdn_scrollview:{
        width:'95%',
        // backgroundColor:'red',
    },
    dkdn_khungchugioithieu:{
        width:'95%',
        height:70/standardHeight*height,
        // backgroundColor:'green',
        
    },
    dkdn_chugioithieu:{
        fontFamily:'Time new roman',
        fontSize:17,
        fontWeight:'bold',
        color:'#030303',
        textAlign:'center'
    },
    dkdn_formdkdn:{
        width:'95%',
        marginTop:10/standardHeight*height,
        marginBottom:20/standarWidth*width,
        paddingBottom:20/standardHeight*height,
        backgroundColor:'white',
        borderTopLeftRadius:15/standarWidth*width,
        borderTopRightRadius:15/standarWidth*width,
        borderBottomLeftRadius:15/standarWidth*width,
        borderBottomRightRadius:15/standarWidth*width,
    },
    dkdn_khungbuttondkdn:{
        flex:1,
        flexDirection:'row',
        width:'100%',
        height:60/standardHeight*height,
        borderTopLeftRadius:15/standarWidth*width,
        borderTopRightRadius:15/standarWidth*width,
        backgroundColor:'#d9dadb',
        justifyContent:'center',
        alignItems:'center'
    },
    dkdn_khungbutton:{
        flex:1,
        // justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:'pink',
        // opacity:0.6
    },
    dkdn_buttondk:{
        height:'100%',
        width:'100%',
        // borderColor:'#ff57352A',
        // borderRightWidth:2,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'blue'
    },
    dkdn_buttondn:{
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'green'
    },
    dkdn_Chubutton:{
        width:'100%',
        fontWeight:'bold',
        fontSize:18/standarWidth*width,
        fontFamily:'Times New Roman Georgia',
        borderColor:'#969696',
        borderRightWidth:2,
        textAlign:'center'
    },
    dkdn_Chubuttonkhongborder:{
        borderRightWidth:0,
    },
    dkdn_khungthongtindkdn:{
        width:'100%',
        // backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
    },
    dkdn_khungdkdn_fb_gg:{
        width:'90%',
        height:150/standardHeight*height,
        // backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor:'#bfbfbf',
        borderBottomWidth:2/standarWidth*width,
    },
    dkdn_khungbuttonfb:{
        width:'100%',
        flex:1,
        // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    },
    dkdn_khungbuttongg:{
        width:'100%',
        flex:1,
        // backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center'
    },
    dkdn_buttonfb:{
        flexDirection:'row',
        width:'100%',
        height:'60%',
        borderRadius:70/standarWidth*width,
        backgroundColor:'#4267B2',
        justifyContent:'center',
        alignItems:'center'
    },
    dkdn_buttongg:{
        flexDirection:'row',
        width:'100%',
        height:'60%',
        borderRadius:70/standarWidth*width,
        backgroundColor:'#fbbc05',
        justifyContent:'center',
        alignItems:'center'
    },
    dkdn_khungiconfb:{
        width:30/standarWidth*width,
        height:28/standardHeight*height,
        backgroundColor:'white',
        borderRadius:1000,
        justifyContent:'center',
        alignItems:'center',
    },
    dkdn_iconfb:{
        width:'90%',
        height:'90%',
        // borderRadius:1,
        marginTop:4/standarWidth*width,
        // backgroundColor:'red'
    },
    dkdn_icongg:{
        width:'90%',
        height:'79%',
    },
    dkdn_chufb:{
        fontFamily:'Times New Roman Georgia',
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    },
    dkdn_khungbocucfb:{
        flex:1,
        justifyContent:'center',
        paddingLeft:10
    },
    dkdn_chucuyentiep:{
        backgroundColor:'white',
        fontWeight:'800',
        fontSize:14/standarWidth*width,
        color:'#969694',
        marginBottom:-10/standarWidth*width,
        width:150/standarWidth*width,
        height:20/standarWidth*width,
        textAlign:'center'
    },
    dkdn_khungdienthongtin:{
        marginTop:10,
        width:'90%',
        // backgroundColor:'green'
    },
    dkdn_khungdien:{
        width:'100%',
        // marginTop:5/standardHeight*height,
        height:70/standardHeight*height,
        // backgroundColor:'pink'
    },
    dkdn_tieudekhungdien:{
        color:'#07c6c0ef',
        fontSize:12/standarWidth*width,
        // backgroundColor:'blue',
        
    },
    dkdn_tieudeloi:{
        color:'#962222',
        fontSize:12/standarWidth*width,
        marginTop:5/standardHeight*height,
        // backgroundColor:'yellow',
    },
    dkdn_textinput:{
        color:'black',
        fontSize:16/standarWidth*width,
        borderBottomWidth:2,
        borderBottomColor:'#07c6c0ef',
        paddingBottom:2/standardHeight*height,
        paddingTop:2/standardHeight*height,
        // backgroundColor:'blue',

    },
    dkdn_buttonchonlop:{
        alignItems:'center',
        // backgroundColor:'red',
        flexDirection:'row',
        height:40/standardHeight*height,
    },
    dkdn_iconchonlop:{
        fontSize:28/standarWidth*width,
        // flex:1,
        // backgroundColor:'purple',
        position:'absolute',
        marginLeft:'90%',
    },
    dkdn_textinputchonlop:{
        flex:10
    },
    dkdn_khungbuttondangki:{
        alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'red'
    },
    dkdn_buttondangki:{
        height:'70%',
        width:'100%',
        borderRadius:1000,
        backgroundColor:'#fcd485',
        alignItems:'center',
        justifyContent:'center',
    },
    dkdn_chubuttondangki:{
        fontSize:19/standarWidth*width,
        color:'#07c6c0ef',
        fontWeight:'bold'
    },
    dkdn_khungmatkhau:{
        flexDirection:'row',
    },
    dkdn_khungiconmatkhau:{
        // backgroundColor:'purple',
        position:'absolute',
        marginLeft:'90%'
    },
    dkdn_iconmatkhau:{
        fontSize:20/standarWidth*width,
        color:'#a8a8a8',
    },


    //khung hiện lên khi nhấn chọn lớp

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
    dkdn_khungquenmatkhau:{
        marginTop:10/standardHeight*height,
        height:30/standardHeight*height,
        width:'90%',
        // backgroundColor:'green',
        alignItems:'center',
        justifyContent:'center',
    },
    dkdn_chu_quenmatkhau:{
        fontSize:18/standarWidth*width,
        fontWeight:'bold',
        color:'#ffbc59',

    },
    dkdn_khung_dien_quenmatkhau:{
        height:'100%',
        width:'100%',
        // backgroundColor:'blue',
        alignItems:'center',
        paddingTop:20/standardHeight*height,

    },
    dkdn_khungquenmatkhau_tieude:{
        height:'10%',
        width:'87%',
        // backgroundColor:'white'
    },
    dkdn_khungquenmatkhau_email:{
        flexDirection:'row',
        width:'90%',
        // backgroundColor:'green',
        marginTop:10/standardHeight*height,
    },
    dkdn_khungnhapemail:{
        flex:8,
        backgroundColor:'#efefef',
        borderRadius:20/standarWidth*width,
        borderColor:'#383838',
        borderWidth:2,
        paddingLeft:20/standarWidth*width,
        fontSize:18/standarWidth*width,

    },
    dkdn_buttongui:{
        flex:2,
        // backgroundColor:'yellow',
        alignItems:'center',
        justifyContent:'center',
        
    },
    dkdn_iconsend:{
        fontSize:35,
        color:'#09aeef'
    }

});

export default styles; 