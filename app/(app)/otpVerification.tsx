import { ThemedText } from '@/components/ThemedText';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TextInputProps, TouchableOpacity } from 'react-native';
import AppwriteService from '@/services/appwrite';
import { AppwriteContext, AppwriteContextProvider } from '@/services/AppwriteContext';

const OTPVerificationScreen: React.FC = () => {
  const numInputs: number = 6;
  const [otp, setOtp] = useState<string[]>(new Array(numInputs).fill(''));
  const inputRefs = useRef<Array<React.RefObject<TextInput>>>(new Array(numInputs).fill(null).map(() => React.createRef()));


  const handleChange = (text: string, index: number): void => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text.length === 1 && index < numInputs - 1) {
      inputRefs.current[index + 1].current?.focus();
    } else if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    }
  };

  const verifyOTP =  async(): Promise<void> => {

    if (otp.join('').length < numInputs) {
      Alert.alert('Error', 'Please fill all the OTP fields');
      return;
    }
    AppwriteService.verifyPhoneSession(otp.join(''));
    // Add logic to handle the verification result
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.inputContainer}>
        {otp.map((value, index) => (
          <TextInput
            autoComplete='sms-otp'
            key={index}
            ref={inputRefs.current[index]}
            style={styles.input}
            onChangeText={(text) => handleChange(text, index)}
            value={value}
            keyboardType="numeric"
            maxLength={1}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && !otp[index]) {
                // Handle backspace at empty input
                const prevIndex = index - 1;
                if (prevIndex >= 0) {
                  handleChange('', prevIndex);
                  inputRefs.current[prevIndex].current?.focus();
                }
              }
            }}
          />
        ))}
      </View>
       <TouchableOpacity style={[{marginTop:"auto"},styles.button]} onPress={verifyOTP}>
        <ThemedText style={{fontSize: 16, fontWeight: 'bold',color:'#ffff'}}>Send OTP</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#ddd",
        padding:15,
        margin:20,
        width:"90%",
        alignItems:"center",
        justifyContent:"center"
      },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems:'center',
  },
  input: {
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor:"#3d3d3d",
    marginHorizontal:10,
    color:"#ffff"
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default OTPVerificationScreen;