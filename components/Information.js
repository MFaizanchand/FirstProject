import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react'
import { FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
const Information = ({ navigation }) => {
  const [myData, setmyData] = useState([]);
  const [name, setName] = useState('');
  const [fathername, setFathername] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhoneno] = useState('');
  const [newID, setNewID] = useState("");
  const [uid, setUid] = useState('');
  const [user, setUser] = useState();
  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  function onAuthStateChanged(user) {
    setUser(user);
    console.log('Information :', user?.uid);
    setUid(user?.uid);
    Readdata(user?.uid);

  }

  const generateOTP = () => {
    // let length = 4;
    let otp = Math.floor(1000 + Math.random() * 9000);
    // for (let i = 0; i < length; i++) {
    //   otp += Math.floor(Math.random() * 10)
    // }

    return otp;
  }
  // console.log(generateOTP());

  // setOtp(generateOTP);
  // setIsValid(null);
  const validateOtp = () => {
    if (userInput === otp) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };


  const AddData = async () => {

    database()
      .ref('/users/' + uid)
      .set({
        name: name,
        fathername: fathername,
        email: email,
        gender: gender,
        city: city,
        country: country,
        address: address,
        phone: phone,
        id: newID,
      })
      .then(() => console.log('Data set.'));
  }


  const Readdata = async (userId) => {
    var a = []
    console.log("Readdata.uid", userId)
    database()
      .ref('/users/' + userId)
      .on('value', snapshot => {
        setNewID(snapshot?.val()?.length);
        console.log("Snapshot :", snapshot?.val())
        a.push(snapshot?.val());
        setmyData(a);
      });
  }



  const onLogout = () => {
    auth().signOut()
      .then(response => {
        console.log("UserSignOut!")
      })
      .catch(error => {
        console.log('Error')
      })
  }

  // useEffect(() => {
  //   Readdata()
  // }, [])


  const RenderonFlat = ({ item }) => {
    console.log("item :", item?.name)
    return (
      <TouchableOpacity style={{ margin: 12, borderWidth: 2, padding: 12 }}  >
        <Text style={styles.text} >name : {item?.name}</Text>
        <Text style={styles.text} >Address : {item?.address}</Text>
        <Text style={styles.text} >FatherName : {item?.fathername}</Text>
        <Text style={styles.text} >Gender : {item?.gender}</Text>
        <Text style={styles.text} >City : {item?.city}</Text>
        <Text style={styles.text} >Country : {item?.country}</Text>
        <Text style={styles.text} >Phone No : {item?.phone}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView>
        {
          myData.length === 0 ? (<View><Text>No Data</Text></View>) : (<View>
            <FlatList data={myData}
              renderItem={({ item }) => <RenderonFlat item={item} />}  ></FlatList>
          </View>)
        }
      </KeyboardAvoidingView>


      <Text style={styles.signup}>Your Info</Text>
      <TextInput
        placeholder="Your Name"
        style={styles.inputBox}
        value={name}
        onChangeText={(e) => setName(e)}
      />
      <TextInput
        placeholder="FatherName"
        style={styles.inputBox}
        value={fathername}
        onChangeText={(e) => setFathername(e)}
      />

      <TextInput
        placeholder="Gender"
        style={styles.inputBox}
        value={gender}
        onChangeText={(e) => setGender(e)}
      />

      <TextInput
        placeholder="Your Email"
        style={styles.inputBox}
        value={email}
        onChangeText={(e) => setEmail(e)}
      />

      <TextInput
        placeholder="Address"
        style={styles.inputBox}
        value={address}
        onChangeText={(e) => setAddress(e)}
      />

      <TextInput
        placeholder="City"
        style={styles.inputBox}
        value={city}
        onChangeText={(e) => setCity(e)}
      />

      <TextInput
        placeholder="Country"
        style={styles.inputBox}
        value={country}
        onChangeText={(e) => setCountry(e)}
      />

      <TextInput
        placeholder="Phone no "
        style={styles.inputBox}
        value={phone}
        onChangeText={(e) => setPhoneno(e)}
      />

      <TouchableOpacity style={styles.register} onPress={AddData} >
        <Text style={styles.registerTitle}>Submit</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.register} onPress={onLogout} >
        <Text style={styles.registerTitle}>Logout</Text>
      </TouchableOpacity>

      {/*  <TouchableOpacity style={styles.button}
        onPress={generateOTP}>
        <Text style={styles.buttonText}>
          Generate OTP
        </Text>  </TouchableOpacity>
       
      
       
        <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={userInput}
        onChangeText={setUserInput}
      />  */}
     
     <TouchableOpacity style={styles.button}
        onPress={()=>validateOtp}>
        <Text style={styles.buttonText}>
          Validate OTP
        </Text>
      </TouchableOpacity>
     
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 12,
    borderRadius: 5,
    width: '90%',
    marginTop: 20,
  },
  register: {
    width: '90%',
    backgroundColor: '#FCAF03',
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  registerTitle: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  signup: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 20,
  },
  text: {
    fontSize: 34
  }
})

export default Information