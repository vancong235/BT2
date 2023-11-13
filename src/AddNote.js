import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Hi
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddNote = ({ route }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    const newItem = {
      id: new Date().getTime().toString(),
      title: title,
      description: description,
      createDate: new Date().toISOString(),
    };

    const existingData = await getData();

    if (existingData) {
      const updatedData = [...existingData, newItem];
      await storeData(updatedData);
    } else {
      const updatedData = [newItem];
      await storeData(updatedData);
    }

    navigation.replace('AllNote');
  };

  const handleReturn = () => {
    navigation.replace('AllNote');
  };

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


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.bar}>
          <Text style={styles.font}>Multi Notes</Text>
        </View>
        <TouchableOpacity onPress={handleSave}>
          <Image source={require('../assets/fd.png')} style={styles.image1} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleReturn}>
          <Image source={require('../assets/back.png')} style={styles.image2} />
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          placeholderTextColor="#000000"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { textAlignVertical: 'top', height: '88%' }]}
          placeholder="Enter description"
          placeholderTextColor="#000000"
          multiline
          value={description}
          onChangeText={setDescription}
        />
      </View>
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4473c5',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
    margin: 10,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    color: 'black',
  },
  image1: {
    position: 'absolute',
    width: windowWidth * 1 / 12,
    height: windowWidth * 1 / 10,
    top: windowWidth * 1 / 30,
    right: windowWidth * 1 / 32,
    resizeMode: 'contain',
  },
  image2: {
    position: 'absolute',
    width: windowWidth * 1 / 12,
    height: windowWidth * 1 / 10,
    top: windowWidth * 1 / 30,
    right: windowWidth * 1 / 6,
    resizeMode: 'contain',
  },
  bar: {
    width: '100%',
    height: windowWidth * 1 / 6,
    backgroundColor: '#2f5596',
  },
  font: {
    padding: 5,
    left: 5,
    fontSize: 25,
    color: 'white',
  },
});