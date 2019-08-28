import {
    Alert
  } from 'react-native';

  export default class MockModule {
    static isSensorAvailable = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Mock biometric data retrieved');
                resolve("Mock")
              }, 1000)    
        })
    }

    static simplePrompt = (promptMessage) => {
        return new Promise((resolve, reject) => {
            Alert.alert(
                'Mock Module',
                'Test Mock result of successful/failed Biometric scan by the user',
                [
                    {
                      text: 'Failure',
                      onPress: () =>  {
                          console.log('Failure Pressed')
                          reject(false)
                      },
                      style: 'cancel'
                    },
                    {
                        text: 'Success', 
                        onPress: () => {
                            console.log('OK Pressed')
                            resolve(true)
                        }
                    }
                ],
                  {cancelable: false},
            )    
        })
    }
}