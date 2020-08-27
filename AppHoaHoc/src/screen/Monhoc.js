import React, { Component} from 'react'
import {
ImageBackground,StyleSheet,StatusBar,View,ScrollView,Text,Button,TextInput,
SafeAreaView,Image,TouchableOpacity,FlatList,Dimensions,Keyboard,ActivityIndicator,

} from 'react-native';
import Styles from '../style/Style_monhoc';
import {firebaseApp} from '../firebaseconfig/firebaseconfig';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from "./RBSheet";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import VideoPlayer from 'react-native-video-controls';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 592;

export default class Monhoc extends Component {

    constructor(props){
        super(props);
        this.state={
            actitimkiem:false,
            tukhoa:"",
            hieuung:'',
            noidung:"",
            tieude:"",
            video:"",
            datatimkiem:[],
            data:[],
            loading:false,
            lasttolist:0,
            vtcuoi:0,
        };
    }

    componentDidMount(){
        this.loadDataLyThuyet(true);
    }
    // shouldComponentUpdate(nextProps, nextState) {        
    //     if(this.state.data != nextState.data ){
    //         this.loadDataLyThuyet(this.props.route.params.Id);
    //     }
    //     // if(this.state.Arrayusers!=nextState.Arrayusers){
    //     //     this.laythongtintaikhoan(nextState.Arrayusers);
            
