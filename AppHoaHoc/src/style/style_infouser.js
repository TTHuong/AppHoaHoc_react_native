import React,{Component} from 'react';
import {
StyleSheet,Dimensions,View,Text,Alert,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 592;

const Styles=StyleSheet.create({
    hinhnen:{
        width:width,
        height:height,
        // alignItems:'center',
        // justifyContent:'center',

    },
    scrollview:{
        width:'100%',
        height:'100%',
        // backgroundColor:'red'
    },
    khungback:{
        // backgroundColor:'yellow',
        zIndex:2,
        width:'17%',
        height:55/standardHeight*height,
        marginTop:170/standardHeight*height,
        position:'absolute',
        // marginLeft:-2/standarWidth*width,
    },
    backscreen:{
        width:'100%',
        height:'100%',
        backgroundColor:'white',
        borderTopRightRadius:1000,
        borderBottomRightRadius:1000,
        borderColor:'#f9be57',
        borderWidth:2/standarWidth*width,
        alignItems:'center',
        justifyContent:'center',
    },
    iconback:{
        color:'#f9be57',
        fontWeight:'bold',
        fontSize:29/standarWidth*width,
    },
    khunganhnen:{
        width:'100%',
        height:150/standardHeight*height,
        backgroundColor:'white',
        borderColor:'white',
        borderBottomWidth:2/standarWidth*width,
        marginBottom:60/standardHeight*height,

    },
    hinhnencanhan:{
        width:'100%',
        height:'100%',
        
    },
    khungiconcamerahinhnen:{
        position:'absolute',
        zIndex:2,
        marginLeft:'83%',
        marginTop:8/standardHeight*height,
        backgroundColor:'#e8e6e1',
        width:17/standarWidth*width,
        height:37/standardHeight*height,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10/standarWidth*width,
    },
    iconcamerahinhnen:{
        fontSize:25/standarWidth*width,
        color:'#f9be57',
    },
    tieudekhungchonanh:{
        flex:1,
        flexDirection:'row',
        // backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
        // position:'absolute',
        zIndex:2,
    },
    khungtieude:{
        width:'90%',
        height:'80%',
        // backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#e0d5d5',
        borderBottomWidth:3
    },
    tieude:{
        fontSize:17/standarWidth*width,
        fontWeight:'bold',
        color:'#565656',
    },
    khungchonhinh:{
        flex:10,
        // backgroundColor:'yellow',
        alignItems:'center',
        justifyContent:'center',
    },
    scrollview_dsanh:{
        flex:1,
        // backgroundColor:'green'
    },
    khungitemanh:{
        height:120/standardHeight*height,
        width:120/standarWidth*width,
        borderColor:'white',
        borderWidth:1,
        backgroundColor:'#eadada'
    },
    itemanh:{
        width:'100%',
        height:'100%',
    },
    khungphu_anh:{
        position:'absolute',
        zIndex:2,
        height:120/standardHeight*height,
        width:120/standarWidth*width,
        // backgroundColor:'red',
        // alignItems:'center',
        // justifyContent:'center',
    },
    phu_anh:{
        flex:1,
        opacity:0.4,
        backgroundColor:'#bababa',

    },  
    iconselect:{
        position:'absolute',
        zIndex:2,
        fontSize:36/standarWidth*width,
        color:'#f99b20',
        margin:40/standarWidth*width,

    },
    khungbuttonluu:{
        position:'absolute',
        zIndex:2,
        height:50/standardHeight*height,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        // marginTop:400/standardHeight*height,
        // backgroundColor:'blue'
    },
    buttonluu:{
        height:'100%',
        width:'85%',
        borderRadius:20/standarWidth*width,
        backgroundColor:'#f9b357',
        borderWidth:2,
        borderColor:'white',
        alignItems:'center',
        justifyContent:'center',
    },
    chubuttonluu:{
        fontSize:26/standarWidth*width,
        fontWeight:'bold',
        color:'white'
    },
    khungavata:{
        width:'80%',
        height:120/standardHeight*height,
        // backgroundColor:'red',
        position:'absolute',
        zIndex:2,
        marginTop:80/standardHeight*height,
        marginBottom:50,
        // alignItems:'flex-end',
        // justifyContent:'flex-end',
    },
    avata:{
        width:'44%',
        height:'100%',
        borderRadius:1000,
        borderColor:'#ffffff',
        borderWidth:3,
        marginLeft:'42%',
        backgroundColor:'#2788be'
    },
    doiavata:{
        position:'absolute',
        zIndex:6,
        marginLeft:220/standarWidth*width,
        marginTop:10/standardHeight*height,
        backgroundColor:'#e8e6e1',
        width:40/standarWidth*width,
        height:37/standardHeight*height,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:1000,
    },
    containerformthongtin:{
        flex:1,
        // backgroundColor:'green',
        alignItems:'center',
        justifyContent:'center',
    },
    formthongtin:{
        width:'95%',
        marginBottom:50/standardHeight*height,
        paddingBottom:50/standardHeight*height,
        paddingTop:20/standardHeight*height,
        backgroundColor:'white',
        borderRadius:10/standardHeight*width,
        alignItems:'center',
        justifyContent:'center',

    },
    tieudethongtin:{
        width:'95%',
        height:30/standardHeight*height,
        // backgroundColor:'yellow',
        justifyContent:'center',
        // paddingLeft:20/standarWidth*width
    },
    title:{
        fontWeight:'bold',
        fontSize:18/standarWidth*width,
        color:'black',
    },
    khungnhapthongtin:{
        width:'95%',
        // height:60/standardHeight*height,
        marginBottom:5/standardHeight*height,
        marginTop:5/standardHeight*height,
        borderRadius:10/standardHeight*height,
        borderColor:'#DDDDDD',
        borderWidth:2,
        // backgroundColor:'red',
    },  
    khungthongtin:{
        width:300/standarWidth*width,
        height:60/standardHeight*height,
        // backgroundColor:'blue',
        justifyContent:'center',
        paddingLeft:10/standarWidth*width,
        // borderRightWidth:3
    },
    thongtin:{
        fontSize:22,
        fontWeight:'800',
        color:'#939393',
        // backgroundColor:'purple',
    },
    khungiconchuyentiep:{
        width:30/standarWidth*width,
        height:60/standardHeight*height,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red'

    },
    iconchuyentiep:{
        fontSize:70,
        fontWeight:'bold',
        color:'#f9be57',
    },
    khungnhap:{
        width:300/standarWidth*width,
        height:60/standardHeight*height,
        // backgroundColor:'blue',
        justifyContent:'flex-end',
        alignItems:'center',
        flexDirection:'row',
    },
    textinput:{
        height:'90%',
        backgroundColor:'#e8e5e5',
        width:'97%',
        paddingLeft:10/standarWidth*width,
        paddingRight:30/standarWidth*width,
        fontSize:22/standarWidth*width,
        borderRadius:10/standarWidth*width,
        marginLeft:3/standarWidth*width,
        marginRight:5/standarWidth*width,
        color:'#013349'
    },
    khunghuybutton:{
        width:50/standarWidth*width,
        height:'90%',
        // backgroundColor:'blue',
        position:'absolute',
        zIndex:2,
    },
    frame_touchableopacity:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'flex-end',
        // backgroundColor:'yellow',
        paddingRight:17/standarWidth*width,
    },
    iconhuy:{
        fontSize:25/standarWidth*width,
        color:'#D3261A',

    },
    textlop:{
        height:'90%',
        backgroundColor:'#e8e5e5',
        width:'97%',
        paddingTop:13/standarWidth*width,
        paddingLeft:10/standarWidth*width,
        fontSize:22/standarWidth*width,
        borderRadius:10/standarWidth*width,
        marginLeft:3/standarWidth*width,
        marginRight:5/standarWidth*width,
        color:'#013349'
    },
    khungchonlop:{
        position:'absolute',
        zIndex:2,
        width:'100%',
        height:'100%',
        // backgroundColor:'red',
        alignItems:'flex-end',
        justifyContent:'center',
        paddingRight:19/standarWidth*width,
    },
    iconchonlop:{
        fontSize:25/standarWidth*width,
        color:'#f9a82f',
        // backgroundColor:'red'
    },
    luuthaydoi:{
        width:"95%",
        height:60/standardHeight*height,
        borderRadius:10/standardHeight*height,
        // backgroundColor:'red',
        marginTop:20/standardHeight*height,
        alignItems:'center',
        justifyContent:'center',
    },
    textluuthaydoi:{
        fontSize:27/standarWidth*width,
        color:'#352301',
        fontWeight:'bold'
    },
    text:{
        fontSize:100,
        fontWeight:'bold'
    }
});

export default Styles;

// export function thongbao(){
//     console.log('dcne');
// }
// export class Tao extends Component{
//     render(){
//         return(
//             <View>
//                 <Text> goi dc ne </Text>
//             </View>
//         )
//     }
// }