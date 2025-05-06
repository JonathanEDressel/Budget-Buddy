import React, { useEffect, useState } from 'react'
import { Text, Button, Icon } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import 'react-dropdown/style.css';
import CalculatorView from './pages/Calculator';
import ProfileView from './pages/Profile';
import Projection from './pages/401kProjection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserModel from './models/UserProfile';

const pages = [
  { Id: 1, label: 'Home', title: 'Home' },
  { Id: 2, label: 'Calc', title: 'Calculator' },
  { Id: 3, label: '401k', title: '401(k) Estimate' },
];

export default function App() {

  const [currPage, setPage] = useState(null);
  const [user, setUser] = useState(new UserModel());
  const [pgTitle, setPageTitle] = useState('Home');

  useEffect(() => {
    const loadData = async () => {
      var data = await UserData.getUserData();
      if(data)
        setUser(data);
    }
    loadData();
  }, []);

  return (
    <View style={[styles.body]}>
      <View style={[styles.header]}>
        <View style={[styles.menuDiv]}>
          <SelectDropdown
            data={pages}
            onSelect={(selectedItem) => {
              setPage(selectedItem.Id);
              setPageTitle(selectedItem.title);
              console.log('currPage - ', selectedItem, currPage);
            }}
            renderButton={(itm, tdx) => {
              return (
                <View style={[styles.menuContainer]}>
                  <Button key={'menu'} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button}>
                    <Ionicons name="menu" style={[styles.headerIcons]} />
                  </Button>
                </View>
              );
            }} 
            renderItem={(item, index, isSelected) => {
              return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
        <View style={[styles.profileContainer]}>
          <Button key={'profile'} mode='outlined' labelStyle={[styles.buttonLbl]} style={styles.button} onPress={() => setPage(4)}>
            <Ionicons name="person-circle-outline" style={[styles.headerIcons]} />
          </Button>
        </View>
      </View>
      <View style={[styles.body]}>
      {currPage === 2 && <CalculatorView />}
      {currPage === 3 && <Projection />}
      {currPage === 4 && <ProfileView />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  header: {
    maxHeight: '10%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: '#D3D3D3',
    width: '105%',
  },
  headerIcons: {
    fontSize: 23,
    color: 'black',
  },
  menuDiv: {
    width: '50%'
  },
  menuContainer: {
    alignItems: 'flex-start',
    // width: '50%',
  },
  profileContainer: {
    alignItems: 'flex-end',
    width: '50%',
  },
  body: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFDAB9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: 200,
    color: 'black',
  },
});