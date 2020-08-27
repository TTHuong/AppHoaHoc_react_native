import React, { Component} from 'react'
import {
ImageBackground,StyleSheet,StatusBar,View,ScrollView,Text,Button,TextInput,
SafeAreaView,Image,TouchableOpacity,FlatList,Dimensions,Animated,Easing,Platform,Alert,

} from 'react-native';
import Styles from '../style/style_infouser';
import {firebaseApp} from '../firebaseconfig/firebaseconfig';
import RBSheet from "./RBSheet";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as firebase from 'firebase';
import Styles_dkdn from '../style/styles';
import {
getDataLop,getDataMonHoc
} from "./KiemtraData";
import MD5 from "react-native-md5";
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'react-native-fetch-blob';

const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 592;


const storage=firebaseApp.storage();
const Blob=RNFetchBlob.polyfill.Blob;
const fs=RNFetchBlob.fs;

window.XMLHttpRequest=RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob=Blob;

export default class Infouser extends Component{
    constructor(props){
        super(props);
        this.state={
            chieusauback:new Animated.Value(-10),
            chieucaobutton:new Animated.Value(800),
            showbuttonremove:{
              domoclose_tendaydu:new Animated.Value(0),
              domoclose_email:new Animated.Value(0),
              domoclose_matkhauht:new Animated.Value(0),
              domoclose_matkhaumoi:new Animated.Value(0),
            },

            Photos:[],

            selectedPhoto: null, 
            unselectphoto:null,
            lastCursor: 0,
            noMorePhotos: false,
            loadingMore: false,
            
            disabled:{
              disabled_tendaydu:true,
              disabled_matkhauht:true,
              disabled_matkhaumoi:true,
              disable_email:true,
            },
            show_or_hide:{
              show_or_hide_tendaydu:false,
              show_or_hide_matkhauht:false,
              show_or_hide_matkhaumoi:false,
              show_or_hide_email:false
            },

            Id:'',
            // User:this.props.route.params.User,
            User:null,

            buttonlop:'',

            txt_tendaydu:'',
            txt_email:'',
            txt_matkhauht:'',
            txt_matkhaumoi:'',
            txt_lop:'Lớp ',
            // txt_avata:this.props.route.params.User.avata,
            // txt_nen:this.props.route.params.User.nen,
            txt_avata:"",
            txt_nen:"",

            loi_email:'',
            loi_matkhaumoi:'',
            loi_matkhauht:'',

            disable_luuthaydoi:false,

            indeximage:'',
            loaianh:'',

            batsukiendoianh:false,
            DataLop:[],

        }
    }

    loadDataLop(){
      this.setState({
        DataLop : getDataLop(),
      });
    }

    uploadImage=(uri,mime='application/octet-stream')=>{
      return new Promise((resolve,reject)=>{
          const uploadUri=Platform.OS === 'ios' ? uri.replace('file://',''):uri;
          const date=new Date().getTime();
          const sessionId=this.state.User.id + date;
          let uploadBlob=null;
          const imageRef=storage.ref('images').child(this.state.User.id).child(`${sessionId}.jpg`);
  
          fs.readFile(uploadUri,'base64')
          .then((data)=>{
              return Blob.build(data,{type:`${mime};BASE64`});
          })
          .then((blob)=>{
              uploadBlob=blob;
              return imageRef.put(blob,{contentType:mime});
          })
          .then(()=>{
            uploadBlob.close()
            return imageRef.getDownloadURL();
          })
          .then((url)=>{
            // resolve(url);
            let tenanh=this.state.User.id+'_'+sessionId+'.jpg';
            let user=this.state.User;
            if(this.state.loaianh=='nen'){
                this.setState({
                  txt_nen:url
                })
                firebase.database().ref('taikhoan').child(this.state.User.id).set({
                  // avata:user.avata,
                  // email:user.email,
                  // key:user.key,
                  // laylaimatkhau:user.laylaimatkhau,
                  // lop:user.lop,
                  // matkhau:user.matkhau,
                  // nen:url,
                  // quyenhan:user.quyenhan,
                  // tendaydu:user.tendaydu,

                  id:user.id,
                  tendaydu:user.tendaydu,
                  quyenhan:user.quyenhan,
                  nen:url,
                  lop:user.lop,
                  avata:user.avata,
                })
              }
              else{
                this.setState({
                  txt_avata:url
                })
                firebase.database().ref('taikhoan').child(this.state.User.id).set({
                  // avata:url,
                  // email:user.email,
                  // key:user.key,
                  // laylaimatkhau:user.laylaimatkhau,
                  // lop:user.lop,
                  // matkhau:user.matkhau,
                  // nen:user.nen,
                  // quyenhan:user.quyenhan,
                  // tendaydu:user.tendaydu,

                  id:user.id,
                  tendaydu:user.tendaydu,
                  quyenhan:user.quyenhan,
                  nen:user.nen,
                  lop:user.lop,
                  avata:url,
                })
              }
            }
          )
          .catch((error)=>{
              reject(error)
          })
      })
    }

