import { Image, StyleSheet, Platform, Button, SafeAreaView, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, router } from 'expo-router';
import { useEffect } from 'react';
import { AppwriteContext, AppwriteContextProvider } from '@/services/AppwriteContext';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '@/services/appwrite';
import AppwriteService from '@/services/appwrite';
import { Colors } from '@/constants/Colors';
import { FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import {UserSharingIcon,ArrowRight02Icon} from '@/assets/icons/customIcons';

export default function HomeScreen() {

  const [user,setuser] = useRecoilState(userState);

  async function setUser(){
    let userData = await AppwriteService.getCurrentUser();
    if(!userData?.phoneVerification) {
      router.navigate("/init");
    }
    setuser(userData);
  }

  useEffect(() => {
    setUser();
  },[])

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity style={[{marginLeft:20 },styles.center]}>
          <ThemedView  style={{flexDirection:'row'}}>
          </ThemedView>
         </TouchableOpacity>
        <TouchableOpacity style={[styles.avatarButton,{marginLeft:"auto",marginRight:10},styles.center]}>
        <FontAwesome5 name="user" size={20} color="#ddd" />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={{flexDirection:'row'}}>
        <ThemedView style={styles.card}>
          <ThemedView style={{marginTop:40,marginLeft:15}}>
            <UserSharingIcon />
        <ThemedText darkColor='#ffff' style={{marginTop:12, fontWeight:'700'}}>Profile</ThemedText>
        <ThemedText darkColor='#acacac' style={{fontSize:12}}>complete your Profile</ThemedText>
        <TouchableOpacity style={{marginLeft:'auto',marginRight:20, marginTop:10,flexDirection:'row'}}>
      
        </TouchableOpacity>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.card}>
          <ThemedText>explore theams</ThemedText>
        </ThemedView>

      </ThemedView>
      <ThemedView style={styles.footer}></ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card:{
    flex:1,
    height:180,
    borderWidth:1,
    borderColor: '#3d3d3d',
    margin:5
  },
  container:{
    flex: 1,
  },
  center:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  header:{
    height:100,
    width:"100%",
    flexDirection:"row",
    backgroundColor:Colors.dark?"#000":'#ddd',
    justifyContent:'center',
    alignItems:'flex-end',
    paddingBottom:16
  },
  footer:{},
  avatarButton:{
    width:40,
    height:40,
  }

});
