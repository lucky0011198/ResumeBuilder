import { SplashScreen, Stack, Tabs, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Client, Account, ID } from "appwrite";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppwriteService from '@/services/appwrite';
import { FontAwesome6 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';




export default function Init({children,route}: {children: React.ReactNode,route:any}) {
  const colorScheme = useColorScheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1'); // Default country code

  const handleSendOTP = async () => AppwriteService.createPhoneSession(phoneNumber);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={{fontSize: 20, width:200, fontWeight: 'bold'}}>Tell us your mobile number</ThemedText>
      </ThemedView>
      <View style={styles.inputContainer}>
        {/* <Picker
          selectedValue={countryCode}
          style={styles.countryPicker}
          onValueChange={(itemValue, itemIndex) => setCountryCode(itemValue)}
        >
          <Picker.Item label="+1 USA" value="+1" />
          <Picker.Item label="+44 UK" value="+44" />
          <Picker.Item label="+91 India" value="+91" />
\        </Picker> */}
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      <TouchableOpacity style={[{marginTop:"auto"},styles.button]} onPress={handleSendOTP}>
        <ThemedText style={{fontSize: 16, fontWeight: 'bold',color:'#ffff'}}>Send OTP</ThemedText>
        <FontAwesome6 name="arrow-right-long" size={24} color="#ffff" />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:"#000",
    padding:20,
    margin:20
  },
  header: {
    flex: 0.3,
    padding: 20,
    justifyContent:'flex-end',
    alignItems:'flex-start'
  },
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize:15
  },
  countryPicker: {
    width: 100,
  },
  input: {
    flex: 1,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    margin:20,
    color:"#000",
    fontSize:20,
    fontWeight:'800'
  },
});

