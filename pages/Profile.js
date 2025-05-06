import React, { useEffect, useState } from 'react'
import { Text, Button, Icon, TextInput } from 'react-native-paper';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, ScrollView,
  Platform, KeyboardAvoidingView  } from 'react-native';
import UserModel from '../models/UserProfile';
import UserData from '../controllers/UserController';

const Profile = () => {
  const [user, setUser] = useState(new UserModel());

  useEffect(() => {
    console.log('load data')
    const loadData = async () => {
      var data = await UserData.getUserData();
      if(data)
        setUser(data);
    }
    loadData();
  }, []);

  const formatCurrency = (value) => {
    const numeric = value.replace(/[^0-9]/g, '');
    if (!numeric) return '';
    const number = parseInt(numeric, 10);
    return `$${number.toLocaleString()}`;
  };

  const formatPercent = (value) => {
    const numeric = value.replace(/[^0-9]/g, '');
    if (!numeric) return '';
    var num = parseInt(numeric, 10);
    var percent = Math.round(num * 100) / 100;
    return `${percent}%`;
  };

  const updateField = (field, value) => {
    const saveUsr = async (usr) => {
      await UserData.saveUserData(usr);
    }

    const updatedUser = { ...user, [field]: value };
    setUser(updatedUser);
    saveUsr(updatedUser);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
          <View style={styles.gridContainer}>
            <View style={styles.titleRow}> 
              <Text style={styles.title}>User Information</Text>
            </View>
            <View style={styles.userInfoRow}>
              <View style={styles.labelContainer}>
                <Text style={styles.profileLbl}>Name: </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.profileInput} 
                  value={user.Name}
                  onChangeText={(text) => updateField('Name', text)}
                  placeholder='Jane Doe'></TextInput>
              </View>
            </View>
            <View style={styles.userInfoRow}>
              <View style={styles.labelContainer}>
                <Text style={styles.profileLbl}>Age: </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.profileInput} 
                  value={user.Age}
                  onChangeText={(text) => updateField('Age', text)}
                  placeholder='30' 
                  keyboardType='numeric'></TextInput>
              </View>
            </View>
            <View style={styles.userInfoRow}>
              <View style={styles.labelContainer}>
                <Text 
                style={styles.profileLbl}>Income Per Paycheck: </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.profileInput} 
                  value={user.PaycheckIncome}
                  onChangeText={(text) => updateField('PaycheckIncome', formatCurrency(text))}
                  placeholder='$5,000' 
                  keyboardType='numeric'></TextInput>
              </View>
            </View>
            <View style={styles.userInfoRow}>
              <View style={styles.labelContainer}>
                <Text style={styles.profileLbl}>Paychecks Per Year: </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.profileInput} 
                  value={user.PayPerYear}
                  onChangeText={(text) => updateField('PayPerYear', text)}
                  placeholder='12' 
                  keyboardType='numeric'></TextInput>
              </View>
            </View>
            <View style={styles.userInfoRow}>
              <View style={styles.labelContainer}>
                <Text style={styles.profileLbl}>Retirement Age: </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.profileInput} 
                  value={user.RetirementAge}
                  onChangeText={(text) => updateField('RetirementAge', text)}
                  placeholder='67' 
                  keyboardType='numeric'></TextInput>
              </View>
            </View>
            <View style={styles.userInfoRow}>
              <View style={styles.labelContainer}>
                <Text style={styles.profileLbl}>Percent Needed in Retirement:</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.profileInput} 
                  value={user.PercentNeeded}
                  onChangeText={(text) => updateField('PercentNeeded', formatPercent(text))}
                  placeholder='80%' 
                  keyboardType='numeric'></TextInput>
              </View>
            </View>
            <View style={styles.userInfoRow}>
              <View style={styles.labelContainer}>
                <Text style={styles.profileLbl}>Life Expectancy: </Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.profileInput} 
                  value={user.LifeExpectancy}
                  onChangeText={(text) => updateField('LifeExpectancy', text)}
                  placeholder='85'
                  keyboardType='numeric'></TextInput>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      justifyContent: 'space-evenly', 
    },
    titleRow: {
      width: '100%',
    },
    title: {
      textAlign: 'center',
      borderBottomWidth: 1,
      fontSize: 35,
    },
    userInfoRow: {
      flexDirection: 'row',
      width: '100%',
      display: 'flex',
      alignContent: 'center',
      borderBottomWidth: 1,
      padding: 15,
    },
    labelContainer: {
      alignSelf: 'center',
      textAlign: 'center',
      width: '51%',
    },
    profileLbl: {
      alignSelf: 'start',
      fontSize: 18,
    },
    inputContainer: {
      height: '100%',
      width: '100%',
    },
    profileInput: {
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: 'white',
      maxWidth: '50%',
      width: '50%',
      height: 25,
    },
  });

export default Profile;