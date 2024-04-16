import { ActivityIndicator, Alert, Dimensions, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../App';
import Icon from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = () => {
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [mobile, setMobile] = useState("");
    //const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [otp, setOtp] = useState("");
    // const [fullname, setFullname] = useState("");
    const [name, setName] = useState("");
    //const [name, setName] = useState("");

   // const { state, dispatch } = useContext(AuthContext);

    // const baseUrl = 'https://guflu.in/Social_media/smedia_api.php';
    const baseUrl = 'https://socialmedia.mlmcreatorsindia.com/api/register';

    // const handleSignup = async () => {
    //     setLoading(true);
    //     try {

    //         const response = await axios.post(baseUrl, {
    //             name: name,
    //             // mobile: mobile,
    //             email: email,
    //             password: password,
    //             password_confirmation: confirmPassword
    //             // otp: otp
    //         });
    //         console.log("Response Status: ", response.status);

    //         if (response.status === 200) {
    //             setLoading(false);
    //             console.log(" Signup Response Data: ", response.data);

    //             if (response.data.result == 1) {
    //                 console.log("Signup Success");
    //                 //dispatch({ type: "LOGIN", payload: response.data });
    //                 navigation.navigate("LoginScreen");
    //             } else if (response.data.result == 2) {
    //                 Alert.alert("Already Registered", response.data.message);
    //             }
    //             else {
    //                 Alert.alert("Unable to Signup");
    //             }
    //         } else {
    //             setLoading(false);
    //             Alert.alert("Unable to Signup");
    //         }
    //     } catch (error) {
    //         console.log("Error: ", error);
    //         setLoading(false);
    //     }
    // }
    // const handleSignup = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.post(baseUrl, {
    //             name: name,
    //             email: email,
    //             password: password,
    //              password_confirmation: password // Assuming your API requires password_confirmation field
    //         });
    //         console.log("Response Status: ", response);
    
    //         if (response.status === 201) {
    //             setLoading(false);
    //             console.log("Signup Response Data: ", response.data);
    
    //             const responseData = response.data;
    
    //             if (responseData.status === "success") {
    //                 console.log("Signup Success");
    //                 const { token, user } = responseData.data;
    
    //                 // Now you can handle the token and user data as needed
    //                 console.log("Token: ", token);
    //                 console.log("User Data: ", user);
    
    //                 // Assuming you want to navigate to the login screen after signup
    //                 navigation.navigate("LoginScreen");
    
    //                 // Optionally, you may want to show a success message
    //                 Alert.alert("Signup Successful", responseData.message);
    //             } else {
    //                 // If signup fails, show the error message
    //                 Alert.alert("Unable to Signup", responseData.message);
    //             }
    //         } else {
    //             setLoading(false);
    //             Alert.alert("Unable to Signup");
    //         }
    //     } catch (error) {
    //         console.log("Error: ", error);
    //         setLoading(false);
    //         // Optionally, you may want to show an error message if the request fails
    //         Alert.alert("Error", "Failed to signup. Please try again later.");
    //     }
    // }
    const handleSignup = async () => {
        setLoading(true);
        try {
            const response = await axios.post(baseUrl, {
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword // Assuming your API requires password_confirmation field
            });

            if (response.status === 200) {
                setLoading(false);
                console.log("Signup Response Data: ", response.data);
                const responseData = response.data.response;
                console.log("Signup Response status: ", responseData.status);

                if (responseData.status === "success") {
                    navigation.navigate("LoginScreen");
                    Alert.alert("Signup Successful", responseData.message);
                } else {
                    Alert.alert("Unable to Signup", responseData.message);
                }
            } else {
                setLoading(false);
                Alert.alert("Unable to Signup");
            }
        } catch (error) {
            console.log("Error: ", error);
            setLoading(false);
            Alert.alert("Error", "Failed to signup. Please try again later.");
        }
    }
    
    
    //working code of otp
    // const getOtp = async () => {
    //     try {
    //         const response = await axios.post(baseUrl, {
    //             route: "send_otp",
    //             mobile: mobile,
    //         });
    //         console.log("RESPONSE STATUS ", response.status);
    //         if (response.status === 200) {
    //             console.log(response.data);
    //             const data = response.data;
    //             if (data.result == 1) {
    //                 Alert.alert("OTP sent successfully...");
    //                 setOtp(data.get_otp);
    //             } else if (data.result === 2) {
    //                 Alert.alert("Mobile no already registered...");
    //             } else {
    //                 Alert.alert("Something went wrong...");
    //             }
    //         } else {
    //             setLoading(false);
    //             throw new Error("An error has occurred");
    //         }
    //     } catch (error) { }
    // };

    onLoginPress = () => {
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            {!loading ? (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={styles.container}
                >
                    <StatusBar barStyle='dark-content' />
                    <View style={styles.formContainer}>
                        

                        <View style={styles.inputContainer}>
    <Text>Full Name</Text>
    <TextInput
        autoCapitalize="words"
        autoCorrect={false}
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Enter your full name"
        placeholderTextColor="#7F27FF"
    />
</View>
<View style={styles.inputContainer}>
                            <Text>Email</Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                                placeholder="Enter your email"
                                placeholderTextColor="#7F27FF"
                            />
                        </View>
                        
                        
                        {/* <View style={styles.inputContainer}>
                            <Text>Mobile</Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                style={styles.input}
                                onChangeText={(text) => setMobile(text)}
                                value={mobile}
                                placeholder="Enter your mobile number"
                                placeholderTextColor="#7F27FF"
                            />
                        </View> */}
                        <View style={styles.inputContainer}>
                                <Text style={{ color: "#000", marginBottom: 10 }}>Password </Text>

                                <View
                                    style={

                                        {
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            borderColor: "#7F27FF",
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            padding: 5,
                                            marginBottom: 10

                                        }
                                    }
                                >
                                    <TextInput
                                        placeholder="Password"
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={(e) => setPassword(e)}
                                        value={password}
                                        selectionColor="#7F27FF"
                                        secureTextEntry={!isPasswordVisible}
                                        placeholderTextColor="#7F27FF"
                                        style={{ color: "black", flex: 1 }}
                                    ></TextInput>
                                    <TouchableOpacity
                                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                    >
                                        <Icon
                                            name={
                                                isPasswordVisible ? "eye" : "eye-with-line"}
                                            color='#7F27FF'
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                    <Text>Confirm Password</Text>
                    <TextInput
                        placeholder="Confirm Password"
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(e) => setConfirmPassword(e)}
                        value={confirmPassword}
                        selectionColor="#7F27FF"
                        secureTextEntry={!isPasswordVisible}
                        placeholderTextColor="#7F27FF"
                        style={styles.input}
                    />
                </View>
            {/* confirm password */}
         {/*    <View style={styles.inputContainer}>
                                <Text style={{ color: "#000", marginBottom: 10 }}>Confirm Password </Text>

                                <View
                                    style={

                                        {
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            borderColor: "#7F27FF",
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            padding: 5,
                                            marginBottom: 10

                                        }
                                    }
                                >
                                    <TextInput
                                        placeholder="Password"
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={(e) => setConfirmPassword(e)}
                                        value={password}
                                        selectionColor="#7F27FF"
                                        secureTextEntry={!isConfirmPasswordVisible}
                                        placeholderTextColor="#7F27FF"
                                        style={{ color: "black", flex: 1 }}
                                    ></TextInput>
                                    <TouchableOpacity
                                        onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                    >
                                        <Icon
                                            name={
                                                isPasswordVisible ? "eye" : "eye-with-line"}
                                            color='#7F27FF'
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>*/}
                        {/* </View>  */}
                        <Button
                            title="Signup"
                            onPress={handleSignup}
                            style={styles.signupButton}
                            textStyle={styles.signupButtonText}
                            color="#7F27FF"
                        />
                        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                            <Text style={styles.loginText}>Already have an account? Login</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#8706d1" />
                    <Text style={styles.loadingText}>Signing up...</Text>
                </View>
            )}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5D4FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: width / 1.2,
        backgroundColor: '#E5D4FF',
        borderRadius: 10,
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    loadingText: {
        marginTop: 20,
        color: '#7F27FF',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#7F27FF',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        color: '#000',
    },
    signupButton: {
        marginTop: 20,
        backgroundColor: '#7F27FF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    signupButtonText: {
        color: 'white',
        fontSize: 16,
    },
    loginText: {
        marginTop: 20,
        color: '#7F27FF',
        fontSize: 16,
    }
});

export default SignUp;