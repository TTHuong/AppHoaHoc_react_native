import React, { Component} from 'react'
import {
ImageBackground,StyleSheet,StatusBar,View,ScrollView,Text,Button,TextInput,
SafeAreaView,Image,TouchableOpacity,FlatList,Dimensions,Linking ,
} from 'react-native';
import Styles from '../style/styles';
import {firebaseApp} from '../firebaseconfig/firebaseconfig';
import Feather from 'react-native-vector-icons/Feather';
import RBSheet from "./RBSheet";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import Slideshow from 'react-native-slideshow';
import {
getDataLop,getDataMonHoc,getDataQuangCao,
} from "./KiemtraData";
import MD5 from "react-native-md5";

const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 592;

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state={
            User:null,

            Quangcao:[],
            Intro:true,
            
            Lop:'Lớp 8',
            DataLop:[],
            Monhoc:[],

            sliderIndex: 0,
            Slider:0,

            doimauinputlop:false,
            buttonlop:'Lớp ',

            txt_avata:'',

            position: 1,

            interval: null,

        };
    }

    loadDataLop(){
        this.setState({
            DataLop : getDataLop(),
        });
    }

    loadDataMonHoc(){
        this.setState({
            Monhoc : getDataMonHoc(),
          });
    }

    loadDataQuangCao(){
        this.setState({
            Quangcao : getDataQuangCao(),
          });
    }

    // loadDataUser(val){
    //     // var user=GetUser(val);
    //     // this.setState({
    //     //     temp:user,
    //     // })
    //     // console.log("trong load data user "+user);

    //     let user = null;
    //     if(val != 'Biệt Đội Ong,' ){
    //         firebaseApp.database().ref('taikhoan').child(val).once('value',function(snapshot){
    //         user={
    //             id:val,
    //             tendaydu:snapshot.val().tendaydu,
    //             quyenhan:snapshot.val().quyenhan,
    //             nen:snapshot.val().nen,
    //             lop:snapshot.val().lop,
    //             avata:snapshot.val().avata,
    //         }
    //         })
    //     }
    //     this.setState({
    //         temp:user,
    //     })

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

    // laythongtintaikhoan(temp){
    //     if(temp==null){
    //         this.setState({
    //             Lop:'Lớp 1',
    //         })
    //     }
    //     this.setState({
    //         User:temp,
    //     })
    //     console.log("trong lay thong tin "+temp);
    // }

    // shouldComponentUpdate(nextProps, nextState) {        
    //     if(this.state.Id != nextState.Id ){
    //         this.loadDataUser(nextState.Id);
    //         console.log("vo shouldComponentUpdate "+nextState.Id);
    //     }
    //     if(this.state.temp!=nextState.temp){
    //         this.laythongtintaikhoan(nextState.temp);
    //     }
    //     return true;
    // }

    doimaubutton(tenlop){
        this.setState({
            buttonlop:tenlop,
        })
    }

    luulop(){
        
        this.setState({
            Lop:this.state.buttonlop,
        });
        this.ChonLop.close();
    }


    dangxuat = () => {
        firebaseApp
        .auth()
        .signOut()
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => err=error.message);
        this.setState({
            Lop:'Lớp 8',
        })
    }
    


    componentDidMount(){
        
        this.kiemtra_dangnhap();
        this.loadDataLop();
        this.loadDataMonHoc();
        this.loadDataQuangCao();
        
        this.setState({
            Intro:false,

            // interval: setInterval(() => {
            //     this.setState({
            //       position: this.state.position === this.state.Quangcao.length ? 0 : this.state.position + 1
            //     });
            //   }, 5000)
        });
    }

    chuyentrangmonhoc(Id){
        var that =this;
        var vtcuoi=0;
        firebaseApp.database().ref("LyThuyet").child(Id).orderByChild('idbaihoc').limitToLast(1).once('value',function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                vtcuoi=childSnapshot.val().idbaihoc;
            });

            that.props.navigation.navigate('Monhoc',{Id:Id,vtcuoi:vtcuoi});
        });


    }

    molink(value ){
        // console.log("toi ne "+value.index.toString());
        var mang=this.state.Quangcao;
        var vt=parseInt(value.index.toString());
        Linking.openURL(mang[vt].linkweb);
    }


    render() {
        return (
            <ImageBackground resizeMode='stretch' source={require('../image/nen.png')} style={{width: '100%', height: '100%'}}>
                <StatusBar backgroundColor="#08C1DC" animated={true} hidden={true}/>
                <ScrollView style={Styles.srollview} showsVerticalScrollIndicator={false} 
                // endFillColor='yellow' 
                keyboardDismissMode='on-drag' decelerationRate='fast'>
                    <View style={Styles.home_thongtincanhan}>
                            
                                            <View style={Styles.home_khungthongtin}>
                                                <View style={Styles.home_khunganh}>
                                                    {
                                                        (()=>{
                                                            if(this.state.User!=null){
                                                                    return(
                                                                        <TouchableOpacity activeOpacity={0.9} onPress={()=>this.props.navigation.navigate('Infouser')}>
                                                                            <Image source={{uri:this.state.User.avata}}
                                                                                style={Styles.home_anh}
                                                                            />
                                                                        </TouchableOpacity>
                                                                        
                                                                    )
                                                            }else{
                                                                return(
                                                                    <Image source={require('../image/avata.png')}
                                                                        style={Styles.home_anh}
                                                                    />
                                                                    
                                                                )
                                                            }
                                                            
                                                        })()
                                                    }
                                                </View>
                                                
                                                    {
                                                        (()=>{
                                                            if(this.state.User!=null){
                                                                if(this.state.User.quyenhan =='user'){
                                                                    return(
                                                                        <View style={Styles.home_khungchu}>
                                                                            <Text style={Styles.home_chutieude}>Xin chào , {this.state.User.tendaydu}</Text>
                                                                            <Text style={Styles.home_chuhoitham}>Hôm nay bạn muốn học gì?</Text>
                                                                        </View>
                                                                    )
                                                                }else{
                                                                    return(
                                                                        <View style={Styles.home_khungchu}>
                                                                            <Text style={Styles.home_chutieude}>Xin chào Admin , {this.state.User.tendaydu}</Text>
                                                                            <Text style={Styles.home_chuhoitham}>Hôm nay bạn muốn làm gì?</Text>
                                                                        </View>
                                                                    )
                                                                }
                                                            }
                                                            else{
                                                                return(
                                                                    <View style={Styles.home_khungchu}>
                                                                        <Text style={Styles.home_chutieude}>Biệt Đội Ong,</Text>
                                                                        <Text style={Styles.home_chuhoitham}>Hôm nay bạn muốn học gì?</Text>
                                                                    </View>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                    
                                    {
                                        (()=>{
                                            if(this.state.User==null)
                                            {
                                                return (
                                                    <View style={Styles.home_khungdangky_dangnhap}>
                                                        <View style={Styles.home_dangky_dangnhap_container}>
                                                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DKDN',{active_dk:true})}}>
                                                                <Text style={Styles.home_chudangky_dangnhap}>Đăng Ký</Text>
                                                            </TouchableOpacity>
                                                            <Text style={Styles.home_chudangky_dangnhap}> / </Text>
                                                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('DKDN',{active_dk:false})}}>
                                                                <Text style={Styles.home_chudangky_dangnhap}>Đăng Nhập</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                            
                                                )
                                            }else{
                                                return (
                                                    <View style={Styles.home_khungdangky_dangnhap}>
                                                        <View style={Styles.home_dangky_dangnhap_container}>
                                                            <TouchableOpacity onPress={()=>{this.dangxuat()}}>
                                                                <Text style={Styles.home_chudangky_dangnhap}>Đăng Xuất</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                            
                                                )
                                            }
                                        })()
                                    }
                            </View>
                    </View>

                    <View style={Styles.home_khungquangcao}>
                        <View style={Styles.home_khungquangcaocontainer}>
                            <View style={Styles.home_tenquangcao}>
                                <Text style={Styles.home_chuquangcao}>Dành riêng Cho Bạn</Text>
                            </View>
                            <View style={Styles.home_khungquangcaonho}>
                                <Slideshow 
                                    onPress={(position )=>this.molink(position )}
                                    containerStyle={Styles.home_khunganhquangcao}
                                    arrowSize={29}
                                    overlay={true}
                                    indicatorSize={10}
                                    indicatorSelectedColor="#ff8205"
                                    indicatorColor='#deb7ff'
                                    position={this.state.position}
                                    onPositionChanged={position => this.setState({ position })}
                                    dataSource={this.state.Quangcao}
                                />
                                {/* <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    style={Styles.home_flatlistquangcao}
                                    horizontal
                                    pagingEnabled
                                    data={this.state.Quangcao}
                                    renderItem={({item})=>
                                        <View style={Styles.home_khunganhquangcao}>
                                            <TouchableOpacity >
                                                <Image resizeMode="stretch" source={{ uri: item.imageUrl }} style={Styles.home_anhquangcao} />
                                            </TouchableOpacity>
                                        </View>
                                    }
                                /> */}
                            </View>

                            
                                {/* {
                                    (()=>{
                                        for(var i=0;i<this.state.Quangcao.length;i++)
                                        {
                                            return (
                                                <FlatList 
                                                horizontal
                                                style={Styles.home_khungnutslide}
                                                contentContainerStyle={{alignItems:'center',justifyContent:'center'}}
                                                data={this.state.Quangcao}
                                                renderItem={({item,index})=>
                                                    this.state.Slider==item.Id ?
                                                    <TouchableOpacity key={i} style={Styles.home_nutslidechay}>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity key={i} style={Styles.home_nutslidekhongchay}>
                                                    </TouchableOpacity>
                                                }
                                                />
                                            )
                                            
                                        }
                                    })()
                                } */}
                                
                            
                        </View>
                    </View>

                    <View style={Styles.home_monhoc}>
                            <View style={Styles.home_danhsachmonhoc}>
                                <View style={Styles.home_khunglophoc}>

                                    <View style={Styles.home_khungchulophoc}>
                                        <Text style={Styles.home_chulophoc}>
                                            Ong Ham Học
                                        </Text>
                                    </View>

                                    <TouchableOpacity activeOpacity={0.7}
                                    style={Styles.home_khungtimkiemlop} onPress={()=>this.ChonLop.open()}>
                                        <View style={Styles.home_khungtimkiem}>
                                            <Text style={Styles.home_chutimkiem}>{this.state.Lop}</Text>
                                            <Feather name={'chevron-down'} style={Styles.home_icontimkiem}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={Styles.home_khungmonhoc}>
                                    <FlatList  
                                    showsVerticalScrollIndicator={false}
                                    numColumns={4}
                                    data={this.state.Monhoc}
                                    renderItem={({item})=>
                                        item.lop==this.state.Lop?
                                            <View style={Styles.home_khungmonhocnho}>
                                                <TouchableOpacity style={Styles.home_khunganhmonhocnho} onPress={()=>this.chuyentrangmonhoc(item.id)}>
                                                    <Image source={{uri:item.anh}} style={Styles.home_anhmonhocnho} />
                                                </TouchableOpacity>
                                                    <Text style={Styles.home_chumonhocnho}>{item.tenmon}</Text>
                                            </View>
                                            :
                                            <View></View>
                                    }/>
                                    
                                </View>
                            </View>
                    </View>
                    {/* <Button title="click me" onPress={()=>this.dangxuat()}/> */}
                </ScrollView>


                {/* khung chọn lớp */}
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
            </ImageBackground>
        )
    }
}
