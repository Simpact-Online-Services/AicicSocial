import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://guflu.in/Social_media/smedia_api.php', {
          route: "search",
          query: searchQuery,
        });
        if (response.data.result === 1) {
          setUserData(response.data.data);
        } else {
          setUserData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchQuery !== '') {
      fetchData();
    }
  }, [searchQuery]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.profile_image ? (
        <Image source={{ uri: item.profile_image }} style={styles.userImage} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <Text style={styles.userName}>{item.fullname}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Search Users</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={userData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()} // Ensure key is a string
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#000'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    backgroundColor: '#ccc', // Placeholder color
  },
});

export default SearchScreen;

// import { useNavigation } from '@react-navigation/native';
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';

// const SearchScreen = () => {
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post('https://guflu.in/Social_media/smedia_api.php', {
//           route: "search",
//           query: searchQuery,
//         });
//         if (response.data.length > 0) {
//           setUserData(response.data);
//         } else {
//           setUserData([]);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     if (searchQuery !== '') {
//       fetchData();
//     }
//   }, [searchQuery]);

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       {item.profile_image ? (
//         <Image source={{ uri: item.profile_image }} style={styles.userImage} />
//       ) : (
//         <View style={styles.placeholderImage} />
//       )}
//       <Text style={styles.userName}>{item.fullname}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
//           <Icon name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.title}>Search Users</Text>
//       </View>
//       <TextInput
//         style={styles.input}
//         placeholder="Search..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />
//       <FlatList
//         data={userData}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()} // Ensure key is a string
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     flex: 1,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#000',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     color: '#000'
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   userImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginBottom: 10,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   placeholderImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginBottom: 10,
//     backgroundColor: '#ccc', // Placeholder color
//   },
// });

// export default SearchScreen;