    doianh(){
      this.uploadImage(this.state.Photos[this.state.indeximage].node.image.uri)
        .catch(
          // error=>console.log(error)
          );
        this.ChonAnh.close();

    }

    doiloaianh(loai){
      this.setState({
        loaianh:loai
      })
    }

    reauthenticate = (matkhau) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, matkhau);
        return user.reauthenticateWithCredential(cred);
      }
    
      // Changes user's password...
      onChangePasswordPress = (matkhauht,matkhaumoi) => {

        this.reauthenticate(matkhauht).then(() => {
          
          var user = firebase.auth().currentUser;
          user.updatePassword(matkhaumoi).then(() => {
            Alert.alert(
              "Thông báo thay đổi",
              "Đổi mật khẩu thành công !"
            );
          }).catch((error) => { 
            
              Alert.alert(
                "Thông báo thay đổi",
                "Đổi mật khẩu không thành công !"
              );
           });

        }).catch((error) => { 
            Alert.alert(
              "Thông báo thay đổi",
              "Mật khẩu hiện tại không đúng !!!"
            );
         });
      }
    
      // Changes user's email...
      // onChangeEmailPress = (email,matkhauht)=> {
      //   this.reauthenticate(matkhauht).then(() => {

      //     var user = firebase.auth().currentUser;
      //     user.updateEmail(email).then(() => {
      //       Alert.alert("Email was changed");
      //     }).catch((error) => { console.log(error.message); });

      //   }).catch((error) => { console.log(error.message) });
      // }
    

    onpress_savechanel(){
      let user=this.state.User;
      if(this.state.txt_tendaydu!=""){
        user.tendaydu=this.state.txt_tendaydu;
        this.setState({
          txt_tendaydu:''
        })
      }
      if(this.state.txt_lop!="Lớp "){
        user.lop=this.state.txt_lop;
        this.setState({
          txt_lop:'Lớp ',
        })
      }

      // if(this.state.txt_email!=""){
      //   if(this.state.txt_matkhauht!=""){
      //     user.email=this.state.txt_email;
      //     this.onChangeEmailPress(this.state.txt_email,this.state.txt_matkhauht);
      //     this.setState({
      //       txt_email:'',
      //       txt_matkhauht:''
      //     })
      //   }
      //   else{
      //     this.setState({
      //       loi_matkhauht:"Muốn thay đổi email vui lòng nhập mật khẩu hiện tại *",
      //     })
      //   }
      // }

      if(this.state.txt_matkhaumoi!=""){
        if(this.state.txt_matkhauht!=""){
          user.matkhau=this.state.txt_matkhaumoi;
          this.onChangePasswordPress(this.state.txt_matkhauht,this.state.txt_matkhaumoi);
          this.setState({
            txt_matkhauht:'',
            txt_matkhaumoi:''
          })
        }
        else{
          this.setState({
            loi_matkhauht:"Muốn thay đổi mật khẩu mới vui lòng nhập mật khẩu hiện tại *",
          })
        }
      }


      
      firebase.database().ref('taikhoan').child(this.state.User.id).set({
        tendaydu:user.tendaydu,
        quyenhan:user.quyenhan,
        nen:user.nen,
        lop:user.lop,
        avata:user.avata,
      })
      
    }


    // getSnapshotBeforeUpdate(prevProps, prevState){
    //   console.log('trong get '+prevState.txt_matkhauht)
    // }

    shouldComponentUpdate(nextProps,nextState){
      if(this.state.txt_lop!=nextState.txt_lop || this.state.txt_matkhauht!=nextState.txt_matkhauht
        || this.state.txt_matkhaumoi!=nextState.txt_matkhaumoi || this.state.txt_email!=nextState.txt_email
        || this.state.txt_tendaydu!=nextState.txt_tendaydu || this.state.loi_email!=nextState.loi_email 
        || this.state.loi_matkhaumoi!=nextState.loi_matkhaumoi || this.state.loi_matkhauht!=nextState.loi_matkhauht){
        this.activebutton(nextState.txt_tendaydu,
          nextState.txt_email,nextState.txt_matkhauht,
          nextState.txt_matkhaumoi,nextState.txt_lop,nextState.loi_email,nextState.loi_matkhauht,nextState.loi_matkhaumoi);
      }
      return true;
    }

    activebutton(tendaydu,email,matkhauht,matkhaumoi,lop,loi_email,loi_matkhauht,loi_matkhaumoi){
      // console.log('gia tri cua activebutton '+tendaydu+email+matkhauht+matkhaumoi+lop)
      if((tendaydu!="" || email!="" || matkhauht!="" || matkhaumoi!="" || lop!="Lớp " ) && (loi_email=="" && loi_matkhauht=="" && loi_matkhaumoi=='') ){
        this.setState({
          disable_luuthaydoi:true,
        })
      }
      else{
        this.setState({
          disable_luuthaydoi:false,
        })
      }
      // console.log('ac tive mne '+this.state.txt_lop)
    }

    luulop(){
      if(this.state.buttonlop!='Hủy'){
        this.setState({
          txt_lop:this.state.buttonlop,
        });
      }
      else{
        this.setState({
          txt_lop:'Lớp ',
        });
      }
      // console.log('trong luu lop '+this.state.buttonlop)
      this.ChonLop.close();
  }

    doimaubutton(tenlop){
      // console.log('trong doimaubutton')
      this.setState({
          buttonlop:tenlop,
      })
    }

    dienmatkhau(val,loai){
      
      if(loai=='ht')
      {
        let temp="";
        if(val.length<6){
          temp="Mật khẩu hiện tại có ít nhất 6 ký tự *";
        }
        else{
          temp="";
        }
        if(val==""){
          temp="";
        }
        this.setState({
          txt_matkhauht:val,
          loi_matkhauht:temp,
        });
      }
      else{
        let temp="";
        if(val.length<6){
          temp="Mật khẩu hiện mới có ít nhất 6 ký tự *";
        }
        else{
          temp="";
        }
        if(val==""){
          temp="";
        }
        this.setState({
          txt_matkhaumoi:val,
          loi_matkhaumoi:temp,
        });
      }

    }


    cleartextinput(val){
      if(val=='txt_tendaydu')
      {
        this.setState({
          txt_tendaydu:''
        })
      }
      else if(val=='txt_matkhauht'){
        this.setState({
          txt_matkhauht:'',
        })
      }
      else if(val=='txt_email'){
        this.setState({
          txt_email:'',
          loi_email:''
        })
      }
      else if(val=='txt_matkhaumoi'){
        this.setState({
          txt_matkhaumoi:'',
        })
      }
    }

    kiemtraemail=(val)=>{
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      this.setState({
        txt_email:val,
      })
      if (reg.test(val) === false && val!="") {
        this.setState({ 
          loi_email:'Vui lòng nhập đúng dạng email *' 
        })
      }
      else {
        this.setState({ 
          loi_email:'' 
        })
      }
  }


    hidebuttonremove(val){
      if(val=='txt_tendaydu'){
        Animated.timing(
          this.state.showbuttonremove.domoclose_tendaydu,{
            toValue:0,
            duration:3200,
          }
        ).start();
        setTimeout(() => {
          this.setState({
            disabled:{
              disabled_tendaydu:true,
            }
          })
        }, 2000);
      }
      else if(val=='txt_matkhauht' ){
        Animated.timing(
          this.state.showbuttonremove.domoclose_matkhauht,{
            toValue:0,
            duration:3200,
          }
        ).start();
        setTimeout(() => {
          this.setState({
            disabled:{
              disabled_matkhauht:true,
            }
          })
        }, 2000);
      }
      else if(val=='txt_matkhaumoi' ){
        Animated.timing(
          this.state.showbuttonremove.domoclose_matkhaumoi,{
            toValue:0,
            duration:3200,
          }
        ).start();
        setTimeout(() => {
          this.setState({
            disabled:{
              disabled_matkhaumoi:true,
            }
          })
        }, 2000);
      }
      else if(val=='txt_email'){
        Animated.timing(
          this.state.showbuttonremove.domoclose_email,{
            toValue:0,
            duration:3200,
          }
        ).start();
        setTimeout(() => {
          this.setState({
            disabled:{
              disabled_email:true,
            }
          })
        }, 2000);
      }
    }

    showbuttonremove(val){
      if(val=='txt_tendaydu'){
        Animated.timing(
          this.state.showbuttonremove.domoclose_tendaydu,{
            toValue:1,
            duration:1000,
          }
        ).start();
        this.setState({
          disabled:{
            disabled_tendaydu:false,
          }
        })
      }
      else if(val=='txt_matkhauht'){
        Animated.timing(
          this.state.showbuttonremove.domoclose_matkhauht,{
            toValue:1,
            duration:1000,
          }
        ).start();
        this.setState({
          disabled:{
            disabled_matkhauht:false,
          }
        })
      }
      else if(val=='txt_matkhaumoi'){
        Animated.timing(
          this.state.showbuttonremove.domoclose_matkhaumoi,{
            toValue:1,
            duration:1000,
          }
        ).start();
        this.setState({
          disabled:{
            disabled_matkhaumoi:false,
          }
        })
      }
      else if(val=='txt_email'){
        Animated.timing(
          this.state.showbuttonremove.domoclose_email,{
            toValue:1,
            duration:1000,
          }
        ).start();
        this.setState({
          disabled:{
            disabled_email:false,
          }
        })
      }
    }

    onpress_anh(index){
      
      if(index==this.state.unselectphoto){
        this.setState({
          selectedPhoto:null,
          unselectphoto:null,
          indeximage:'',
          chieucaobutton:new Animated.Value(800),
        })
        
      }
      else{
        this.setState({
          selectedPhoto:index,
          unselectphoto:index,
          indeximage:index,
        })

        Animated.timing(
          this.state.chieucaobutton,{
            toValue:400,
            duration:1100,
            easing:Easing.bezier(.17,1.38,1,1.01)
          }
        ).start();
      }
      // console.log("uneselext "+this.state.unselectphoto +' select  '+this.state.selectedPhoto+' inex '+index)
    }

    LoadImage=()=>{
      const getPhotoParams = {
        first: 100000,
        assetType: 'Photos',
        groupTypes:'All',
      };

      CameraRoll
      .getPhotos(getPhotoParams)
      .then(data => {
        this.setState({
          Photos:data.edges,
        })
        
      })
      .catch((err) => {
      });
    }


    hieuung(){
      Animated.sequence([
        Animated.timing(
          this.state.chieusauback,
          {
            toValue:-80,
            duration:800,
            easing:Easing.bounce,
          }
        )
      ]).start();
    }

    goback(){
      this.hieuung();
      this.props.navigation.goBack();
    }

    // getImageURL(){
    //   console.log('user avata '+this.state.User.avata)
    //   if(this.state.User.avata!='default'){
    //     firebase.storage().ref("images/"+this.state.User.key +'/'+this.state.User.avata ).getDownloadURL()
    //     .then((image) => this.setState({txt_avata:image}) )
    //     .catch(e=>{
    //       this.setState({
    //         txt_avata:'https://i.pinimg.com/originals/54/59/8e/54598efcb1fb1b0c1c6009e5ae644906.jpg'
    //       })
    //     })
    //     console.log('vo get image url avata images/'+this.state.User.key +'/'+this.state.User.avata)
    //   }
    //   if(this.state.User.nen!='default'){
    //     // firebaseApp.storage().ref("images/"+this.state.User.nen).getDownloadURL()
    //     // .then(image => this.setState({txt_nen:image}))
    //     // .catch(e=>{console.log(e);})
    //     console.log('vo get image url nen')
    //   }
    //   this.setState({
    //     batsukiendoianh:false,
    //   })
    // }

    kiemtra_dangnhap(){
        var that =this;
        firebaseApp.auth().onAuthStateChanged(user => {
            if(user){
                firebaseApp.database().ref('taikhoan').child(MD5.hex_md5(user.email)).on('value',function(snapshot){
                    that.setState({
                        User:{
                            id:MD5.hex_md5(user.email),
                            email:user.email,
                            tendaydu:snapshot.val().tendaydu,
                            quyenhan:snapshot.val().quyenhan,
                            nen:snapshot.val().nen,
                            lop:snapshot.val().lop,
                            avata:snapshot.val().avata,
                        },
                        txt_avata:snapshot.val().avata,
                        txt_nen:snapshot.val().nen,
                    });
                });

            }else{
                this.setState({
                    User:null,
                });
            }
          })
    }

    componentDidMount(){
      this.kiemtra_dangnhap();

      this.LoadImage();
      this.loadDataLop();
    }

    render(){
        return(
            <View style={{flex:1}}>
                {
                  (()=>{
                    if(this.state.User!=null){
                      return(
                        <ImageBackground source={require('../image/nen.png')} style={Styles.hinhnen}>
                          <Animated.View style={[Styles.khungback,{
                            marginLeft:this.state.chieusauback,
                          }]}>
                            <TouchableOpacity style={Styles.backscreen} activeOpacity={1} onPress={()=>this.goback()}>
                                <FontAwesome name='chevron-left' style={Styles.iconback}/>
                            </TouchableOpacity>
                          </Animated.View>

                          <ScrollView style={Styles.scrollview} showsVerticalScrollIndicator={false}>
                            <View style={Styles.khunganhnen}>
                                <View style={{flex:1,backgroundColor:'white'}}>
                                  {/* {
                                    (()=>{
                                      if(this.state.User.nen=='default'){
                                        return (
                                          <Image resizeMode='cover'  source={require('../image/nen.png')} style={Styles.hinhnencanhan}/>
                                        )
                                      }else{
                                        return(
                                          <Image resizeMode='cover'  source={{uri :this.state.User.nen}} style={Styles.hinhnencanhan}/>
                                        )
                                      }
                                    })()
                                  } */}
                                    <Image resizeMode='cover'  source={{uri :this.state.User.nen}} style={Styles.hinhnencanhan}/>
                                  <TouchableOpacity style={Styles.khungiconcamerahinhnen} activeOpacity={0.9} onPress={()=>{this.ChonAnh.open(),this.doiloaianh('nen')}}>
                                      <FontAwesome name='camera' style={Styles.iconcamerahinhnen}/>
                                  </TouchableOpacity>

                                  <View style={Styles.khungavata}>

                                        {/* {
                                          (()=>{
                                            if(this.state.User.avata=='default'){
                                              return (
                                                <Image resizeMode='cover' source={require('../image/avata.png')} style={Styles.avata}/>
                                              )
                                            }else{
                                              return(
                                                <Image resizeMode='cover' source={{uri:this.state.User.avata}} style={Styles.avata}/>
                                              )
                                            }
                                          })()
                                        } */}
                                        {/* {
                                          (()=>{
                                            console.log("avata ne "+this.state.User.avata);
                                          })()
                                        } */}
                                        <Image resizeMode='cover' source={{uri:this.state.User.avata}} style={Styles.avata}/>
                                      <TouchableOpacity style={Styles.doiavata} activeOpacity={0.9} onPress={()=>{this.ChonAnh.open(),this.doiloaianh('avata')}}>
                                        <FontAwesome name='camera' style={Styles.iconcamerahinhnen}/>
                                      </TouchableOpacity>
                                  </View>

                                </View>
                            </View>

                            <View style={Styles.containerformthongtin}>
                                <View style={Styles.formthongtin}>
                                    
                                    {/* khung nhap ten day du */}
                                    <View style={Styles.tieudethongtin}>
                                      <Text style={Styles.title}>
                                          Tên
                                      </Text>
                                    </View>
                                    <ScrollView style={Styles.khungnhapthongtin} 
                                      showsHorizontalScrollIndicator={false}
                                      horizontal 
                                      pagingEnabled={true}
                                      contentContainerStyle={{justifyContent:'center'}}
                                      > 
                                          <View style={Styles.khungthongtin}>
                                            <Text style={Styles.thongtin}>
                                                {this.state.User.tendaydu}
                                            </Text>
                                          </View>
                                          <View style={Styles.khungiconchuyentiep}>
                                              <FontAwesome name='angle-double-left' style={Styles.iconchuyentiep}/>
                                          </View>
                                          <View style={Styles.khungnhap}>
                                            <TextInput 
                                              style={Styles.textinput} 
                                              underlineColorAndroid='transparent'
                                              selectionColor='#07c6c0'
                                              placeholderTextColor='#939393'
                                              placeholder='Nhập họ và tên'
                                              onFocus={()=>this.showbuttonremove('txt_tendaydu')}
                                              onEndEditing={()=>this.hidebuttonremove('txt_tendaydu')}
                                              onChangeText={(val)=>this.setState({txt_tendaydu:val})}
                                              value={this.state.txt_tendaydu}

                                              
                                            />
                                            <Animated.View style={[Styles.khunghuybutton,{
                                              opacity:this.state.showbuttonremove.domoclose_tendaydu,
                                            }]}>
                                              <TouchableOpacity disabled={this.state.disabled.disabled_tendaydu} 
                                              style={Styles.frame_touchableopacity} 
                                              activeOpacity={0.8} onPress={()=>this.cleartextinput('txt_tendaydu')}>
                                                  <FontAwesome name='close' style={Styles.iconhuy}/>
                                              </TouchableOpacity>
                                            </Animated.View>
                                          </View>
                                    </ScrollView>
                                      
                                      {/* khung nhap email */}

                                    {/* <View style={Styles.tieudethongtin}>
                                      <Text style={Styles.title}>
                                          Email
                                      </Text>
                                    </View>
                                    <ScrollView style={Styles.khungnhapthongtin} 
                                      showsHorizontalScrollIndicator={false}
                                      horizontal 
                                      pagingEnabled={true}
                                      contentContainerStyle={{justifyContent:'center'}}
                                      > 
                                          <View style={Styles.khungthongtin}>
                                            <Text style={Styles.thongtin}>
                                                {this.state.User.email}
                                            </Text>
                                          </View>
                                          <View style={Styles.khungiconchuyentiep}>
                                              <FontAwesome name='angle-double-left' style={Styles.iconchuyentiep}/>
                                          </View>
                                          <View style={Styles.khungnhap}>
                                            <TextInput 
                                              style={Styles.textinput} 
                                              underlineColorAndroid='transparent'
                                              selectionColor='#07c6c0'
                                              placeholderTextColor='#939393'
                                              placeholder='Nhập email'
                                              onFocus={()=>this.showbuttonremove('txt_email')}
                                              onEndEditing={()=>this.hidebuttonremove('txt_email')}
                                              onChangeText={(val)=>this.kiemtraemail(val)}
                                              value={this.state.txt_email}

                                              
                                            />
                                            <Animated.View style={[Styles.khunghuybutton,{
                                              opacity:this.state.showbuttonremove.domoclose_email,
                                            }]}>
                                              <TouchableOpacity disabled={this.state.disabled.disabled_email} 
                                              style={Styles.frame_touchableopacity} 
                                              activeOpacity={0.6} onPress={()=>this.cleartextinput('txt_email')}>
                                                  <FontAwesome name='close' style={Styles.iconhuy}/>
                                              </TouchableOpacity>
                                            </Animated.View>
                                          </View>
                                    </ScrollView>

                                      <View style={Styles.tieudethongtin}>
                                        <Text style={[Styles.title,{color:'#fc4b4b'}]}>
                                            {this.state.loi_email}
                                        </Text>
                                      </View> */}

                                      {/* khung mat khau hien tai*/}

                                    <View style={Styles.tieudethongtin}>
                                      <Text style={Styles.title}>
                                          Mật khẩu hiện tại
                                      </Text>
                                    </View>
                                    <ScrollView style={Styles.khungnhapthongtin} 
                                      showsHorizontalScrollIndicator={false}
                                      horizontal 
                                      pagingEnabled={true}
                                      contentContainerStyle={{justifyContent:'center'}}
                                      > 

                                          <View style={Styles.khungthongtin}>
                                            <Text style={Styles.thongtin}>
                                                ..................
                                            </Text>
                                          </View>

                                          <View style={Styles.khungiconchuyentiep}>
                                              <FontAwesome name='angle-double-left' style={Styles.iconchuyentiep}/>
                                          </View>

                                          <View style={Styles.khungnhap}>
                                            <TextInput
                                              secureTextEntry={true} 
                                              style={Styles.textinput} 
                                              underlineColorAndroid='transparent'
                                              selectionColor='#07c6c0'
                                              placeholderTextColor='#939393'
                                              placeholder='Nhập mật khẩu hiện tại'
                                              onFocus={()=>this.showbuttonremove('txt_matkhauht')}
                                              onEndEditing={()=>this.hidebuttonremove('txt_matkhauht')}
                                              onChangeText={(val)=>this.dienmatkhau(val,'ht')}
                                              value={this.state.txt_matkhauht}

                                              
                                            />
                                            <Animated.View style={[Styles.khunghuybutton,{
                                              opacity:this.state.showbuttonremove.domoclose_matkhauht,
                                            }]}>
                                              <TouchableOpacity disabled={this.state.disabled.disabled_matkhauht} 
                                              style={Styles.frame_touchableopacity} 
                                              activeOpacity={0.6} onPress={()=>this.cleartextinput('txt_matkhauht')}>
                                                  <FontAwesome name='close' style={Styles.iconhuy}/>
                                              </TouchableOpacity>
                                            </Animated.View>
                                          </View>

                                    </ScrollView>

                                      <View style={Styles.tieudethongtin}>
                                        <Text style={[Styles.title,{color:'#fc4b4b'}]}>
                                            {this.state.loi_matkhauht}
                                        </Text>
                                      </View>
                                  
                                  {/* khung nhap mat khau moi */}

                                  <View style={Styles.tieudethongtin}>
                                      <Text style={Styles.title}>
                                          Mật khẩu mới
                                      </Text>
                                    </View>
                                    <ScrollView style={Styles.khungnhapthongtin} 
                                      showsHorizontalScrollIndicator={false}
                                      horizontal 
                                      pagingEnabled={true}
                                      contentContainerStyle={{justifyContent:'center'}}
                                      > 

                                          <View style={Styles.khungthongtin}>
                                            <Text style={Styles.thongtin}>
                                                ..................
                                            </Text>
                                          </View>

                                          <View style={Styles.khungiconchuyentiep}>
                                              <FontAwesome name='angle-double-left' style={Styles.iconchuyentiep}/>
                                          </View>

                                          <View style={Styles.khungnhap}>
                                            <TextInput 
                                              secureTextEntry={true}
                                              style={Styles.textinput} 
                                              underlineColorAndroid='transparent'
                                              selectionColor='#07c6c0'
                                              placeholderTextColor='#939393'
                                              placeholder='Nhập mật khẩu mới'
                                              onFocus={()=>this.showbuttonremove('txt_matkhaumoi')}
                                              onEndEditing={()=>this.hidebuttonremove('txt_matkhaumoi')}
                                              onChangeText={(val)=>this.dienmatkhau(val,'moi')}
                                              value={this.state.txt_matkhaumoi}

                                              
                                            />
                                            <Animated.View style={[Styles.khunghuybutton,{
                                              opacity:this.state.showbuttonremove.domoclose_matkhaumoi,
                                            }]}>
                                              <TouchableOpacity disabled={this.state.disabled.disabled_matkhaumoi} 
                                              style={Styles.frame_touchableopacity} 
                                              activeOpacity={0.6} onPress={()=>this.cleartextinput('txt_matkhaumoi')}>
                                                  <FontAwesome name='close' style={Styles.iconhuy}/>
                                              </TouchableOpacity>
                                            </Animated.View>
                                          </View>

                                    </ScrollView>

                                      <View style={Styles.tieudethongtin}>
                                        <Text style={[Styles.title,{color:'#fc4b4b'}]}>
                                            {this.state.loi_matkhaumoi}
                                        </Text>
                                      </View>

                                  {/* khung chon lop */}
                                    <ScrollView style={Styles.khungnhapthongtin} 
                                      showsHorizontalScrollIndicator={false}
                                      horizontal 
                                      pagingEnabled={true}
                                      contentContainerStyle={{justifyContent:'center'}}
                                      > 
                                          <View style={Styles.khungthongtin}>
                                            <Text style={Styles.thongtin}>
                                                {this.state.User.lop}
                                            </Text>
                                          </View>
                                          <View style={Styles.khungiconchuyentiep}>
                                              <FontAwesome name='angle-double-left' style={Styles.iconchuyentiep}/>
                                          </View>
                                          <View style={[Styles.khungnhap]}>
                                            <Text style={[Styles.textlop]}>
                                                {this.state.txt_lop}
                                            </Text>
                                            <TouchableOpacity style={Styles.khungchonlop} 
                                              activeOpacity={0.6} onPress={()=>this.ChonLop.open()}>
                                                  <FontAwesome name='chevron-down' style={Styles.iconchonlop}/>
                                              </TouchableOpacity>
                                          </View>
                                    </ScrollView>

                                    <TouchableOpacity disabled={this.state.disable_luuthaydoi?false:true} 
                                      activeOpacity={this.state.disable_luuthaydoi?0.6:1} 
                                      style={[Styles.luuthaydoi,{
                                        backgroundColor:this.state.disable_luuthaydoi?'#ffa500':'#e5e1da',
                                    }]} onPress={()=>this.onpress_savechanel()}>
                                        <Text style={Styles.textluuthaydoi}>LƯU THAY ĐỔI</Text>
                                    </TouchableOpacity>


                                </View>
                            </View>
                            
                          </ScrollView>
                        </ImageBackground>
                      )
                    }
                    // else{
                    //   return(
                    //     this.props.navigation.navigate('Home')
                    //   )
                    // }
                  })()
                }

                {/* khung chọn ảnh */}
              <RBSheet
                    ref={ref => {
                        this.ChonAnh= ref;
                    }}
                    // closeOnDragDown={true}
                    height={height-100/standardHeight*height}
                    customStyles={{
                        container: {
                          borderTopLeftRadius: 25,
                          borderTopRightRadius: 25,
                        },
                        draggableIcon: {
                          width: 0,
                          height: 0,
                          borderRadius: 0,
                          margin: 0,
                          // backgroundColor: "#ccc"
                        }
                      }}
                    >
                    <View style={Styles.tieudekhungchonanh} activeOpacity={0.95} >
                      <View style={Styles.khungtieude}>
                        <Text style={Styles.tieude}>Thư viện ảnh</Text>
                      </View>
                    </View>

                    <View style={Styles.khungchonhinh}>
                      <ScrollView showsVerticalScrollIndicator={false} 
                        // contentContainerStyle={{alignItems:'center',justifyContent:'center'}}
                        style={Styles.scrollview_dsanh}>
                      
                      {/* {
                        this.state.Photos.map((p, i) => {
                          return (
                              <Image
                              key={i}
                              style={{
                                  width: 300,
                                  height: 100,
                              }}
                              source={{ uri: p.node.image.uri }}
                              />
                          );
                        })
                      } */}
                      
                      <FlatList
                        style={{flex:1}}
                        numColumns={3}
                        data={this.state.Photos}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity style={Styles.khungitemanh} activeOpacity={0.7} key={index} onPress={()=>this.onpress_anh(index)}>
                            {
                              (()=>{
                                // console.log(index);
                                if(this.state.selectedPhoto==index){
                                  return(
                                    <View style={Styles.khungphu_anh}>
                                        <AntDesign name="checkcircle"  style={Styles.iconselect}/>
                                        <View style={Styles.phu_anh}>
                                        </View>
                                    </View>
                                  )
                                }
                              })()
                            }
                            <Image resizeMode='cover' source={{uri: item.node.image.uri}} style={Styles.itemanh}/>
                          </TouchableOpacity>
                        )}
                        // onEndReached={this.endReached()}
                        // onEndReachedThreshold={0}
                      />

                      </ScrollView>
                    </View>
                    
                    {
                      (()=>{
                        // console.log(this.state.selectedPhoto)
                        if(this.state.selectedPhoto!=null){
                          return(
                            <Animated.View style={[Styles.khungbuttonluu,{
                              marginTop:this.state.chieucaobutton,
                            }]}>
                                <TouchableOpacity style={Styles.buttonluu} activeOpacity={0.8} onPress={()=>this.doianh()}>
                                    <Text style={Styles.chubuttonluu}>LƯU</Text>
                                </TouchableOpacity>
                            </Animated.View>
                          )
                        }
                      })()
                    }
                </RBSheet>
                    {/* khung chon lop */}

                <RBSheet
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
                        <View style={[Styles_dkdn.dkdn_khunghienlop]} >
                            <View style={Styles_dkdn.dkdn_khungbangchonlop_top}>
                                    <View style={Styles_dkdn.dkdn_khungbangchonlop_top_khungtieude}>
                                        <Text style={Styles_dkdn.dkdn_khungbangchonlop_top_tieude}>
                                            Chọn Lớp
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={()=>this.ChonLop.close()}>
                                        <FontAwesome name={'close'} style={Styles_dkdn.dkdn_iconmatkhau}/>
                                    </TouchableOpacity>
                            </View>

                            <View style={Styles_dkdn.dkdn_khungbangchonlop_middle}>
                                    <View style={Styles_dkdn.dkdn_khungbangchonlop_middle_khung}>
                                        <FlatList
                                            numColumns={3}
                                            data={this.state.DataLop}
                                            renderItem={({item})=>
                                            <TouchableOpacity 
                                                activeOpacity={0.8}
                                                style={[Styles_dkdn.dkdn_khungbangchonlop_middle_button,{
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

                                <View style={Styles_dkdn.dkdn_khungbuttonluu}>
                                    <TouchableOpacity style={Styles_dkdn.dkdn_buttonluu} 
                                        activeOpacity={0.6}
                                        onPress={()=>this.luulop()}
                                    >
                                        <Text style={Styles_dkdn.dkdn_buttonluu_text}>LƯU</Text>
                                    </TouchableOpacity>
                                </View>
                        </View >
                </RBSheet>
            </View>
            
        )
    }

    
}