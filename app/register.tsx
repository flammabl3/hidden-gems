import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native';

export default function Register(){
    const router = useRouter();
  
    return (
      <View>
        <Text >This is the register  page</Text>
        

        <Image source={require('../image/hidden-gems.png')} style={{ width: 200, height: 200 }} />
      </View>
    );
  }