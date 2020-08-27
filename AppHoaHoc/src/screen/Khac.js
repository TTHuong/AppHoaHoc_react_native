import React, { Component} from 'react'
import {
ImageBackground,StyleSheet,StatusBar,View,ScrollView,Text,Button,TextInput,
SafeAreaView,Image,TouchableOpacity,FlatList,Dimensions,Linking ,
} from 'react-native';
import {firebaseApp} from '../firebaseconfig/firebaseconfig';
import MD5 from "react-native-md5";
import Bosung_Khac_User from '../screen/Bosung_Khac_User';
import Bosung_Khac_Admin from '../screen/Bosung_Khac_Admin';

export default class Khac extends Component {

    constructor(props){
        super(props);
        this.state={
            User:null,
        };
    }
    
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
                        Lop:snapshot.val().lop,
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
    }

    render() {
        if(this.state.User==null || this.state.User.quyenhan=="user"){
          return(
            <Bosung_Khac_User/>
          )
        }
        else{
          return(
            <Bosung_Khac_Admin/>
          )
        }
    }
}
