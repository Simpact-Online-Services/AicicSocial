import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const baseUrl = "https://guflu.in/Social_media/smedia_api.php";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otp, setOtp] = useState("");

  const getOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(baseUrl, {
        route: "forgot_password",
        mobile: mobile,
      });

      console.log("RESPONSE STATUS ", response.status);

      if (response.status === 200) {
        console.log("Your OTP -", response.data.otp);
        setLoading(false);
        setOtp(response.data.otp);
        setOtpModalVisible(true);
      } else {
        setLoading(false);
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log("ERROR ", error);
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post(baseUrl, {
        route: "after_forgot_password",
        mobile: mobile,
        otp: otp,
      });

      console.log("RESPONSE STATUS ", response.status);

      if (response.status === 200) {
        console.log("Your OTP -", response.data);
        setLoading(false);
        navigation.navigate("ResetPassword", { mobile });
      } else {
        setLoading(false);
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log("ERROR ", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!loading ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <View style={{ backgroundColor: "#7F27FF", flex: 1 }}>
            <View style={{ height: height / 7, justifyContent: "center" }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#FFF",
                }}
              >
                Forgot Password
              </Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 20 }}
              >
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                  <View style={{ paddingBottom: 20 }}>
                    <TextInput
                      placeholder="Phone Number"
                      value={mobile}
                      onChangeText={setMobile}
                      keyboardType="numeric"
                      style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 10,
                        marginBottom: 15,
                      }}
                    />
                  </View>

                  <View style={{ paddingTop: 40 }}>
                    <TouchableOpacity
                      onPress={getOTP}
                      style={{
                        backgroundColor: "#8706d1",
                        padding: 15,
                        borderRadius: 5,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 16 }}>
                        Get OTP
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ paddingTop: 20 }}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={{
                        backgroundColor: "#b30000",
                        padding: 15,
                        borderRadius: 5,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 16 }}>
                        Cancel
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
            flexDirection: "column",
            padding: 10,
          }}
        >
          <ActivityIndicator size="large" color="#8706d1" />
          <Text style={{ textAlign: "center", padding: 20 }}>
            Logging in...
          </Text>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={otpModalVisible}
        onRequestClose={() => {
          setOtpModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: width - 40,
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Enter OTP
            </Text>
            <TextInput
              placeholder="OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                marginBottom: 15,
              }}
            />
            <TouchableOpacity
              onPress={verifyOTP}
              style={{
                backgroundColor: "#8706d1",
                padding: 15,
                borderRadius: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
//     Pressable,
//     Modal,
//     Button,
//     StyleSheet,
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
// import ResetPassword from "./ResetPassword";

// // import baseUrl from "../constants/url";

// const width = Dimensions.get("screen").width;
// const height = Dimensions.get("screen").height;

// const baseUrl = "https://guflu.in/gulfu_api/apifunctions.php";

// export default function ForgotPassword() {
//     const navigation = useNavigation();
//     const [mobile, setMobile] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [otpModalVisible, setOtpModalVisible] = useState(false);
//     const [otp, setOtp] = useState('');

//     const getOTP = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.post(baseUrl, {
//                 route: 'forgot_password',
//                 mobile: mobile,
//             });

//             console.log('RESPONSE STATUS ', response.status);


//             if (response.status === 200) {
//                 console.log('Your OTP -', response.data.otp);
//                 setLoading(false);
//                 setOtp(response.data.otp)
//                 setOtpModalVisible(true);
//                 //navigation.navigate('ResetPassword')
               

//             } else {
//                 setLoading(false);
//                 throw new Error('An error has occurred');
//             }
//         } catch (error) {
//             console.log('ERROR ', error);
//             setLoading(false);
//         }
//     };
//     const verifyOTP = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.post(baseUrl, {
//                 route: 'after_forgot_password',
//                 mobile: mobile,
//                 otp: otp
//             });

//             console.log('RESPONSE STATUS ', response.status);


//             if (response.status === 200) {
//                 console.log('Your OTP -', response.data);
//                 setLoading(false);
//                 navigation.navigate('ResetPassword',{mobile})
               

//             } else {
//                 setLoading(false);
//                 throw new Error('An error has occurred');
//             }
//         } catch (error) {
//             console.log('ERROR ', error);
//             setLoading(false);
//         }
//     };



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
//                                 Forgot Password
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
//                                             placeholder="Phone Number"
//                                             value={mobile}
//                                             onChangeText={setMobile}
//                                             keyboardType="numeric"
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

//                                     <View style={{ paddingTop: 40 }}>
//                                         <TouchableOpacity
//                                             onPress={getOTP}
//                                             style={style.btn}
//                                         >
//                                             <Text style={style.btntxt}>Get OTP</Text>
//                                         </TouchableOpacity>
//                                     </View>

//                                     <View style={{ paddingTop: 20 }}>
//                                         <TouchableOpacity
//                                             onPress={() => navigation.goBack()}
//                                             style={[style.btn, { backgroundColor: '#b30000' }]}
//                                         >
//                                             <Text style={style.btntxt}>Cancel</Text>
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
//              <Modal
//         animationType="slide"
//         transparent={true}
//         visible={otpModalVisible}
//         onRequestClose={() => {
//           setOtpModalVisible(false);
//         }}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Enter OTP</Text>
//             <TextInput
//               placeholder="OTP"
//               value={otp}
//               onChangeText={setOtp}
//               keyboardType="numeric"
//               style={styles.modalInput}
//             />
//             <TouchableOpacity onPress={verifyOTP} style={style.btn}>
//               <Text style={styles.modalBtnText}>Verify OTP</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//         </SafeAreaView>
//     );
// }const styles = {
//     // Your existing styles here
  
//     modalContainer: {
//       flex: 1,
//       backgroundColor: 'rgba(0, 0, 0, 0.9)',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     modalContent: {
//       width: width - 40,
//       backgroundColor: '#fff',
//       padding: 20,
//       borderRadius: 10,
//     },
//     modalTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       marginBottom: 10,
//     },
//     modalInput: {
//       borderWidth: 1,
//       borderColor: '#ccc',
//       padding: 10,
//       marginBottom: 15,
//     },
//     modalBtn: {
//       backgroundColor: '#8706d1',
//       padding: 15,
//       borderRadius: 5,
//       alignItems: 'center',
//     },
//     modalBtnText: {
//       color: '#fff',
//       fontSize: 16,
//     },
//   };
