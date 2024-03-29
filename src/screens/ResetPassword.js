import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const baseUrl = "https://guflu.in/Social_media/smedia_api.php";

export default function ResetPassword({ route }) {
  const { mobile } = route.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const changePassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
    } else {
      setLoading(true);
      try {
        const response = await axios.post(baseUrl, {
          route: "change_forgot_password",
          mobile: mobile,
          password: password,
        });

        console.log("RESPONSE STATUS ", response.status);
        if (response.status === 200) {
          setLoading(false);
          console.log("Password changed successfully");
          Alert.alert("Password Changed Successfully");
          navigation.navigate("Login");
        } else {
          setLoading(false);
          throw new Error("An error has occurred");
        }
      } catch (error) {
        console.log("ERROR ", error);
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {!loading ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <View style={{ backgroundColor: "#7F27FF",flex: 1 }}>
            <View style={{ height: height / 7, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Change Password
              </Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 20 }}
              >
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                  <View style={{ paddingBottom: 20 }}>
                    <TextInput
                      placeholder="New Password"
                      onChangeText={setPassword}
                      selectionColor="#8706d1"
                      placeholderTextColor="#999999"
                      secureTextEntry={true}
                      style={{
                        borderWidth: 1,
                        borderColor: "#cccccc",
                        padding: 10,
                        marginBottom: 15,
                      }}
                    />
                  </View>
                  <View style={{ paddingBottom: 20 }}>
                    <TextInput
                      placeholder="Confirm New Password"
                      onChangeText={setConfirmPassword}
                      selectionColor="#8706d1"
                      placeholderTextColor="#999999"
                      secureTextEntry={true}
                      style={{
                        borderWidth: 1,
                        borderColor: "#cccccc",
                        padding: 10,
                        marginBottom: 15,
                      }}
                    />
                  </View>
                  <View style={{ paddingTop: 40 }}>
                    <TouchableOpacity
                      onPress={changePassword}
                      style={{
                        backgroundColor: "#7F27FF",
                        padding: 15,
                        borderRadius: 5,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 16 }}>
                        Change Password
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <ActivityIndicator size="large" color="#8706d1" />
          <Text style={{ marginTop: 20, fontSize: 16 }}>
            Changing Password...
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// import {
//     View,
//     Text,
//     TextInput,
//     ScrollView,
//     KeyboardAvoidingView,
//     Image,
//     SafeAreaView,
//     Alert,
//     Dimensions,
//     TouchableOpacity,
//     ActivityIndicator,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import style from "../theme/style";
// import { Colors } from "../theme/color";
// import { useNavigation } from "@react-navigation/native";
// import { AppBar } from "@react-native-material/core";
// import Icon from "react-native-vector-icons/Ionicons";
// import Icons from "react-native-vector-icons/MaterialCommunityIcons";
// import { Avatar } from "react-native-paper";
// import { useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../../App";

// // import baseUrl from "../constants/url";

// const width = Dimensions.get("screen").width;
// const height = Dimensions.get("screen").height;

// const baseUrl = "https://guflu.in/Social_media/smedia_api.php";

// export default function ResetPassword({route}) {
//     const { mobile } = route.params;
//     const [password, setpassword] = useState("")
//     const [password2, setpassword2] = useState("")
//     const [loading, setLoading] = useState(false);
//     const navigation = useNavigation();
//     const changePassword = async () => {
//         if(password !== password2){
//             Alert.alert("Passwords do not match")
//         }else{
//             setLoading(true);
//         try {
//           const response = await axios.post(baseUrl, {
//             route: "change_forgot_password",
//             mobile: mobile,
//             password: password,
//           });
    
//           console.log("RESPONSE STATUS ", response.status);
//           if (response.status === 200) {
//             setLoading(false);
//             console.log("Password changed successfully");
//             Alert.alert("Password Changed Successfully");
//             navigation.navigate("Login");
//             // Handle the OTP sent successfully, you might want to show a message or take additional actions
//           } else {
//             setLoading(false);
//             throw new Error("An error has occurred");
//           }
//         } catch (error) {
//           console.log("ERROR ", error);
//           setLoading(false);
//         }
//         }       
//       };



//     return (
//         <SafeAreaView style={[style.area]}>
//             {!loading ? (
//                 <KeyboardAvoidingView
//                     behavior={Platform.OS === "ios" ? "padding" : null}
//                     style={{ flex: 1 }}
//                 >
//                     <View style={{ backgroundColor: Colors.primary, flex: 1 }}>
//                         <View style={{ height: height / 7, justifyContent: "center" }}>
//                             <Text
//                                 style={[
//                                     style.title,
//                                     { color: Colors.secondary, textAlign: "center" },
//                                 ]}
//                             >
//                                 Change Password
//                             </Text>
//                         </View>
//                         <View
//                             style={{
//                                 flex: 1,
//                                 backgroundColor: Colors.secondary,
//                                 borderTopRightRadius: 50,
//                                 borderTopLeftRadius: 50,
//                             }}
//                         >
//                             <ScrollView
//                                 showsVerticalScrollIndicator={false}
//                                 style={{ marginTop: 20 }}
//                             >
//                                 <View style={{ marginHorizontal: 20, marginTop: 20 }}>
//                                     <View style={{ paddingBottom: 20 }}>
//                                         <TextInput
//                                             placeholder="New Password"
//                                             onChangeText={setpassword}
//                                             selectionColor={Colors.primary}
//                                             placeholderTextColor={Colors.disable}
//                                             style={[
//                                                 style.txtinput,
//                                                 style.r14,
//                                                 {
//                                                     borderColor: Colors.input,
//                                                     backgroundColor: Colors.input,
//                                                 },
//                                             ]}
//                                         />
//                                     </View>      
//                                     <View style={{ paddingBottom: 20 }}>
//                                         <TextInput
//                                             placeholder="Confirm New Password"
//                                             onChangeText={setpassword2}
//                                             selectionColor={Colors.primary}
//                                             placeholderTextColor={Colors.disable}
//                                             style={[
//                                                 style.txtinput,
//                                                 style.r14,
//                                                 {
//                                                     borderColor: Colors.input,
//                                                     backgroundColor: Colors.input,
//                                                 },
//                                             ]}
//                                         />
//                                     </View>      
//                                 <View style={{ paddingTop: 40 }}>
//                                         <TouchableOpacity
//                                             onPress={changePassword}
//                                             style={style.btn}
//                                         >
//                                             <Text style={style.btntxt}>Change Password</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>
//                             </ScrollView>
//                         </View>
//                     </View>
//                 </KeyboardAvoidingView>
//             ) : (
//                 <View
//                     style={{
//                         flex: 1,
//                         justifyContent: "center",
//                         flexDirection: "column",
//                         padding: 10,
//                     }}
//                 >
//                     <ActivityIndicator size="large" color="#8706d1" />
//                     <Text style={{ textAlign: "center", padding: 20 }}>
//                         Logging in...
//                     </Text>
//                 </View>
//             )}
//         </SafeAreaView>
//     );
// }
