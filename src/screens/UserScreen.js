import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserScreen = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <View style={styles.container}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={require('./profilePic.jpg')} style={styles.profilePic} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>JohnDoe</Text>
          <TouchableOpacity style={styles.followButton} onPress={handleFollowToggle}>
            <Text style={styles.followButtonText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.bioSection}>
        <Text style={styles.bioText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra ante ac eros molestie, nec dictum eros aliquet.
        </Text>
      </View>

      {/* Gallery Section */}
      <ScrollView style={styles.gallery}>
        {/* Gallery Images */}
        <Image source={require('./gallery1.jpg')} style={styles.galleryImage} />
        <Image source={require('./gallery2.jpg')} style={styles.galleryImage} />
        <Image source={require('./gallery3.jpg')} style={styles.galleryImage} />
        {/* Add more images here */}
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
    height: '30%',
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
    backgroundColor: '#4CAF50',
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
    paddingHorizontal: 20,
  },
  bioText: {
    fontSize: 16,
    marginTop: 10,
  },
  gallery: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  galleryImage: {
    width: '33%',
    height: 120,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default UserScreen;
