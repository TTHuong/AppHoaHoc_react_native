import React, { Component} from 'react'
import {
ImageBackground,StyleSheet,StatusBar,View,ScrollView,Text,Button,TextInput,
SafeAreaView,Image,TouchableOpacity,FlatList,Dimensions,ActivityIndicator,Keyboard, ToastAndroid,
RefreshControl ,
} from 'react-native';
import Styles from "../style/style_lambaikiemtra";
import {firebaseApp} from '../firebaseconfig/firebaseconfig';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from "./RBSheet";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
getDataLop,getDataMonHoc,
} from "./KiemtraData";
import MD5 from "react-native-md5";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import VideoPlayer from 'react-native-video-controls';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Value } from 'react-native-reanimated';


const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 592;
const data=[
    "ksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhj  ksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhjksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhjksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhjksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhjksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhjksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhj  ","ksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhj    ","ksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhj    ","ksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhj    ","ksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhj    ","ksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhj    ","ksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhj    ","ksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhj    ","ksdjfhjkdfjhdfjhdffghfgjhghjkyhkhjkhj    "
]
export default class LamKiemtra extends Component {
    constructor(props){
        super(props);
        this.state={
            BaiKiemTra:this.props.route.params.BaiKiemTra,
            numbercolumn:4,
            chieucao:100,

            cauhoi:null,
            dapan:null,
            dapandung:null,
            cautraloi:null,
            sodapan:null,

            refreshing:false,

            nopbai:false,

            tongdiem:0,

        };
    }

    tachmang(){
        var cauhoi=this.state.BaiKiemTra.cauhoi;
        var dapan=this.state.BaiKiemTra.dapan;
        var trangthai=0;

        var Arraycauhoi=[];
        var Arraysodapan=[];
        var Arraydapan=[]; 
        var Arraydapandung=[];

        var tempcauhoi='';
        var tempdapan='';
        var tempsodapan="";

        for(var i=0;i<cauhoi.length;i++){
            if(cauhoi[i]=='|'){
                
                if(trangthai==0){
                    trangthai=1;
                }
                else if(trangthai==1){
                    trangthai=0;
                    Arraycauhoi.push(tempcauhoi);
                    tempcauhoi="";
                }

            }
            else if(cauhoi[i]=='$'){
                if(trangthai==0){
                    trangthai=2;
                }
                else if(trangthai==2){
                    trangthai=0;
                    Arraysodapan.push(tempsodapan);
                    tempsodapan="";
                }
            }
            else if(cauhoi[i]=='#'){
                if(trangthai==0){
                    trangthai=3;
                }
                else if(trangthai==3){
                    trangthai=0;
                    Arraydapan.push(tempdapan);
                    tempdapan="";
                }
            }
            else{
                if(trangthai==1){
                    tempcauhoi+=cauhoi[i];
                }
                else if(trangthai==2){
                    tempsodapan+=cauhoi[i];
                }
                else if(trangthai==3){
                    tempdapan+=cauhoi[i];
                }
            }
        }

        trangthai=0;
        tempdapan="";

        for(var i=0;i<dapan.length;i++){
            if(dapan[i]=='#'){
                
                if(trangthai==0){
                    trangthai=2;
                }
                else if(trangthai==2){
                    trangthai=0;
                    Arraydapandung.push(tempdapan);
                    tempdapan="";
                    // console.log("đap an ne "+tempdapan);
                }

            }
            else{
                if(trangthai==2){
                    tempdapan+=dapan[i];
                }
            }
        }

        this.setState({
            cauhoi:Arraycauhoi,
            dapan:Arraydapan,
            dapandung:Arraydapandung,
            sodapan:Arraysodapan,
        });
        
    }

    chondapan(value,index){
        var co_temp=true;
        var mangcautraloi=this.state.cautraloi;
        // console.log("mang cau hoi ne "+mangcautraloi);
        if(mangcautraloi!=null){
            // console.log("chay vo 1");
            for(var i =0;i<mangcautraloi.length;i++){
                if(index==mangcautraloi[i].value){
                    var temp={
                        label:value,
                        value:index
                    };
                    mangcautraloi[i]=temp;
                    co_temp=false;
                    // console.log("value dap an "+mangcautraloi[i].value);
                    break;
                }
            }

            if(co_temp==true){
                mangcautraloi.push({
                    label:value,
                    value:index,
                });
            }
        }
        else{
            mangcautraloi=[];
            // console.log("chay vo 2");
            mangcautraloi.push({
                label:value,
                value:index,
            });
        }

        mangcautraloi.sort(function (a,b){
            if(a.value<b.value)return -1;
            if(a.value>b.value)return 1;
            return 0;
        });

        // mangcautraloi.forEach(item => {
        //     console.log("label "+item.label+ " value "+item.value);
        // });

        this.setState({
            cautraloi:mangcautraloi,
        })
        // console.log("label "+value+ " value "+index);
    }

