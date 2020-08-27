import React, { Component,createRef} from 'react'
import {
ImageBackground,StyleSheet,StatusBar,View,ScrollView,Text,Button,TextInput,Dimensions,
SafeAreaView,Image,TouchableOpacity,FlatList,TouchableHighlight,Animated,Easing,Alert,


} from 'react-native';
import Styles from '../style/styles';
import {firebaseApp} from '../firebaseconfig/firebaseconfig';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RBSheet from "./RBSheet";
import EmailSender from 'react-native-smtp';
import {
SendEmailResetPassword,getDataLop,
} from "./KiemtraData";
import MD5 from "react-native-md5";
import { functions } from 'firebase';

const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 592;
let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default class Dangky_Dangnhap extends Component {
    constructor(props){
        super(props);
        this.state={
            lop:'Lớp ',
            tieude:'',
            active_dkdn:this.props.route.params.active_dk,

            tendaydu:'',
            emaildk:'',
            matkhaudk:'',

            emaildn:'',
            matkhaudn:'',

            placeholder:{tendaydu:'Tên đầy đủ',emaildk:'Email',matkhaudk:'Mật khẩu',emaildn:'Email',matkhaudn:'Mật khẩu'},
            tieudeform:{tendaydu:'Tên đầy đủ',emaildk:'Email',matkhaudk:'Mật khẩu',emaildn:'Email',matkhaudn:'Mật khẩu'},
            active_matkhaudk:true,
            active_matkhaudn:true,
            hieuung:{
                domo1:new Animated.Value(0),
                chieusau1:new Animated.Value(-(width+50)),
                domo2:new Animated.Value(0),
                chieusau2:new Animated.Value(-(width+50)),
                domo3:new Animated.Value(0),
                chieusau3:new Animated.Value(-(width+50)),

                domo4:new Animated.Value(0),
                chieusau4:new Animated.Value(-(width+50)),
                domo5:new Animated.Value(0),
                chieusau5:new Animated.Value(-(width+50)),

                domoconmathiendk:new Animated.Value(1),
                domoconmatandk:new Animated.Value(0),

                domoconmathiendn:new Animated.Value(1),
                domoconmatandn:new Animated.Value(0),

            },
            loi_tendaydu:'',
            loi_emaildk:'',
            loi_matkhaudk:'',
            loi_lop:'',

            loi_matkhaudn:'',
            loi_emaildn:'',

            loi_quenmatkhau:"",
            
            doimauinputlop:false,
            buttonlop:'Lớp ',
            
            quenmatkhau:"",

            DataLop:[],

        };
    }
    
    componentDidMount(){
        if(this.state.active_dkdn)
        {
            this.setState({
                tieude:"Đăng kí tài khoản Ong Chemistry và truy cập kho tài liệu học tập khổng lồ để #Học vui #Học tốt cùng nhà Ong! ",
    
            });
        }else{
            this.setState({
                tieude:"Đăng nhập vào Ong Chemistry để #Họcvui #Họcchất",
    
            });
        }
        this.loadDataLop();
    }

    loadDataLop(){
        this.setState({
            DataLop : getDataLop(),
        });
    }

    luulop(){
        this.setState({
            lop:this.state.buttonlop,
            loi_lop:'',
        });
        this.ChonLop.close();
    }

    doimaubutton(tenlop){
        this.setState({
            buttonlop:tenlop,
        })
    }

    bangchonlop=()=>{
        this.setState({
            doimauinputlop:true,
        });
        this.ChonLop.open()
    }

    kiemtraemail=(tenchucnang,text)=>{
        if (reg.test(text) === false) {
            if(tenchucnang=="dk"){
                this.setState({ 
                    emaildk: text,
                    loi_emaildk:'Vui lòng nhập đúng dạng email *' 
                })
            }
            else{
                this.setState({ 
                    emaildn: text,
                    loi_emaildn:'Vui lòng nhập đúng dạng email *' 
                })
            }
            return false;
          }
        else {
            if(tenchucnang=="dk"){
                this.setState({ 
                    emaildk: text,
                    loi_emaildk:'' 
                })
            }else{
                this.setState({ 
                    emaildn: text,
                    loi_emaildn:'' 
                })
            }
          }
    }

    dien_tendaydudk(val){
        this.setState({
            tendaydu:val
        })
        if(this.state.tendaydu!="")
        {
            this.setState({
                loi_tendaydu:''
            })
        }
    }

    dien_matkhaudk(tenchucnang,val){
        if(tenchucnang=="dk"){
            this.setState({
                matkhaudk:val,
            })
            if(this.state.matkhaudk!="")
            {
                if(this.state.matkhaudk.length <= 4){
                    this.setState({
                        loi_matkhaudk:'Vui lòng nhập mật khẩu có ít nhất 6 ký tự * ',
                    })
                }else{
                    this.setState({
                        loi_matkhaudk:'',
                    })
                }
                
            }
        }
        else{
            this.setState({
                matkhaudn:val,
            })
            if(this.state.matkhaudn!="")
            {
                if(this.state.matkhaudn.length <= 4){
                    this.setState({
                        loi_matkhaudn:'Vui lòng nhập mật khẩu có ít nhất 6 ký tự * ',
                    })
                }else{
                    this.setState({
                        loi_matkhaudn:'',
                    })
                }
                
            }
        }
    }
    dangki(){
        if(this.state.tendaydu=="")
        {
            this.setState({
                loi_tendaydu:'Vui lòng nhập tên thật * ',
            })
        }
        

        if(this.state.emaildk=="")
        {
            this.setState({
                loi_emaildk:'Vui lòng email * ',
            })
        }
        

        if(this.state.matkhaudk=="")
            {
                this.setState({
                    loi_matkhaudk:'Vui lòng nhập mật khẩu * ',
                })
            }
        
        
        if(this.state.lop=="Lớp ")
            {
                this.setState({
                    loi_lop:'Vui lòng chọn lớp học * ',
                })
            }
        
        
        if(this.state.matkhaudk!=""){
            if(this.state.matkhaudk.length<4)
            {
                this.setState({
                    loi_matkhaudk:'Vui lòng nhập mật khẩu có ít nhất 6 ký tự * ',
                })
            }
            else
            {
                this.setState({
                    loi_matkhaudk:'',
                })
            }
        }

        if(this.state.tendaydu!="" && this.state.loi_matkhaudk=="" && this.state.loi_emaildk=="" && this.state.emaildk!="" && this.state.matkhaudk!="" && this.state.lop!="Lớp "){
           
            var userId ;
            firebaseApp.auth()
            .createUserWithEmailAndPassword(this.state.emaildk, this.state.matkhaudk)
            .then(()=>{
                // Alert.alert(
                //     'Thông báo',
                //     'đăng ký thành công '+this.state.emaildk,
                //     [
                //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                //     {text: 'Cancel',onPress: () => console.log('Cancel Pressed'),style: 'cancel',},
                //     {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
                //     ],
                //     {cancelable: false},
                // )
                
                firebaseApp.database().ref('taikhoan').child(MD5.hex_md5(this.state.emaildk)).set({
                    tendaydu:this.state.tendaydu,
                    lop:this.state.lop,
                    quyenhan:'user',
                    avata:'https://firebasestorage.googleapis.com/v0/b/reactnative1-aa91e.appspot.com/o/%E1%BA%A3nh%20c%E1%BB%A5c%20b%E1%BB%99%2Favata.png?alt=media&token=b7cc08ac-78e7-4748-81e2-d7b4dfc6bd5d',
                    nen:'https://firebasestorage.googleapis.com/v0/b/reactnative1-aa91e.appspot.com/o/%E1%BA%A3nh%20c%E1%BB%A5c%20b%E1%BB%99%2Fnen.png?alt=media&token=eba72569-d968-4aa3-a55c-9c75a9ee6116',
                });

                this.props.navigation.navigate('Home');

            })
            .catch(function(error) {
                // if(error.message=="Password should be at least 6 characters")
                // {
                //     Alert.alert(
                //         'Thông báo đăng ký không thành công !',
                //         'Tài khoản này đã tồn tại',
                //     )
                // }
                Alert.alert(
                    'Thông báo đăng ký không thành công !',
                    'Tài khoản này đã tồn tại',
                    // [
                    // // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    // {text: 'không',onPress: () => console.log('Cancel Pressed')},
                    // {text: 'CÓ',onPress: () => this.lala(),style: 'OK'},
                    // ],
                    // {cancelable: false},
                )
            });
        }
    }

    dangnhap(){
        if(this.state.emaildn=="")
        {
            this.setState({
                loi_emaildn:'Vui lòng email * ',
            })
        }
        

        if(this.state.matkhaudn=="")
            {
                this.setState({
                    loi_matkhaudn:'Vui lòng nhập mật khẩu * ',
                })
            }
        
        
        // if(this.state.matkhaudn!=""){
        //     if(this.state.matkhaudn.length<6)
        //     {
        //         this.setState({
        //             loi_matkhaudn:'Vui lòng nhập mật khẩu có ít nhất 6 ký tự * ',
        //         })
        //     }
        //     else
        //     {
        //         this.setState({
        //             loi_matkhaudn:'',
        //         })
        //     }
        // }

        if( this.state.loi_matkhaudn=="" && this.state.loi_emaildn=="" && this.state.emaildn!="" && this.state.matkhaudn!=""){
            firebaseApp.auth()
            .signInWithEmailAndPassword(this.state.emaildn, this.state.matkhaudn)
            .then(()=>{
                this.props.navigation.navigate('Home');

            })
            .catch(function(error) {
                Alert.alert(
                    'Thông báo đăng nhập không thành công !',
                    'Tài khoản này không tồn tại',
                )
            });
        }
    }
    onpress_dk(){
        this.setState({
            active_dkdn:true,
            tieude:"Đăng kí tài khoản Ong Chemistry và truy cập kho tài liệu học tập khổng lồ để #Học vui #Học tốt cùng nhà Ong! ",
        })
    }
    onpress_dn(){
        this.setState({
            active_dkdn:false,
            tieude:"Đăng nhập vào Ong Chemistry để #Họcvui #Họcchất",
        })
    }


    hienpass(tenchucnang){
        if(tenchucnang=="dk"){
            Animated.sequence([
                Animated.timing(
                    this.state.hieuung.domoconmathiendk,{
                        toValue:0,
                        duration:2000,
                    }
                ),
                Animated.timing(
                    this.state.hieuung.domoconmatandk,{
                        toValue:1,
                        duration:2000,
                    }
                )
            ]).start();
            this.setState({
                active_matkhaudk:false,
            });
        }
        else{
            Animated.sequence([
                Animated.timing(
                    this.state.hieuung.domoconmathiendn,{
                        toValue:0,
                        duration:2000,
                    }
                ),
                Animated.timing(
                    this.state.hieuung.domoconmatandn,{
                        toValue:1,
                        duration:2000,
                    }
                )
            ]).start();
            this.setState({
                active_matkhaudn:false,
            });
        }
    }
    anpass(tenchucnang){
        if(tenchucnang=='dk')
        {
            Animated.sequence([
                Animated.timing(
                    this.state.hieuung.domoconmathiendk,{
                        toValue:1,
                        duration:2000,
                    }
                ),
                Animated.timing(
                    this.state.hieuung.domoconmatandk,{
                        toValue:0,
                        duration:2000,
                    }
                )
            ]).start();
            this.setState({
                active_matkhaudk:true,
            })
        }else{
            Animated.sequence([
                Animated.timing(
                    this.state.hieuung.domoconmathiendn,{
                        toValue:1,
                        duration:2000,
                    }
                ),
                Animated.timing(
                    this.state.hieuung.domoconmatandn,{
                        toValue:0,
                        duration:2000,
                    }
                )
            ]).start();
            this.setState({
                active_matkhaudn:true,
            })
        }
    }
    hieu_ung(tenmang,tenthuoctinh){
        if(tenmang=="dk")
        {
            if(tenthuoctinh=="tendaydu"){
                this.setState({
                    placeholder:{tendaydu:"",emaildk:'Email',matkhaudk:'Mật khẩu'}
                });
                Animated.sequence([
                    Animated.timing(
                        this.state.hieuung.domo1,{
                            toValue:1,
                            duration:500,
                        }
                    ),
                    Animated.timing(
                        this.state.hieuung.chieusau1,{
                            toValue:0,
                            duration:900,
                            easing:Easing.bounce,
                        }
                    )
               ]).start();
            }
            else if(tenthuoctinh=="email"){
                this.setState({
                    placeholder:{tendaydu:"Tên đầy đủ",emaildk:'',matkhaudk:'Mật khẩu'}
                });
                Animated.sequence([
                    Animated.timing(
                        this.state.hieuung.domo2,{
                            toValue:1,
                            duration:500,
                        }
                    ),
                    Animated.timing(
                        this.state.hieuung.chieusau2,{
                            toValue:0,
                            duration:900,
                            easing:Easing.bounce,
                        }
                    )
               ]).start();
            }
            else if(tenthuoctinh=="matkhau"){
                this.setState({
                    placeholder:{tendaydu:"Tên đầy đủ",emaildk:'Email',matkhaudk:''}
                });
                Animated.sequence([
                    Animated.timing(
                        this.state.hieuung.domo3,{
                            toValue:1,
                            duration:500,
                        }
                    ),
                    Animated.timing(
                        this.state.hieuung.chieusau3,{
                            toValue:0,
                            duration:900,
                            easing:Easing.bounce,
                        }
                    )
               ]).start();
            }
        }
        else
        {
            
            if(tenthuoctinh=="email"){
                this.setState({
                    placeholder:{emaildn:'',matkhaudn:'Mật khẩu'}
                });
                Animated.sequence([
                    Animated.timing(
                        this.state.hieuung.domo4,{
                            toValue:1,
                            duration:500,
                        }
                    ),
                    Animated.timing(
                        this.state.hieuung.chieusau4,{
                            toValue:0,
                            duration:900,
                            easing:Easing.bounce,
                        }
                    )
               ]).start();
            }
            else if(tenthuoctinh=="matkhau"){
                this.setState({
                    placeholder:{emaildn:'Email',matkhaudn:''}
                });
                Animated.sequence([
                    Animated.timing(
                        this.state.hieuung.domo5,{
                            toValue:1,
                            duration:500,
                        }
                    ),
                    Animated.timing(
                        this.state.hieuung.chieusau5,{
                            toValue:0,
                            duration:900,
                            easing:Easing.bounce,
                        }
                    )
               ]).start();
            }
        }

       
    }

    dung_hieu_ung(tenmang,tenthuoctinh){

        this.setState({
            placeholder:{tendaydu:"Tên đầy đủ",emaildk:'Email',matkhaudk:'Mật khẩu',matkhaudn:'Mật khẩu',emaildn:'Email'}
        });

        if(tenmang=="dk")
        {
            if(tenthuoctinh=="tendaydu" && this.state.tendaydu==""){
                
                Animated.sequence([
                    Animated.timing(
                        this.state.hieuung.domo1,{
                            toValue:0,
                            duration:500,
                        }
                    ),
                    Animated.timing(
                        this.state.hieuung.chieusau1,{
                            toValue:-(width+50),
                            duration:1000,
                        }
                    )
               ]).start();
            }
            else if(tenthuoctinh=="email" && this.state.emaildk==""){

                Animated.sequence([
                    Animated.timing(
                        this.state.hieuung.domo2,{
                            toValue:0,
                            duration:500,
                        }
                    ),
                    Animated.timing(
                        this.state.hieuung.chieusau2,{
                            toValue:-(width+50),
                            duration:1000,
                        }
                    )
               ]).start();
            }
            else if(tenthuoctinh=="matkhau" && this.state.matkhaudk==""){

                Animated.sequence([
                    Animated.timing(
                        this.state.hieuung.domo3,{
                            toValue:0,
                            duration:500,
                        }
                    ),
                    Animated.timing(
                        this.state.hieuung.chieusau3,{
                            toValue:-(width+50),
                            duration:1000,
                        }
                    )
               ]).start();
            }
        }
        else
        {
            
            if(tenthuoctinh=="email" && this.state.emaildn==""){

                Animated.sequence([
                    Animated.timing(
                        this.state.hieuung.domo4,{
                            toValue:0,
                            duration:500,
                        }
                    ),
                    Animated.timing(
                        this.state.hieuung.chieusau4,{
                            toValue:-(width+50),
                            duration:1000,
                        }
                    )
               ]).start();
            }
            else if(tenthuoctinh=="matkhau" && this.state.matkhaudn==""){

                Animated.sequence([
                    Animated.timing(
                        this.state.hieuung.domo5,{
                            toValue:0,
                            duration:500,
                        }
                    ),
                    Animated.timing(
                        this.state.hieuung.chieusau5,{
                            toValue:-(width+50),
                            duration:1000,
                        }
                    )
               ]).start();
            }
        }
    }

    quenmatkhau(){
        if(this.state.emaildn!=""){
            this.setState({
                quenmatkhau:this.state.emaildn,
            })
        }
        this.Quenmatkhau.open();
    }

    sendEmail(){
        this.setState({
            loi_quenmatkhau:"",
        })

        if(this.state.quenmatkhau==""){
            this.setState({
                loi_quenmatkhau:" * không được bỏ trống * ",
            })
        }
        else if (reg.test(this.state.quenmatkhau) === false) {
            this.setState({
                loi_quenmatkhau:" * sai dạng email * ",
            })
        }
        else if(this.state.loi_quenmatkhau==""){
            firebaseApp.auth().sendPasswordResetEmail(this.state.quenmatkhau)
            .then(()=>{
                Alert.alert(
                    'Thông báo lấy lại mật khẩu !',
                    'Gửi email thành công',
                );
                this.setState({
                    quenmatkhau:"",
                });
            })
            .catch(function(error) {
                Alert.alert(
                    'Thông báo lấy lại mật khẩu !',
                    'Gửi email thất bại , không tồn tài tài khoản này ',
                )
            });

            this.setState({
                loi_quenmatkhau:"",
            });
        }
        

        //   const attachments = [
        //     RNFS.ExternalStorageDirectoryPath + '/Tracklist/file.txt',
        //     RNFS.ExternalStorageDirectoryPath + '/Tracklist/file_2.txt',
        //   ];
        // EmailSender.config({
        //     host: 'smtp.gmail.com',
        //     port: '587', // Optional. Default to 465
        //     username: 'th9663911111@gmail.com',
        //     password: '01229644204',
        //     isAuth: 'true', // Optional. Default to `true`
        //     tls: 'true' // Optional. Default to `true`
        //   });
        // const attachments = [];
        // EmailSender.send(
        //     {
        //       from: 'th9663911111@gmail.com',
        //       to: this.state.quenmatkhau,
        //       subject: 'Lấy Lại Mật Khẩu App Hóa Học',
        //       body: 'Mật Khẩu nè bạn : '
        //     },
        //     attachments, // This second parameter is mandatory. You can send an empty array.
        // );
    }

    render() {
        return (
            <View style={Styles.dkdn_container}>
                <StatusBar backgroundColor="#f9be57" animated={true}/>
                <ScrollView style={Styles.dkdn_scrollview}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{alignItems:'center',justifyContent:'center'}}
                >
                    <View style={Styles.dkdn_khungchugioithieu}>
                        <Text style={Styles.dkdn_chugioithieu} >
                            {this.state.tieude}
                        </Text>
                    </View>

                    <View style={Styles.dkdn_formdkdn}>
                        <View style={Styles.dkdn_khungbuttondkdn}>
                            <TouchableHighlight
                                underlayColor="#00000000"
                               style={Styles.dkdn_khungbutton} onPress={()=>this.onpress_dk()}>
                                <View style={Styles.dkdn_buttondk} opacity={this.state.active_dkdn?1:0.5}>
                                    <Text style={Styles.dkdn_Chubutton} >ĐĂNG KÝ</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight  
                                underlayColor="#00000000"
                                style={Styles.dkdn_khungbutton} onPress={()=>this.onpress_dn()}>
                                <View style={Styles.dkdn_buttondn} opacity={this.state.active_dkdn?0.5:1}>
                                    <Text style={[Styles.dkdn_Chubutton,Styles.dkdn_Chubuttonkhongborder]} >ĐĂNG NHẬP</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        {
                            (()=>{
                                if(this.state.active_dkdn)
                                {
                                    return(
                                        <View style={Styles.dkdn_khungthongtindkdn}>
                                            <View style={Styles.dkdn_khungdkdn_fb_gg}>
                                                <TouchableOpacity activeOpacity={0.9} style={Styles.dkdn_khungbuttonfb} >
                                                    <View style={Styles.dkdn_buttonfb}>
                                                        <View style={Styles.dkdn_khungbocucfb}>
                                                            <View style={Styles.dkdn_khungiconfb}>
                                                                <Image source={require('../image/Facebook.png')} style={Styles.dkdn_iconfb}/>
                                                            </View>
                                                        </View>
                                                        <View style={Styles.dkdn_khungbocucfb}>
                                                            <Text style={Styles.dkdn_chufb}>FACEBOOK</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableHighlight style={Styles.dkdn_khungbuttongg}>
                                                    <View style={Styles.dkdn_buttongg}>
                                                        <View style={Styles.dkdn_khungbocucfb}>
                                                            <View style={Styles.dkdn_khungiconfb}>
                                                                <Image source={require('../image/google-hangouts.png')} style={Styles.dkdn_icongg}/>
                                                            </View>
                                                        </View>
                                                        <View style={Styles.dkdn_khungbocucfb}>
                                                            <Text style={Styles.dkdn_chufb}>GOOGLE</Text>
                                                        </View>
                                                    </View>
                                                </TouchableHighlight>
                                                <Text style={Styles.dkdn_chucuyentiep}>Hoặc đăng kí với</Text>
                                            </View>
                                        {/* khung ten day du  */}
                                            <View style={Styles.dkdn_khungdienthongtin}>
                                                <View style={Styles.dkdn_khungdien}>
                                                    <Animated.Text style={[Styles.dkdn_tieudekhungdien,{
                                                                        opacity:this.state.hieuung.domo1,
                                                                        marginLeft:this.state.hieuung.chieusau1,
                                                                    }]}>
                                                        Tên đầy đủ
                                                    </Animated.Text>

                                                    <TextInput 
                                                        autoCompleteType='name'
                                                        autoCapitalize='none'
                                                        underlineColorAndroid='transparent'
                                                        selectionColor='#07c6c0'
                                                        placeholderTextColor='#aaaaaa'
                                                        autoFocus={true}
                                                        placeholder={this.state.placeholder.tendaydu}
                                                        onChangeText={(val)=>this.dien_tendaydudk(val)}
                                                        value={this.state.tendaydu}
                                                        onFocus={()=>this.hieu_ung("dk","tendaydu")}
                                                        onEndEditing={()=>this.dung_hieu_ung("dk","tendaydu")}
                                                        style={[Styles.dkdn_textinput,{borderBottomColor:this.state.placeholder.tendaydu==""?'#07c6c0':'#aaaaaa'}]}
                                                        
                                                    />
                                                    {
                                                        (()=>{
                                                            if(this.state.loi_tendaydu!="")
                                                            {
                                                                return(
                                                                    <Animated.Text style={[Styles.dkdn_tieudeloi]}>
                                                                        {this.state.loi_tendaydu}
                                                                    </Animated.Text>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </View>
                                            </View>


                                            {/* khung email */}


                                            <View style={Styles.dkdn_khungdienthongtin}>
                                                <View style={Styles.dkdn_khungdien}>
                                                    <Animated.Text style={[Styles.dkdn_tieudekhungdien,{
                                                                        opacity:this.state.hieuung.domo2,
                                                                        marginLeft:this.state.hieuung.chieusau2,
                                                                    }]}>
                                                        Email
                                                    </Animated.Text>

                                                    <TextInput 
                                                        autoCompleteType='email'
                                                        autoCapitalize='none'
                                                        underlineColorAndroid='transparent'
                                                        selectionColor='#07c6c0'
                                                        placeholderTextColor='#aaaaaa'
                                                        placeholder={this.state.placeholder.emaildk}
                                                        onChangeText={(val)=>this.kiemtraemail("dk",val) }
                                                        value={this.state.emaildk}
                                                        onFocus={()=>this.hieu_ung("dk","email")}
                                                        onEndEditing={()=>this.dung_hieu_ung("dk","email")}
                                                        style={[Styles.dkdn_textinput,{borderBottomColor:this.state.placeholder.emaildk==""?'#07c6c0':'#aaaaaa'}]}
                                                        
                                                    />
                                                    {
                                                        (()=>{
                                                            if(this.state.loi_emaildk!="")
                                                            {
                                                                return(
                                                                    <Animated.Text style={[Styles.dkdn_tieudeloi]}>
                                                                        {this.state.loi_emaildk}
                                                                    </Animated.Text>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </View>
                                            </View>
                                            

                                            {/* khung chọn lớp */}
                                            
                                            <View style={Styles.dkdn_khungdienthongtin}>
                                                <View style={Styles.dkdn_khungdien}>
                                                    
                                                <TouchableOpacity 
                                                    activeOpacity={0.8}
                                                    style={[Styles.dkdn_buttonchonlop]} onPress={()=>this.bangchonlop()}>
                                                        <TextInput 
                                                            editable={false}
                                                            autoCapitalize='none'
                                                            underlineColorAndroid='transparent'
                                                            selectionColor='#07c6c0'
                                                            placeholderTextColor='#aaaaaa'
                                                            placeholder={this.state.lop}
                                                            style={[Styles.dkdn_textinput,Styles.dkdn_textinputchonlop,
                                                                {borderBottomColor:this.state.doimauinputlop==true?'#07c6c0':'#aaaaaa'}]}
                                                            
                                                        />
                                                        <FontAwesome5 name={'caret-down'} style={[Styles.dkdn_iconchonlop,{color:this.state.doimauinputlop==true?'#07c6c0':'#aaaaaa'}]}/>
                                                    </TouchableOpacity>
                                                    {
                                                        (()=>{
                                                            if(this.state.loi_lop!="")
                                                            {
                                                                return(
                                                                    <Animated.Text style={[Styles.dkdn_tieudeloi]}>
                                                                        {this.state.loi_lop}
                                                                    </Animated.Text>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </View>
                                            </View>



                                            {/* khung mat khau */}

                                            <View style={Styles.dkdn_khungdienthongtin}>
                                                <View style={Styles.dkdn_khungdien}>
                                                    <Animated.Text style={[Styles.dkdn_tieudekhungdien,{
                                                                        opacity:this.state.hieuung.domo3,
                                                                        marginLeft:this.state.hieuung.chieusau3,
                                                                    }]}>
                                                        Mật khẩu
                                                    </Animated.Text>

                                                    <View style={Styles.dkdn_khungmatkhau}>
                                                        <TextInput 
                                                            autoCompleteType='password'
                                                            autoCapitalize='none'
                                                            secureTextEntry={this.state.active_matkhaudk}
                                                            underlineColorAndroid='transparent'
                                                            selectionColor='#07c6c0'
                                                            placeholderTextColor='#aaaaaa'
                                                            placeholder={this.state.placeholder.matkhaudk}
                                                            onChangeText={(val)=>this.dien_matkhaudk('dk',val)}
                                                            value={this.state.matkhaudk}
                                                            onFocus={()=>this.hieu_ung("dk","matkhau")}
                                                            onEndEditing={()=>this.dung_hieu_ung("dk","matkhau")}
                                                            style={[Styles.dkdn_textinput,Styles.dkdn_textinputchonlop,
                                                                {borderBottomColor:this.state.placeholder.matkhaudk==""?'#07c6c0':'#aaaaaa'}]}
                                                            
                                                        />
                                                        {
                                                            (()=>{
                                                                if(this.state.active_matkhaudk){
                                                                    return(
                                                                        <Animated.View style={Styles.dkdn_khungiconmatkhau}>
                                                                            <TouchableHighlight underlayColor="#00000000" onPress={()=>this.hienpass("dk")}>
                                                                                <FontAwesome5 name={'eye-slash'} style={Styles.dkdn_iconmatkhau}/>
                                                                            </TouchableHighlight>
                                                                        </Animated.View>
                                                                    )
                                                                }else{
                                                                    return(
                                                                        <Animated.View style={Styles.dkdn_khungiconmatkhau}>
                                                                            <TouchableHighlight underlayColor="#00000000"  onPress={()=>this.anpass("dk")}>
                                                                                <FontAwesome5 name={'eye'} style={Styles.dkdn_iconmatkhau}/>
                                                                            </TouchableHighlight>
                                                                        </Animated.View>
                                                                    )
                                                                }
                                                            })()
                                                        }
                                                        
                                                    </View>
                                                    
                                                    {
                                                        (()=>{
                                                            if(this.state.loi_matkhaudk!="")
                                                            {
                                                                return(
                                                                    <Animated.Text style={[Styles.dkdn_tieudeloi]}>
                                                                        {this.state.loi_matkhaudk}
                                                                    </Animated.Text>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </View>
                                            </View>

                                            <View style={Styles.dkdn_khungdienthongtin}>
                                                <View style={[Styles.dkdn_khungdien,Styles.dkdn_khungbuttondangki]}>
                                                    <TouchableOpacity 
                                                        activeOpacity={0.7}
                                                        style={Styles.dkdn_buttondangki} 
                                                        onPress={()=>this.dangki()}>
                                                        <Text style={Styles.dkdn_chubuttondangki}>BẮT ĐẦU HỌC</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            

                                        </View>
                                    )
                                }

                                // khúc này là của đăng nhập
                                else{
                                    return(
                                        <View style={Styles.dkdn_khungthongtindkdn}>
                                            <View style={Styles.dkdn_khungdkdn_fb_gg}>
                                                <TouchableHighlight style={Styles.dkdn_khungbuttonfb} >
                                                    <View style={Styles.dkdn_buttonfb}>
                                                        <View style={Styles.dkdn_khungbocucfb}>
                                                            <View style={Styles.dkdn_khungiconfb}>
                                                                <Image source={require('../image/Facebook.png')} style={Styles.dkdn_iconfb}/>
                                                            </View>
                                                        </View>
                                                        <View style={Styles.dkdn_khungbocucfb}>
                                                            <Text style={Styles.dkdn_chufb}>FACEBOOK</Text>
                                                        </View>
                                                    </View>
                                                </TouchableHighlight>
                                                <TouchableHighlight style={Styles.dkdn_khungbuttongg}>
                                                    <View style={Styles.dkdn_buttongg}>
                                                        <View style={Styles.dkdn_khungbocucfb}>
                                                            <View style={Styles.dkdn_khungiconfb}>
                                                                <Image source={require('../image/google-hangouts.png')} style={Styles.dkdn_icongg}/>
                                                            </View>
                                                        </View>
                                                        <View style={Styles.dkdn_khungbocucfb}>
                                                            <Text style={Styles.dkdn_chufb}>GOOGLE</Text>
                                                        </View>
                                                    </View>
                                                </TouchableHighlight>
                                                <Text style={Styles.dkdn_chucuyentiep}>Hoặc đăng nhập với</Text>
                                            </View>
                                         
                                            {/* khung email */}

                                            <View style={Styles.dkdn_khungdienthongtin}>
                                                <View style={Styles.dkdn_khungdien}>
                                                    <Animated.Text style={[Styles.dkdn_tieudekhungdien,{
                                                                        opacity:this.state.hieuung.domo4,
                                                                        marginLeft:this.state.hieuung.chieusau4,
                                                                    }]}>
                                                        Email
                                                    </Animated.Text>

                                                    <TextInput 
                                                        autoFocus={true}
                                                        autoCompleteType='email'
                                                        autoCapitalize='none'
                                                        underlineColorAndroid='transparent'
                                                        selectionColor='#07c6c0'
                                                        placeholderTextColor='#aaaaaa'
                                                        placeholder={this.state.placeholder.emaildn}
                                                        onChangeText={(val)=>this.kiemtraemail('dn',val)}
                                                        value={this.state.emaildn}
                                                        onFocus={()=>this.hieu_ung("dn","email")}
                                                        onEndEditing={()=>this.dung_hieu_ung("dn","email")}
                                                        style={[Styles.dkdn_textinput,{borderBottomColor:this.state.placeholder.emaildn==""?'#07c6c0':'#aaaaaa'}]}
                                                        
                                                    />
                                                    {
                                                        (()=>{
                                                            if(this.state.loi_emaildn!="")
                                                            {
                                                                return(
                                                                    <Animated.Text style={[Styles.dkdn_tieudeloi]}>
                                                                        {this.state.loi_emaildn}
                                                                    </Animated.Text>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </View>
                                            </View>
                                            
                                            {/* khung mat khau */}

                                            <View style={Styles.dkdn_khungdienthongtin}>
                                                <View style={Styles.dkdn_khungdien}>
                                                    <Animated.Text style={[Styles.dkdn_tieudekhungdien,{
                                                                        opacity:this.state.hieuung.domo5,
                                                                        marginLeft:this.state.hieuung.chieusau5,
                                                                    }]}>
                                                        Mật khẩu
                                                    </Animated.Text>

                                                    <View style={Styles.dkdn_khungmatkhau}>
                                                        <TextInput 
                                                            autoCompleteType='password'
                                                            autoCapitalize='none'
                                                            secureTextEntry={this.state.active_matkhaudn}
                                                            underlineColorAndroid='transparent'
                                                            selectionColor='#07c6c0'
                                                            placeholderTextColor='#aaaaaa'
                                                            placeholder={this.state.placeholder.matkhaudn}
                                                            onChangeText={(val)=>this.dien_matkhaudk('dn',val)}
                                                            value={this.state.matkhaudn}
                                                            onFocus={()=>this.hieu_ung("dn","matkhau")}
                                                            onEndEditing={()=>this.dung_hieu_ung("dn","matkhau")}
                                                            style={[Styles.dkdn_textinput,Styles.dkdn_textinputchonlop,
                                                                {borderBottomColor:this.state.placeholder.matkhaudn==""?'#07c6c0':'#aaaaaa'}]}
                                                            
                                                        />
                                                        {
                                                            (()=>{
                                                                if(this.state.active_matkhaudn){
                                                                    return(
                                                                        <Animated.View style={Styles.dkdn_khungiconmatkhau}>
                                                                            <TouchableHighlight underlayColor="#00000000" onPress={()=>this.hienpass('dn')}>
                                                                                <FontAwesome5 name={'eye-slash'} style={Styles.dkdn_iconmatkhau}/>
                                                                            </TouchableHighlight>
                                                                        </Animated.View>
                                                                    )
                                                                }else{
                                                                    return(
                                                                        <Animated.View style={Styles.dkdn_khungiconmatkhau}>
                                                                            <TouchableHighlight underlayColor="#00000000"  onPress={()=>this.anpass('dn')}>
                                                                                <FontAwesome5 name={'eye'} style={Styles.dkdn_iconmatkhau}/>
                                                                            </TouchableHighlight>
                                                                        </Animated.View>
                                                                    )
                                                                }
                                                            })()
                                                        }
                                                        
                                                    </View>
                                                    
                                                    {
                                                        (()=>{
                                                            if(this.state.loi_matkhaudn!="")
                                                            {
                                                                return(
                                                                    <Animated.Text style={[Styles.dkdn_tieudeloi]}>
                                                                        {this.state.loi_matkhaudn}
                                                                    </Animated.Text>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </View>
                                            </View>

                                            <View style={Styles.dkdn_khungdienthongtin}>
                                                <View style={[Styles.dkdn_khungdien,Styles.dkdn_khungbuttondangki]}>
                                                    <TouchableOpacity 
                                                        activeOpacity={0.7}
                                                        style={Styles.dkdn_buttondangki} 
                                                        onPress={()=>this.dangnhap()}>
                                                        <Text style={Styles.dkdn_chubuttondangki}>ĐĂNG NHẬP</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                            
                                            <View style={Styles.dkdn_khungquenmatkhau}>
                                                <TouchableOpacity activeOpacity={0.8} onPress={()=>this.quenmatkhau()}>
                                                    <Text style={Styles.dkdn_chu_quenmatkhau}>Quên mật khẩu ?</Text>
                                                </TouchableOpacity>
                                            </View>
                                            

                                        </View>
                                    )
                                }
                            })()
                        }
                    </View>
                </ScrollView>

                {/* khung này hiện lên khi chọn lớp */}

                <RBSheet
                    onClose={()=>this.setState({doimauinputlop:false})}
                    ref={ref => {
                        this.ChonLop = ref;
                    }}
                    height={(2/3)*height}
                    customStyles={{
                        container: {
                          borderTopLeftRadius: 30,
                          borderTopRightRadius: 30
                        }
                      }}
                    >
                        <View style={[Styles.dkdn_khunghienlop]} >
                            <View style={Styles.dkdn_khungbangchonlop_top}>
                                    <View style={Styles.dkdn_khungbangchonlop_top_khungtieude}>
                                        <Text style={Styles.dkdn_khungbangchonlop_top_tieude}>
                                            Chọn Lớp
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>this.ChonLop.close()}>
                                        <FontAwesome name={'close'} style={Styles.dkdn_iconmatkhau}/>
                                    </TouchableOpacity>
                            </View>

                            <View style={Styles.dkdn_khungbangchonlop_middle}>
                                    <View style={Styles.dkdn_khungbangchonlop_middle_khung}>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            numColumns={3}
                                            data={this.state.DataLop}
                                            renderItem={({item})=>
                                            item.id=='0'?
                                            <View></View>
                                            :
                                            <TouchableOpacity 
                                                activeOpacity={0.8}
                                                style={[Styles.dkdn_khungbangchonlop_middle_button,{
                                                    backgroundColor:this.state.buttonlop==item.tenlop?'#fccb76':'white',
                                                    borderColor:this.state.buttonlop==item.tenlop?'#fccb76':'#919191',
                                                }]}
                                                onPress={()=>this.doimaubutton(item.tenlop)}
                                                >
                                                <Text style={Styles.dkdn_khungbangchonlop_middle_text}>{item.tenlop}</Text>
                                            </TouchableOpacity>

                                            }
                                        />
                                    </View>
                                </View>

                                <View style={Styles.dkdn_khungbuttonluu}>
                                    <TouchableOpacity style={Styles.dkdn_buttonluu} 
                                        activeOpacity={0.6}
                                        onPress={()=>this.luulop()}
                                    >
                                        <Text style={Styles.dkdn_buttonluu_text}>LƯU</Text>
                                    </TouchableOpacity>
                                </View>
                        </View >
                </RBSheet>

                <RBSheet
                    closeOnDragDown={true}
                    dragFromTopOnly={true}
                    closeOnPressMask={true}
                    closeOnPressBack={true}
                    
                    ref={ref => {
                        this.Quenmatkhau= ref;
                    }}
                    height={(2/5)*height}
                    customStyles={{
                        container: {
                          borderTopLeftRadius: 30,
                          borderTopRightRadius: 30
                        }
                      }}
                >
                        <View style={Styles.dkdn_khung_dien_quenmatkhau}>
                            <View style={Styles.dkdn_khungquenmatkhau_tieude}>
                                <Text style={[Styles.dkdn_tieudekhungdien,{fontSize:18/standarWidth*width,fontWeight:'bold'}]}>
                                    Email {this.state.loi_quenmatkhau}
                                </Text>
                            </View>
                            <View style={Styles.dkdn_khungquenmatkhau_email}>
                                <TextInput 
                                    autoCompleteType='name'
                                    autoCapitalize='none'
                                    underlineColorAndroid='transparent'
                                    selectionColor='#07c6c0'
                                    placeholderTextColor='#aaaaaa'
                                    autoFocus={true}
                                    placeholder="Nhập email của bạn..."
                                    onChangeText={(val)=>this.setState({quenmatkhau:val})}
                                    value={this.state.quenmatkhau}
                                    style={Styles.dkdn_khungnhapemail}
                                />
                                <TouchableOpacity activeOpacity={0.8} style={Styles.dkdn_buttongui}  onPress={()=>this.sendEmail()}>
                                    <MaterialIcons name={'send'} style={Styles.dkdn_iconsend} />
                                </TouchableOpacity>
                            </View>
                        </View>
                </RBSheet>
            </View>
        )
    }
}
