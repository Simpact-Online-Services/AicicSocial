// import { Button, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../App';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Swiper from 'react-native-swiper';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

// const HomeScreen = () => {
//   const { authState, authDispatch } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);
//   const navigation = useNavigation();
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const authToken = 'P7MjGt0beyo1gKO9rKXaB043DBVrD8lGWbHOQxHbf94b712c';
//       const headers = {
//         Authorization: `Bearer ${authToken}`,
//       };

//       // Make a GET request to fetch the user's profile first
//       const profileResponse = await axios.get('https://socialmedia.mlmcreatorsindia.com/api/profiles', {
//         headers: headers,
//       });

//       // Check if the response is successful
//       if (profileResponse.status === 200) {
//         const profile = profileResponse.data.profile;

//         // Check if the profile is private or public
//         if (profile.privacy === 'private') {
//           // If private, make a request to fetch posts using the user's ID
//           const postsResponse = await axios.get(`https://socialmedia.mlmcreatorsindia.com/api/posts/${profile.user_id}`, {
//             headers: headers,
//           });

//           // Check if the response is successful
//           if (postsResponse.status === 200) {
//             // Update the state with the received posts data
//             setPosts(postsResponse.data.posts.map(post => ({
//               ...post,
//               media: JSON.parse(post.media) // Parse the JSON string to an array
//             })));
//           } else {
//             console.error('Error fetching posts:', postsResponse.data.message);
//           }
//         } else {
//           // If public, directly fetch posts
//           const postsResponse = await axios.get('https://socialmedia.mlmcreatorsindia.com/api/posts', {
//             headers: headers,
//           });

//           // Check if the response is successful
//           if (postsResponse.status === 200) {
//             // Update the state with the received posts data
//             setPosts(postsResponse.data.posts.map(post => ({
//               ...post,
//               media: JSON.parse(post.media) // Parse the JSON string to an array
//             })));
//           } else {
//             console.error('Error fetching posts:', postsResponse.data.message);
//           }
//         }
//       } else {
//         console.error('Error fetching profile:', profileResponse.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleLikePress = async (postId) => {
//     try {
//       const authToken = 'P7MjGt0beyo1gKO9rKXaB043DBVrD8lGWbHOQxHbf94b712c';
//       const headers = {
//         Authorization: `Bearer ${authToken}`,
//       };

//       const response = await axios.post('https://socialmedia.mlmcreatorsindia.com/api/likes', { post_id: postId }, { headers });
//       if (response.status === 201) { // Ensure it's 201 for successful creation
//         // Show a toast or update the UI to indicate that the post was liked successfully
//         console.log('Post liked successfully');
//       } else {
//         console.error('Error liking post:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error liking post:', error);
//     }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await fetchData();
//     setRefreshing(false);
//   };

//   const handleItemClick = (item) => {
//     navigation.navigate("PostDetails", { item });
//   };