    //     // }
    //     return true;
    // }

    
    loadDataLyThuyet(kt){
        var that =this;
        var lasttolist=0;
        if(kt){
            firebaseApp.database().ref("LyThuyet").child(this.props.route.params.Id).orderByChild('idbaihoc').limitToFirst(4).once('value',function(snapshot){
                let array = [];
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    lasttolist=childSnapshot.val().idbaihoc;
                    // console.log("cai dau "+lasttolist+ " tieu de "+childData.tieude );
                    array.push({
                        idbaihoc : childData.idbaihoc,
                        hieuung:childData.hieuung,
                        noidung:childData.noidung,
                        tieude:childData.tieude,
                        video:childData.video,
                      });
                  });
      
                  that.setState({
                    data : array,
                    datatimkiem:array,
                    lasttolist:lasttolist+1,
                  });

            });
        }
        else{
            this.setState({
                loading:true,
            });
            // console.log("vi tri cuoi "+this.props.route.params.vtcuoi);
            if(this.state.lasttolist<=this.props.route.params.vtcuoi)
            {
                firebaseApp.database().ref("LyThuyet").child(this.props.route.params.Id).orderByChild('idbaihoc')
                        .startAt(that.state.lasttolist).limitToFirst(4).once('value',function(snapshot){
                        let array = [];
                        snapshot.forEach(function(childSnapshot) {
                            var childData = childSnapshot.val();
                            // console.log("toi load more roi "+lasttolist + " tieu de "+childData.tieude);
                            lasttolist=childSnapshot.val().idbaihoc;
                            array.push({
                                idbaihoc : childData.idbaihoc,
                                hieuung:childData.hieuung,
                                noidung:childData.noidung,
                                tieude:childData.tieude,
                                video:childData.video,
                            });
                        });
            
                        that.setState({
                            data :[...that.state.data,...array],
                            datatimkiem:[...that.state.datatimkiem,...array],
                            lasttolist:lasttolist+1,
                            loading:false,
                        });

                    });
            }
            else{
                that.setState({
                    loading:false,
                });
            }
        }
        
    }


    tukhoa_thaydoi(val){
        this.setState({
            tukhoa:val,
        })
        if(val==""){
            this.setState({
                actitimkiem:false,
                datatimkiem:this.state.data,
                tukhoa:""
            })
        }
    }

    timkiem(){
        this.setState({
            datatimkiem:[],
        })
        if(this.state.tukhoa!=null){
            var temp=[];
            this.state.data.forEach(element => {
                var tieude=element.tieude.toLocaleLowerCase();
                var noidung=element.noidung.toLocaleLowerCase();
                var tukhoa=this.state.tukhoa;
                    tukhoa=tukhoa.toLocaleLowerCase();
                if(tieude.search(tukhoa)!=-1){
                    if(this.kiemtramang(temp,tieude)){
                        temp.unshift(element); 
                    }
                }
                else{
                    if(noidung.search(tukhoa)!=-1){
                        if(this.kiemtramang(temp,tieude)){
                            temp.push(element); 
                        }
                    }
                }
            });
            this.setState({
                datatimkiem:temp,
                actitimkiem:true,
            })
        }else{
            this.setState({
                datatimkiem:this.state.data,
                actitimkiem:false,
            })
        }
        Keyboard.dismiss();
    }

    kiemtramang(mang,text){
        mang.forEach(element => {
            if(text==element.tieude){
                return false;
            }
        });
        return true;
    }

    xemthongtin(tieude,noidung,hieuung,video){
        this.setState({
            hieuung:hieuung,
            noidung:noidung,
            tieude:tieude,
            video:video,
        });
        this.MonHoc.open();
    }


    render() {
        return (
            <View style={Styles.container}>
                <StatusBar hidden={true} />
                {
                    (()=>{
                        if (this.state.loading) {
                            return (
                                <View style={Styles.activityindicator}>
                                    <ActivityIndicator size={60} color= '#136d7c' />
                                </View>
                            );
                        }
                    })()
                }
                <View style={Styles.header}>
                    <TouchableOpacity style={Styles.buttonback} activeOpacity={0.6} 
                    onPress={()=>this.props.navigation.goBack()}>
                        {/* <Image source={require("../image/iconback.png")} style={Styles.imageback}/> */}
                        <Ionicons name={'md-arrow-round-back'} style={Styles.iconback}/>
                    </TouchableOpacity>
                    <View style={Styles.headertimkiem}>
                        <TextInput 
                            allowFontScaling={true}
                            style={Styles.headerkhungtimkiem}
                            underlineColorAndroid='transparent'
                            selectionColor='#07c6c0'
                            placeholderTextColor='#545454'
                            placeholder="tìm kiếm nội dung bài học"
                            onChangeText={(val)=>this.tukhoa_thaydoi(val) }
                            value={this.state.tukhoa}/>
                        <TouchableOpacity style={Styles.buttonsearch} activeOpacity={0.6} 
                            onPress={()=>this.timkiem()}>
                            <Ionicons name={'md-search'} style={Styles.iconsearch}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    (()=>{
                        if(this.state.datatimkiem.length==0){
                            return(
                                <ImageBackground resizeMode='contain' source={require('../image/khongtimthay.png')} style={{width: '100%', height: '100%'}}>

                                </ImageBackground>
                            );
                        }
                    })()
                }
                <FlatList
                    // showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.3}
                    // refreshing={refreshing}
                    // onRefresh={this.handleRefresh}
                    onEndReached={()=>{
                        if(this.state.actitimkiem==false){
                            this.loadDataLyThuyet(false)
                        }
                    }}
                    style={Styles.flatlist}
                    data={this.state.datatimkiem}
                    renderItem={({item,index})=>
                        <TouchableOpacity style={Styles.khung} activeOpacity={0.8} 
                            onPress={()=>this.xemthongtin(item.tieude,item.noidung,item.hieuung,item.video)}>

                            <View style={Styles.khungnoidung}>
                                <View style={Styles.khungtieude}>
                                    <Text style={Styles.tieude} 
                                        allowFontScaling={true}
                                        numberOfLines={1}>
                                        {item.tieude}
                                    </Text>
                                    {/* {
                                        (()=>{
                                            if(item.trangthai=="ĐÃ ĐỌC"){
                                                return(
                                                    <Feather name={'check-circle'} style={Styles.iconcheck}/>
                                                );
                                            }
                                        })()
                                    } */}
                                </View>
                                <View style={Styles.khungghichu} >
                                    <Text style={Styles.noidung}
                                        allowFontScaling={true}
                                        numberOfLines={6}>
                                        {item.noidung}
                                    </Text>
                                </View>
                            </View>
                            {
                                (()=>{
                                    if(index==this.state.datatimkiem.length-1){
                                        return(
                                            <View style={{marginBottom:50/height*standardHeight,}}>
                                            </View>
                                        );
                                    }
                                })()
                            }
                        </TouchableOpacity>
                    }
                />

            <RBSheet
                animationType="slide"
                openDuration={800}
                closeDuration={400}
                // closeOnDragDown={true}
                // dragFromTopOnly={true}
                // closeOnPressMask={true}
                // closeOnPressBack={true}

                ref={ref => {
                  this.MonHoc = ref;
                }}
                height={height}
                customStyles={{
                  container: {
                        flexDirection:'column'
                    }
                }}>
                  <TouchableOpacity style={Styles.nutthoat} activeOpacity={0.6} 
                    onPress={()=>this.MonHoc.close()}>
                      <SimpleLineIcons name="chemistry" style={Styles.iconbuttonthoat}/>
                  </TouchableOpacity>
                  <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{alignItems:'center',justifyContent:'center'}}
                    style={Styles.scrollview_noidungmonhoc}>
                    <View style={Styles.khungtieude_noidung}>
                        <Text allowFontScaling={true} style={Styles.tieude_noidungmonhoc}>{this.state.tieude}</Text>
                    </View>
                    <View style={Styles.khungtieude_noidung}>
                        <Text allowFontScaling={true} style={Styles.noidungmonhoc}>{this.state.noidung}</Text>
                    </View>
                    <View style={Styles.khunghinhnoidung}>
                                        <Image 
                                            resizeMode="contain"
                                            source={{uri: this.state.hieuung}}
                                            style={Styles.anhnoidung} />
                                    </View>
                    <View style={Styles.video}>
                                        <VideoPlayer 
                                            seekColor="#f2983e"
                                            controlTimeout={3000}
                                            source={{ uri: this.state.video }}/>
                                    </View>
                  </ScrollView> 
            </RBSheet>

            </View>
        )
    }
}
