import  React,{useState} from 'react';
import { 
View, Text, Button,Easing,Image,TouchableOpacity,

} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets,CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from './src/style/styles';
import StylesBottomtab from './src/style/style_bottomtab';

// import Intro from './src/screen/Intro';
import Home from './src/screen/Home';
import Baitap from './src/screen/Baitap';
import Kiemtra from './src/screen/Kiemtra';
import Khac from './src/screen/Khac';
import DKDN from './src/screen/Dangky_Dangnhap';
import Bottomtab from './src/screen/Bottomtab';
import Infouser from './src/screen/Infouser';
import Monhoc from './src/screen/Monhoc';
import LamKiemTra from './src/screen/LamKiemTra';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const Hometabnavigation=()=>(
  <Tab.Navigator 
    // screenOptions={({route})=>({
    //   tabBarIcon:({focused,color,size})=>{
    //     let iconName;
    //     if(route.name=="Trang chủ")
    //     {
    //       // iconName = focused
    //       //         ? 'home'
    //       //         : 'ios-information-circle-outline';
    //       iconName='home'
    //     }
    //     else if(route.name=="Bài tập")
    //     {
    //       iconName='book-open-page-variant'
    //     }
    //     else if(route.name=="Kiểm tra")
    //     {
    //       iconName='book'
    //     }
    //     else if(route.name=="Khác")
    //     {
    //       iconName='dots-horizontal'
    //     }
    //     return <MaterialCommunityIcons name={iconName} size={size} color={color} style={{backgroundColor:'yellow'}} />
    //   },
    // })}
    // tabBarOptions={{ 
    //   activeTintColor: '#f7c567',
    //   inactiveTintColor: '#b7b7b7',
    //   style:{
    //     height:70,
    //     // paddingTop:20,
    //     backgroundColor:'blue',

    //   },
    //   labelStyle:{
    //     // position:'absolute',
    //     fontSize:14,
    //     fontWeight:'bold',
    //     // lineHeight:10,
    //     backgroundColor:'green',
    //     marginBottom:-20
      
    //   },

    //   tabStyle:{
    //     // paddingTop:4,
    //     height:'100%',
    //     backgroundColor:'red',
    //     borderRightColor:'blue',
    //     borderRightWidth:2,
    //     // marginTop:50,
    //   },
    // }}
    tabBar={props => <Bottomtab {...props} />}
    >

      <Tab.Screen name="Trang chủ" options={{title:'Trang chủ'}} component={Home} />
      <Tab.Screen name="Bài tập" options={{title:'Bài tập'}} component={Baitap} />
      <Tab.Screen name="Kiểm tra" options={{title:'Kiểm tra'}} component={Kiemtra} />
      <Tab.Screen name="Khác" options={{title:'Khác'}} component={Khac} />
  </Tab.Navigator>
);


const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig={
  animation:'timing',
  config:{
    duration:500,
    easing:Easing.linear,

  }
};




export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator 
        // screenOptions={{
        //   gestureEnabled:true,
        //   gestureDirection:"vertical",
        //   ...TransitionPresets.SlideFromRightIOS,
        //   cardStyleInterpolator:CardStyleInterpolators
        //   .forHorizontalIOS,

        //   transitionSpec:{
        //     open:config,
        //     close:closeConfig,
        //   },
        // }}
        // initialRouteName="Hometabnavigation"
        // headerMode='float'
        // animation='fade'

      >
        {/* <Stack.Screen name="Hoc2" options={{
          title:'Trang Chủ',
          headerRight:()=>(<Button title="save" />) ,
          headerTitleAlign:"center",}} 
          component={Hoc2} /> */}
        {/* <Stack.Screen name="Intro" 
        options={{
          title:'trang intro',headerShown:false
        }} 
        component={Intro} /> */}
        <Stack.Screen name="Home" options={{title:'component macdinh',headerShown:false}} component={Hometabnavigation} />
        <Stack.Screen name="Bottomtab" options={{title:'component bottomtab',headerShown:false}} component={Bottomtab} />
        <Stack.Screen name="Baitap" options={{title:'component Baitap',headerShown:false}} component={Baitap} />
        <Stack.Screen name="Kiemtra" options={{title:'component Kiemtra',headerShown:false}} component={Kiemtra} />
        <Stack.Screen name="Khac" options={{title:'component Khac',headerShown:false}} component={Khac} />
        <Stack.Screen name="Infouser" options={{title:'component infouser',headerShown:false}} component={Infouser} />
        <Stack.Screen name="Monhoc" options={{title:'component Monhoc',headerShown:false}} component={Monhoc} />
        <Stack.Screen name="LamKiemTra" options={{
          headerTitle:props =>
          <View style={Styles.app_khungtieude_dkdn}>
            <Image source={require('./src/image/Logo.png')} style={Styles.app_anhtieude_dkdn} />
          </View>,
          headerStyle:{ backgroundColor:'#f9be57',height:90},
          headerTitleAlign:'center',
          headerTintColor:'white',
        }} component={LamKiemTra}/>

        <Stack.Screen name="DKDN" options={{
          headerTitle:props =>
          <View style={Styles.app_khungtieude_dkdn}>
            <Image source={require('./src/image/Logo.png')} style={Styles.app_anhtieude_dkdn} />
          </View>,
          headerStyle:{ backgroundColor:'#f9be57',height:90},
          headerTitleAlign:'center',
          headerTintColor:'white',
        }} component={DKDN}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