    chambai(){
        var tongdiem=0;
        var mangcautraloi=this.state.cautraloi; 
        var mangdapandung=this.state.dapandung;
        var diemmoicau=10/mangdapandung.length;

        // console.log("diem oi cau "+diemmoicau+" mang dap an dung "+mangdapandung.length);

        if(mangcautraloi!=null){
            for(var i=0;i<mangcautraloi.length;i++)
            {
                var vt=mangcautraloi[i].value;
                if(mangcautraloi[i].label==mangdapandung[vt]){
                    tongdiem+=diemmoicau;
                }

                // console.log("diem oi cau "+diemmoicau+" mang dap an dung "+mangdapandung.length);
            }

            this.setState({
                tongdiem:Math.ceil(tongdiem),
                nopbai:true,
            })
        }

        // mangdapandung.forEach(element => {
        //     // console.log("mang dap an dung "+element)
        // });
    }

    lamlai(){
        this.setState({
            nopbai:false,
        });
    }

    componentDidMount(){
        this.tachmang();
    }

    FlatListFooter=()=>{
        return(
            <View style={{
                width:'100%',
                // backgroundColor:'red',
            }}>
                <View style={Styles.khung_nop}>
                    <View style={Styles.item_khung}>
                        <TouchableOpacity style={Styles.item} activeOpacity={0.9} onPress={()=>this.lamlai()}>
                            <Text style={Styles.cauhoi}>
                                Làm Lại
                            </Text>
                            <Image resizeMode="stretch" 
                                style={Styles.item_image} 
                                source={require("../image/again.png")}/>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.item_khung}>
                        <TouchableOpacity style={Styles.item} activeOpacity={0.9} onPress={()=>this.chambai()}>
                            <Text style={Styles.cauhoi}>
                                Nộp Bài
                            </Text>
                            <Image resizeMode="stretch" 
                                style={Styles.item_image} 
                                source={require("../image/submit.png")}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    (()=>{
                        if(this.state.nopbai){
                            return(
                                <View style={{
                                    width:width,
                                    // backgroundColor:'blue',
                                    alignItems:'center',
                                    justifyContent:'center'
                                }}>
                                    <View style={Styles.khungdiem}>
                                        <View style={{
                                            width:'100%',
                                            // backgroundColor:'black',
                                            height:28/standardHeight*height,
                                            alignItems:'flex-end',
                                        }}>
                                            <Image resizeMode="stretch" 
                                                style={Styles.note_image} 
                                                source={require("../image/note.png")}/>
                                        </View>
                                        <View style={Styles.item_header}>
                                            <Text style={Styles.tongdiem}>
                                                {this.state.tongdiem}
                                            </Text>
                                            <Image resizeMode="stretch" 
                                                style={Styles.diem_image} 
                                                source={require("../image/diem.png")}/>
                                        </View>
                                        <Text style={Styles.item_noidung}>
                                                {this.state.BaiKiemTra.noidung}
                                        </Text>
                                    </View>
                                </View>
                            );
                        }
                        else{
                            return(
                                <View>

                                </View>
                            );
                        }
                    })()
                }
            </View>
        )
    }

    render() {
        return (
            <ImageBackground resizeMode='stretch' source={require('../image/nen.png')} style={[ Styles.container,{alignItems:'center',justifyContent:'center'} ]}>
                {/* {(()=>console.log("toi r ne "))()} */}
                <FlatList
                    contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
                    style={Styles.container}
                    showsVerticalScrollIndicator={false}
                    data={this.state.cauhoi}
                    ListFooterComponent={this.FlatListFooter}
                    renderItem={({item,index})=>
                        <View style={[Styles.khungitem]}>
                            {/* {(()=>console.log("toi r ne "))()} */}
                            <View style={{
                                // backgroundColor:'blue',
                                width:'100%',
                            }}>
                                <Text style={Styles.cauhoi}  allowFontScaling={true}>
                                   {index+1} . {item}
                                </Text>
                            </View>
                            {
                                (()=>{
                                    var sodapan=this.state.sodapan;
                                    var dapan=this.state.dapan;
                                    var socot=false;

                                    var tongsodapan=0;
                                    var temp=[];
                                    // console.log('index '+index);
                                    for(var y=0;y<index;y++){
                                        tongsodapan+=parseInt(sodapan[y]);
                                        // console.log("tong so da an trong for "+tongsodapan+ " so dap an "+parseInt(sodapan[index]) + " bi tri i "+y);
                                    }
                                    // console.log('tong so dap an '+tongsodapan);
                                    var diemcuoi=parseInt(tongsodapan)+parseInt(sodapan[index]);
                                    // console.log("vi tri "+diemcuoi);

                                    var dem=0;
                                    for(var z=tongsodapan;z<diemcuoi;z++)
                                    {
                                        temp.push({
                                            label:dapan[z],
                                            value:dapan[z],
                                        });
                                        dem++;

                                        // console.log("dapan[z] "+dapan[z] +"so z "+z);
                                    }

                                    temp.forEach(item=>{
                                        if(item.label.length <= 6){
                                            socot=true;
                                        }
                                    })

                                    return(
                                        <View disabled={true} style={{
                                            width:'100%',
                                            // backgroundColor:'blue',
                                        }}>
                                                {
                                                    (()=>{
                                                        if(this.state.nopbai){
                                                            return(
                                                                <TouchableOpacity activeOpacity={1}  style={{
                                                                    width:'100%',
                                                                    backgroundColor:'transparent',
                                                                    zIndex:100,
                                                                    position:'absolute',
                                                                    height:'100%',
                                                                }}>

                                                                </TouchableOpacity>
                                                            );
                                                        }
                                                    })()
                                                }
                                                <RadioForm
                                                    buttonSize={17}
                                                    style={Styles.radiobutton}
                                                    radio_props={temp}
                                                    initial={-1}
                                                    selectedButtonColor="#fccb76"
                                                    formHorizontal={socot}
                                                    labelHorizontal={true}
                                                    buttonColor={'#fccb76'}
                                                    // labelColor="black"
                                                    labelStyle={Styles.chucautraloi}
                                                    animation={false}
                                                    onPress={(value) => this.chondapan(value.toString(),index)}
                                                />
                                                
                                                {
                                                    (()=>{
                                                        if(this.state.nopbai){
                                                            return(
                                                                <View style={Styles.khungdapan_dung}>
                                                                    <Image resizeMode="stretch" 
                                                                        style={Styles.check_image} 
                                                                        source={require("../image/check.png")}/>
                                                                    <Text style={Styles.item_text}>
                                                                        {this.state.dapandung[index]}
                                                                    </Text>
                                                                </View>
                                                            );
                                                        }
                                                        else{
                                                            return(
                                                                <View>
                                                                </View>
                                                            );
                                                        }
                                                    })()
                                                }
                                        </View>
                                        
                                        
                                        // <FlatList
                                            
                                        //     numColumns={socot}
                                        //     showsVerticalScrollIndicator={false}
                                        //     contentContainerStyle={{justifyContent:'center'}}
                                        //     data={temp}
                                        //     renderItem={({item,index})=>
                                        //         <TouchableOpacity style={Styles.khungdapan} onPress={()=>this.chondapan(item)}>
                                        //             <View style={[Styles.khunglickdapan]}>

                                        //             </View>
                                        //             <Text style={Styles.chucautraloi} allowFontScaling={true}>
                                        //                 {item.dapan}  {item.causo}
                                        //             </Text>
                                        //         </TouchableOpacity>
                                        //     }
                                        // />
                                    )
                                })()
                            }
                        </View>
                    }/>
                {/* <ScrollView style={Styles.container}>
                    {
                        (()=>{
                            if(this.state.cauhoi!=null){
                                var cauhoi=this.state.cauhoi;
                                for(var i=0;i<cauhoi.length;i++){
                                    console.log(cauhoi[i]);
                                    return(
                                        <View style={[Styles.khungitem]}>
                                            <Text style={{fontSize:13}}  allowFontScaling={true}>
                                                {cauhoi[i]}
                                            </Text>
                                            {
                                                (()=>{
                                                    var sodapan=this.state.sodapan;
                                                    var dapan=this.state.dapan;

                                                    var tongsodapan=0;
                                                    var temp=[];

                                                    for(var y=0;y<i;y++){
                                                        tongsodapan+=sodapan[i];
                                                    }
                                                    for(var z=tongsodapan;z<tongsodapan+sodapan[i];z++)
                                                    {
                                                        temp.push({
                                                            causo:i,
                                                            dapan:dapan[z],
                                                        })
                                                    }
                                                    return(
                                                        <FlatList
                                                            numColumns={4}
                                                            showsVerticalScrollIndicator={false}
                                                            contentContainerStyle={{justifyContent:'center'}}
                                                            data={temp}
                                                            renderItem={({item,index})=>
                                                                <Text>
                                                                    {item.dapan}
                                                                </Text>
                                                            }
                                                        />
                                                    )
                                                })()
                                            }
                                        </View>
                                    )
                                }
                            }
                        })()
                    }
                </ScrollView> */}
                

            </ImageBackground>
        );
    }

}
