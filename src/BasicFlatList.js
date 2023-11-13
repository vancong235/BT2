import { Dimensions, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FlatListItem = ({ item, onPress, onLongPress, isTouched, handleDeleteItem }) => {
  const containerStyle = [
    styles.container,
    isTouched ? styles.touchedContainer : null,
  ];
  const titleStyle = [
    styles.title,
    isTouched ? styles.touchedTitle : null,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={1}
    >
      <View style={containerStyle}>
        <Text style={titleStyle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.createDate}>{item.createDate}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <TouchableOpacity onPress={() => handleDeleteItem(item)} style={{ position: 'absolute', right:2, bottom: 5, padding: 10 }}>
          <Text style={styles.action}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const BasicFlatList = () => {
  const navigation = useNavigation();
  const [noteData, setNoteData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('fdata');
        const data = jsonValue != null ? JSON.parse(jsonValue) : [];
        setNoteData(data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  const handleDeleteItem = async (item) => {
    const updatedNoteData = noteData.filter((noteItem) => noteItem.id !== item.id);
    setNoteData(updatedNoteData);
    
    try {
      await AsyncStorage.setItem('fdata', JSON.stringify(updatedNoteData));
      console.log('Data deleted successfully');
    } catch (e) {
      console.log(e);
    }
  };

  const handleItemPress = (item) => {
    navigation.navigate('DetailNote', { item });
  };

  const handleItemLongPress = (item) => {
    // Cập nhật trạng thái "isTouched" của mục khi long press
    const updatedNoteData = noteData.map((noteItem) => {
      if (noteItem.id === item.id) {
        return { ...noteItem, isTouched: true };
      }
      return noteItem;
    });
    setNoteData(updatedNoteData);
  };

  return (
    <View style={{ flex: 1, padding: 8, marginBottom: 60 }}>
      {noteData.length > 0 ? (
        <FlatList
          data={noteData}
          renderItem={({ item }) => (
            <FlatListItem
              item={item}
              onPress={() => handleItemPress(item)}
              onLongPress={() => handleItemLongPress(item)}
              isTouched={item.isTouched || false} // Sử dụng trạng thái "isTouched" của mục
              handleDeleteItem={handleDeleteItem} // Truyền handleDeleteItem vào FlatListItem
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.emptyText}>Không có dữ liệu</Text>
      )}
    </View>
  );
};

export default BasicFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    height: windowHeight * 1 / 5
  },
  touchedContainer: {
    backgroundColor: '#D3D3D3',
  },
  title: {
    color: 'black',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    height: '30%'
  },
  touchedTitle: {
    color: 'black',
  },
  createDate: {
    height: 20,
    top: 50,
    right: windowWidth * 0.035,
    position: 'absolute',
    color: 'black',
  },
  description: {
    padding: 10,
    height: '50%',
    overflow: 'hidden',
    color: 'black',
    top: 30,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  action : {
    fontWeight: 'bold', 
    fontSize: 18,
    color: 'black'
  }
});