//   const renderPost = ({ item, index }) => (
//     <View style={styles.card}>
//       <TouchableOpacity onPress={() => navigation.navigate('UserScreen', { item })}>
//         <View style={styles.userInfo}>
//           <Image source={{ uri: `https://socialmedia.mlmcreatorsindia.com/media_images/${item.media[0]}`}} style={styles.avatar} />
//           <Text style={styles.username}>{item.name}</Text>
//         </View>
//       </TouchableOpacity>
//       <Text style={styles.content}>{item.content}</Text>
//       <TouchableOpacity onPress={() => handleItemClick(item)}>
//         <Swiper
//           style={styles.swiperContainer}
//           showsButtons={true}
//           activeDotColor="#5843F6"
//           dotStyle={styles.dot}
//           activeDotStyle={styles.activeDot}
//           loop={false}
//         >
//           {item.media.map((image, index) => (
//             <View style={styles.imageContainer} key={index}>
//               <Image
//                 source={{ uri: `https://socialmedia.mlmcreatorsindia.com/media_images/${image}`}}
//                 style={styles.postImage}
//                 resizeMode="cover"
//                 onError={(error) => console.log('Error loading image', error)}
//               />
//             </View>
//           ))}
//         </Swiper>
//       </TouchableOpacity>
//       <View style={styles.interactionButtons}>
//         <TouchableOpacity style={styles.button} onPress={() => handleLikePress(item.id)}>
//           {item.is_like === 1 ? <Icon name={"thumbs-up"} size={24} color={'#0047ab'} /> : <Icon name={"thumbs-up-outline"} size={24} color={'black'} />}
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => {
//           setModalVisible(true);
//           setPostId(item.id); // Set the post ID for which comments are being viewed
//         }}>
//           <Icon name="chatbox-outline" size={24} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Icon name="share-outline" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={{ flex: 1 }}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}> Aicic Network </Text>
//           <View style={styles.headerIcons}>
//             <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { navigation.navigate('SearchScreen') }}>
//               <Icon name="search" size={24} color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity style={{ marginRight: 10, marginBottom: 10 }} onPress={() => { navigation.navigate('ChatScreen') }}>
//               <Icon name="chatbox" size={24} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <FlatList
//           data={posts}
//           renderItem={renderPost}
//           keyExtractor={(item) => item.id.toString()}
//           style={styles.feed}
//           refreshing={refreshing}
//           onRefresh={handleRefresh}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     marginTop: 0,
//   },
//   postImage: {
//     width: '100%',
//     height: 200,
//     marginTop: 10,
//     borderRadius: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingTop: 12,
//     backgroundColor: '#5843F6',
//   },
//   headerText: {
//     fontSize: 20,
//     color: '#fff',
//     fontWeight: 'bold',
//     backgroundColor: '#5843F6',
//     borderRadius: 20,
//     padding: 5,
//     marginBottom: 12
//   },
//   headerIcons: {
//     flexDirection: 'row',
//   },
//   feed: {
//     flex: 1,
//     marginTop: 20,
//   },
//   card: {
//     backgroundColor: '#ded8f0',
//     marginHorizontal: 10,
//     marginBottom: 20,
//     borderRadius: 10,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   username: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#000',
//   },
//   interactionButtons: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   button: {
//     marginRight: 20,
//   },
//   swiperContainer: {
//     height: 200, // Adjust the height of the swiper container as needed
//     marginBottom: 10,
//   },
//   dot: {
//     backgroundColor: 'rgba(0,0,0,.2)',
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginHorizontal: 3,
//     marginBottom: 15, // Adjust the margin as needed
//   },
//   activeDot: {
//     backgroundColor: '#5843F6',
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginHorizontal: 3,
//     marginBottom: 15, // Adjust the margin as needed
//   },
//   content: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#000',
//   },
// });

// export default HomeScreen;

import { Button, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const authToken = 'P7MjGt0beyo1gKO9rKXaB043DBVrD8lGWbHOQxHbf94b712c';
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
  
      // Make a GET request to fetch the user's profile first
      const profileResponse = await axios.get('https://socialmedia.mlmcreatorsindia.com/api/profile', {
        headers: headers,
      });
  
      // Check if the response is successful
      if (profileResponse.status === 200) {
        const profile = profileResponse.data.profile;
  
        // Check if the profile is private or public
        if (profile.privacy === 'private') {
          // If private, make a request to fetch posts using the user's ID
          const postsResponse = await axios.get(`https://socialmedia.mlmcreatorsindia.com/api/posts/${profile.user_id}`, {
            headers: headers,
          });
  
          // Check if the response is successful
          if (postsResponse.status === 200) {
            // Update the state with the received posts data
            setPosts(postsResponse.data.posts.map(post => ({
              ...post,
              media: JSON.parse(post.media) // Parse the JSON string to an array
            })));
          } else {
            console.error('Error fetching posts:', postsResponse.data.message);
          }
        } else {
          // If public, directly fetch posts
          const postsResponse = await axios.get('https://socialmedia.mlmcreatorsindia.com/api/posts', {
            headers: headers,
          });
  
          // Check if the response is successful
          if (postsResponse.status === 200) {
            // Update the state with the received posts data
            setPosts(postsResponse.data.posts.map(post => ({
              ...post,
              media: JSON.parse(post.media) // Parse the JSON string to an array
            })));
          } else {
            console.error('Error fetching posts:', postsResponse.data.message);
          }
        }
      } else {
        console.error('Error fetching profile:', profileResponse.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  const handleLikePress = async (postId) => {
    try {
      const authToken = 'P7MjGt0beyo1gKO9rKXaB043DBVrD8lGWbHOQxHbf94b712c';
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };

      const response = await axios.post('https://socialmedia.mlmcreatorsindia.com/api/likes', { post_id: postId }, { headers });
      if (response.status === 201) { // Ensure it's 201 for successful creation
        // Show a toast or update the UI to indicate that the post was liked successfully
        console.log('Post liked successfully');
      } else {
        console.error('Error liking post:', response.data.message);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }

  const handleItemClick = (item) => {
    navigation.navigate("PostDetails", { item });
  };

    const renderPost = ({ item, index }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('UserScreen', { item })}>
        <View style={styles.userInfo}>
          <Image source={{ uri: `https://socialmedia.mlmcreatorsindia.com/media_images/${item.media[0]}`}} style={styles.avatar} />
          <Text style={styles.username}>{item.name}</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.content}>{item.content}</Text>
      <TouchableOpacity onPress={() => handleItemClick(item)}>
        <Swiper
          style={styles.swiperContainer}
          showsButtons={true}
          activeDotColor="#5843F6"
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          loop={false}
        >
          {item.media.map((image, index) => (
            <View style={styles.imageContainer} key={index}>
              <Image
                source={{ uri: `https://socialmedia.mlmcreatorsindia.com/media_images/${image}`}}
                style={styles.postImage}
                resizeMode="cover"
                onError={(error) => console.log('Error loading image', error)}
              />
            </View>
          ))}
        </Swiper>
      </TouchableOpacity>
      <View style={styles.interactionButtons}>
        <TouchableOpacity style={styles.button} onPress={() => handleLikePress(item.id)}>
          {item.is_like == 1 ? <Icon name={"thumbs-up"} size={24} color={'#0047ab'} /> : <Icon name={"thumbs-up-outline"} size={24} color={'black'} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          setModalVisible(true);
          setPostId(item.id); // Set the post ID for which comments are being viewed
        }}>
          <Icon name="chatbox-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="share-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}> Aicic Network </Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { navigation.navigate('SearchScreen') }}>
              <Icon name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 10, marginBottom: 10 }} onPress={() => { navigation.navigate('ChatScreen') }}>
              <Icon name="chatbox" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          style={styles.feed}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 12,
    backgroundColor: '#5843F6',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#5843F6',
    borderRadius: 20,
    padding: 5,
    marginBottom: 12
  },
  headerIcons: {
    flexDirection: 'row',
  },
  feed: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ded8f0',
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  interactionButtons: {
        flexDirection: 'row',
        marginTop: 10,
      },
      button: {
        marginRight: 20,
      },
      swiperContainer: {
        height: 200, // Adjust the height of the swiper container as needed
        marginBottom: 10,
      },
      dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
        marginBottom: 15, // Adjust the margin as needed
      },
      activeDot: {
        backgroundColor: '#5843F6',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
        marginBottom: 15, // Adjust the margin as needed
      },
  content: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default HomeScreen;
