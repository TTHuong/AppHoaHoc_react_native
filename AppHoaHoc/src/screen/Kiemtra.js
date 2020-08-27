import React, { Component} from 'react'
import {
ImageBackground,StyleSheet,StatusBar,View,ScrollView,Text,Button,TextInput,
SafeAreaView,Image,TouchableOpacity,FlatList,Dimensions,ActivityIndicator,Keyboard,
} from 'react-native';
import Styles from "../style/style_baitap";
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

const {height, width} = Dimensions.get('window');
const standarWidth = 360;
const standardHeight = 592;

export default class Kiemtra extends Component {

    constructor(props){
        super(props);
        this.state={
            actitimkiem:false,

            IdMonhoc:null,

            lasttolist:null,

            vtcuoi:null,

            User:null,

            doimauinputlop:true,

            Monhoc:[],

            Lop:'Lớp 8',

            Mon:'',

            DataLop:[],
            
            buttonlop:'Lớp ',

            data:[],

            datatimkiem:[],

            loading:false,
            
            tukhoa:'',

            hieuung:'',
            noidung:"",
            tieude:"",
            video:"",
        };
    }

    tukhoa_thaydoi(val){
        this.setState({
            tukhoa:val,
        })
        if(val==""){
            this.setState({
                datatimkiem:this.state.data,
                tukhoa:"",
                actitimkiem:false,
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

    componentDidMount(){
        this.kiemtra_dangnhap();
        this.loadDataLop();
        this.loadDataMonHoc();
    }
    doimaubutton(tenlop){
        this.setState({
            buttonlop:tenlop,
        })
    }

    kiemtra_dangnhap(){
        var that =this;
        firebaseApp.auth().onAuthStateChanged(user => {
            if(user){
                firebaseApp.database().ref('taikhoan').child(MD5.hex_md5(user.email)).once('value',function(snapshot){
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

    luulop(){
        
      this.setState({
            Lop:this.state.buttonlop,
            Mon:"",
            data:null,
            datatimkiem:null,
            actitimkiem:false,
            IdMonhoc:null,
            lasttolist:null,
            vtcuoi:null,
      });
    //   this.ChonLop.close();
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

    loadDataBaiKiemTra(kt,Id,Mon){
        var that =this;
        var lasttolist=0;

        this.setState({
            IdMonhoc:Id,
            Mon:Mon,
        });

        if(kt){
            firebaseApp.database().ref("KiemTra").child(Id).orderByChild('idkiemtra').limitToFirst(4).once('value',function(snapshot){
                let array = [];
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    lasttolist=childSnapshot.val().idkiemtra;
                    // console.log("cai dau "+lasttolist+ " tieu de "+childData.tieude );
                    array.push({
                        idkiemtra : childData.idkiemtra,
                        cauhoi:childData.cauhoi,
                        noidung:childData.noidung,
                        tieude:childData.tieude,
                        dapan:childData.dapan,
                      });
                  });
      
                  that.setState({
                    data : array,
                    datatimkiem:array,
                    lasttolist:lasttolist+1,
                  });

            });

            firebaseApp.database().ref("KiemTra").child(Id).orderByChild('idkiemtra').limitToLast(1).once('value',function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                   that.setState({
                       vtcuoi:childSnapshot.val().idkiemtra,
                   })

                });
            });
        }
        else{
            this.setState({
                loading:true,
            });
            if(this.state.lasttolist<=this.state.vtcuoi)
            {
                firebaseApp.database().ref("KiemTra").child(Id).orderByChild('idkiemtra')
                        .startAt(that.state.lasttolist).limitToFirst(4).once('value',function(snapshot){
                        let array = [];
                        snapshot.forEach(function(childSnapshot) {
                            var childData = childSnapshot.val();
                            // console.log("toi load more roi "+lasttolist + " tieu de "+childData.tieude);
                            lasttolist=childSnapshot.val().idkiemtra;
                            array.push({
                                idkiemtra : childData.idkiemtra,
                                cauhoi:childData.cauhoi,
                                noidung:childData.noidung,
                                tieude:childData.tieude,
                                dapan:childData.dapan,
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
        // this.ChonLop.close();
    }

    chuyentrang(item){
        if(this.state.User!=null){
            this.props.navigation.navigate('LamKiemTra',{BaiKiemTra:item});
        }
        else{
            this.Thongbao.open();
        }
    }

    render() {
        return (
          <View style={{flex:1,backgroundColor:'white'}}>
            <StatusBar backgroundColor="#08C1DC" animated={true} hidden={true}/>
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
            <View style={Styles.monhoc}>
                  <View style={Styles.home_danhsachmonhoc}>
                      <View style={Styles.home_khunglophoc}>

                          <View style={Styles.home_khungchulophoc}>
                              <Text style={Styles.home_chulophoc}>
                                  Kiểm Tra Ong
                              </Text>
                          </View>

                          <TouchableOpacity activeOpacity={0.7}
                          style={Styles.home_khungtimkiemlop} onPress={()=>this.ChonLop.open()}>
                              <View style={Styles.home_khungtimkiem}>
                                  <Text style={Styles.home_chutimkiem}>{this.state.Lop}  {this.state.Mon}</Text>
                                  <Feather name={'chevron-down'} style={Styles.home_icontimkiem}/>
                              </View>
                          </TouchableOpacity>
                      </View>
                      
                      <View style={Styles.home_khungmonhoc}>
                          {/* <FlatList  
                          showsVerticalScrollIndicator={false}
                          numColumns={4}
                          data={this.state.Monhoc}
                          renderItem={({item})=>
                              item.lop==this.state.Lop?
                                  <View style={Styles.home_khungmonhocnho}>
                                      <TouchableOpacity style={Styles.home_khunganhmonhocnho} onPress={()=>this.loadDataBaiTap(true,item.id)}>
                                          <Image source={{uri:item.anh}} style={Styles.home_anhmonhocnho} />
                                      </TouchableOpacity>
                                          <Text style={Styles.home_chumonhocnho}>{item.tenmon}</Text>
                                  </View>
                              :
                              <View></View>
                          }/> */}
                            <View style={Styles.khungtimkiem}>
                                    <TextInput 
                                        autoCompleteType='name'
                                        autoCapitalize='none'
                                        underlineColorAndroid='transparent'
                                        selectionColor='#07c6c0'
                                        placeholderTextColor='#aaaaaa'
                                        placeholder="Bài kiểm tra cần tìm..."
                                        onChangeText={(val)=>this.tukhoa_thaydoi(val)}
                                        value={this.state.tukhoa}
                                        style={Styles.khungnhaptimkiem}
                                    />
                                    <TouchableOpacity activeOpacity={0.8} style={Styles.buttontimkiem}  onPress={()=>this.timkiem()}>
                                        <Ionicons name={'md-search'} style={Styles.icontimkiem} />
                                    </TouchableOpacity>
                                </View>
                          
                      </View>
                  </View>
            </View>

            <FlatList
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    onEndReached={()=>{
                        if(this.state.actitimkiem==false){
                            this.loadDataBaiKiemTra(false,this.state.IdMonhoc,this.state.Mon);
                        }
                    }}
                    style={Styles.flatlist}
                    data={this.state.datatimkiem}
                    renderItem={({item,index})=>
                        <TouchableOpacity style={Styles.khung} activeOpacity={0.8} 
                            onPress={()=>this.chuyentrang(item)} 
                        >

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
                        <ScrollView 
                            showsHorizontalScrollIndicator={false}
                            horizontal 
                            pagingEnabled 
                            style={{width:'100%',height:'100%'}}>
                            <View style={{width:width,height:"100%"}} >
                                
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

                            </View>
                            <View style={{width:width,height:"100%"}}>

                                <View style={[Styles.dkdn_khunghienlop]} >
                                    <View style={Styles.dkdn_khungbangchonlop_top}>
                                        <View style={Styles.dkdn_khungbangchonlop_top_khungtieude}>
                                            <Text style={Styles.dkdn_khungbangchonlop_top_tieude}>
                                                Chọn Môn Học
                                            </Text>
                                        </View>
                                        <TouchableOpacity onPress={()=>this.ChonLop.close()}>
                                            <FontAwesome name={'close'} style={Styles.dkdn_iconmatkhau}/>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={Styles.dkdn_khungbangchonlop_middle}>
                                        <View style={Styles.dkdn_khungbangchonlop_middle_khung}>
                                            <FlatList 
                                                contentContainerStyle={{alignItems:'center',justifyContent:'center'}}
                                                showsVerticalScrollIndicator={false}
                                                numColumns={4}
                                                data={this.state.Monhoc}
                                                renderItem={({item})=>
                                                    item.lop==this.state.Lop?
                                                        <View style={Styles.home_khungmonhocnho}>
                                                            <TouchableOpacity style={Styles.home_khunganhmonhocnho} onPress={()=>this.loadDataBaiKiemTra(true,item.id,item.tenmon)}>
                                                                <Image source={{uri:item.anh}} style={Styles.home_anhmonhocnho} />
                                                            </TouchableOpacity>
                                                                <Text style={Styles.home_chumonhocnho}>{item.tenmon}</Text>
                                                        </View>
                                                    :
                                                    <View></View>
                                                }/>
                                        </View>
                                    </View>

                                </View >
                            </View>
                        </ScrollView> 
                </RBSheet>


                <RBSheet
                    ref={ref => {
                        this.Thongbao = ref;
                    }}
                    height={0.5*height}
                    openDuration={250}
                    dragFromTopOnly={true}

                    customStyles={{
                        container: {
                            backgroundColor:"transparent",
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}
                    >
                    <Image resizeMode="stretch" 
                        style={{
                            width:"100%",
                            height:'100%'
                        }} 
                        source={require("../image/thongbao.png")}/>
                </RBSheet>

                {/* <RBSheet
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
            </RBSheet> */}
          </View>
        )
    }

}
