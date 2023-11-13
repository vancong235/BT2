import { StyleSheet, Text, View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import BasicFlatList from './BasicFlatList'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, React } from 'react';
import fdata from '../data/fdata';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AllNote = () => {

  const [fdata, setFdata] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('fdata');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const storeData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('fdata', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const initializeData = async () => {
    const existingData = await getData();
    if (existingData) {
      setFdata(existingData);
    } else {
      setFdata(fdata);
      await storeData(fdata);
    }
  };



  useEffect(() => {
    initializeData();
  }, []);

  const navigation = useNavigation();
  const handleAddImagePress = () => {
    navigation.replace('AddNote');
  };
  
  const handleExcImagePress = () => {
    navigation.replace('DetailNote');
  };
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.bar}>
            <Text style={styles.font}>Multi Notes</Text>
        </View>
        <TouchableOpacity onPress={handleAddImagePress}>
          <Image
            source={require('../assets/add.png')}
            style={styles.image1}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleExcImagePress}>
          <Image
            source={require('../assets/exc.png')}
            style={styles.image2}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.row, { marginBottom: 10 }]}>
        <BasicFlatList></BasicFlatList>
      </View>
    </View>
  )
}

export default AllNote

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4473c5"
  },
  row: {
    flexDirection: 'row',
  },
  image1: {
    position: 'absolute',
    width: windowWidth * 1/10,
    height:  windowWidth * 1/10,
    top: windowWidth * 1/30,
    right: windowWidth * 1/32,
    resizeMode: 'contain',
  },
  image2: {
    position: 'absolute',
    width: windowWidth * 1/11,
    height:  windowWidth * 1/10,
    top: windowWidth * 1/30,
    right: windowWidth * 1/6,
    resizeMode: 'contain',
  },
  bar : {
    width: '100%',
    height:  windowWidth * 1/6,
    backgroundColor: '#2f5596'
  },
  font : {
    padding: 5,
    left: 5,
    fontSize: 25,
    color: 'white'
  }
})