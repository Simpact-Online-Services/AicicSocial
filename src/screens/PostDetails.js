import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PostDetails = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;

  return (
      <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    <View style={styles.container}>
      <Image
        source={{ uri: `https://guflu.in/Social_media/upload/${item.image_url}` }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'left',
    // justifyContent: 'space-between',
    // paddingHorizontal: 20,
    // paddingTop: 20,
    marginTop:10,
    marginLeft:5
  },
  image: {
    width: Dimensions.get('window').width, // Use window width for full width
    height: Dimensions.get('window').height, // Use window height for full height
  },
});

export default PostDetails;
