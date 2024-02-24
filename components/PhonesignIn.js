import { View, Text , Button } from 'react-native'

import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
const PhonesignIn = () => {
    const [confirm, setConfirm] = useState(null);
    
    async function signInWithPhoneNumber(phoneNumber) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
      }
  return (
    <View>
        <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
      />
    </View>
  )
}

export default PhonesignIn