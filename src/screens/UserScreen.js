import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Touchable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const UserScreen = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  // Sample image data
  const imageData = [
    require('../../assets/images/hotels/granada-1.jpeg'),
    require('../../assets/images/hotels/phuket-1.jpg'),
    require('../../assets/images/hotels/polynesia-1.jpeg'),
    require('../../assets/images/hotels/granada-2.jpeg'),
    require('../../assets/images/hotels/phuket-2.jpeg'),
    require('../../assets/images/hotels/polynesia-2.jpeg'),
    require('../../assets/images/hotels/ac-1.jpeg'),
    require('../../assets/images/hotels/cb-2.jpeg'),
    require('../../assets/images/hotels/capri-2.jpeg'),
    require('../../assets/images/hotels/granada-1.jpeg'),
    require('../../assets/images/hotels/phuket-1.jpg'),
    require('../../assets/images/hotels/polynesia-1.jpeg'),
    require('../../assets/images/hotels/granada-2.jpeg'),
    require('../../assets/images/hotels/phuket-2.jpeg'),
    require('../../assets/images/hotels/polynesia-2.jpeg'),
    require('../../assets/images/hotels/ac-1.jpeg'),
    require('../../assets/images/hotels/cb-2.jpeg'),
    require('../../assets/images/hotels/capri-2.jpeg'),
    // Add more images here
  ];

  const renderGalleryItem = ({ item }) => (
    <Image source={item} style={styles.gridImage} />
   
  );

  return (
    <View style={styles.container}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={require('../../assets/images/users/32.jpeg')} style={styles.profilePic} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>Katrina Dhiwar</Text>
          <TouchableOpacity
            style={[styles.followButton, { backgroundColor: isFollowing ? '#FF0000' : '#4CAF50' }]}
            onPress={handleFollowToggle}>
            <Text style={styles.followButtonText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.bioSection}>
        <Text style={styles.bioText}>
          HouseWife 😊{'\n'}
          Happily Married to Prabhat Kumar Dhiwar ❤️{'\n'}
          My Husband is my world 💕💕💕
        </Text>
      </View>

      {/* Gallery Section */}
      <FlatList
        data={imageData}
        renderItem={renderGalleryItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  appBar: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    height: '15%',
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  followButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  followButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  bioSection: {
    paddingHorizontal: 15,
    marginBottom: 10
  },
  bioText: {
    fontSize: 16,
    marginTop: 5,
  },
  gridContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  gridImage: {
    width: '32%',
    aspectRatio: 1, // Aspect ratio 1:1 for square images
    margin: '0.5%',
    borderRadius: 10,
  },
});

export default UserScreen;
