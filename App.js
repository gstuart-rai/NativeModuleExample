/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  NativeModules
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

// import BiometricModule from './MockModule';

const { ReactNativeBiometrics } = NativeModules
const BiometricModule = ReactNativeBiometrics

// const { ReactNativeBiometrics } = NativeModules
// const BiometricModule = ReactNativeBiometrics

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      biometricStatus: "unsupported",
      hasBiometricSupport: false,
      scanResult: "",
      hasScan: false
    }
  }

  componentDidMount() {
    this.detectBiometric()
  }

  detectBiometric = () => {
    BiometricModule.isSensorAvailable().then((resolvedValue) => {
      this.setState({
        biometricStatus: resolvedValue,
        hasBiometricSupport: true
      })
    }, (error) => {
      this.setState({
        biometricStatus: "unsupported",
        hasBiometricSupport: false
      })
    })
  }

  requestBiometricVerification = () => {
    BiometricModule.simplePrompt("Please scan your Fingerprint or Face").then((resolvedValue) => {
      this.setState({
        scanResult: this.state.biometricStatus + " Success",
        hasScan: true
      })
    }, (error) => {
      this.setState({
        scanResult: this.state.biometricStatus + " Failure",
        hasScan: true
      })
    })
  }

  renderScanResults = () => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Scan Results</Text>
        {!this.state.hasScan ? (
          <Text style={styles.sectionDescription}>
            Biometric scan not performed yet
          </Text>
        ) : (
          <Text style={styles.sectionDescription}>
            User scan result: 
            <Text style={styles.highlight}> {this.state.scanResult}</Text>
          </Text>
        )}
      </View>
    )

  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Native Modules</Text>
                <Text style={styles.sectionDescription}>
                  Allow you to perform operations in native code.  Modules are accessible using standard ES6 async patterns
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Biometric example</Text>
                <Text style={styles.sectionDescription}>
                  Access native TouchID/FaceID/Fingerprint features.
              </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Test</Text>
                <Text style={styles.sectionDescription}>
                  Device biometric status:
                  {this.state.hasBiometricSupport ? (
                    <Text style={[styles.highlight, styles.positive]}> {this.state.biometricStatus}</Text>
                  ) : (
                      <Text style={[styles.highlight, styles.negative]}> {this.state.biometricStatus}</Text>
                    )}
                </Text>
                {this.state.hasBiometricSupport ? (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.requestBiometricVerification}>
                      <Text style={styles.sectionDescription}>Tap to request biometric verification</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              {this.state.hasBiometricSupport ? this.renderScanResults() : null}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  positive: {
    color: 'green'
  },
  negative: {
    color: 'red'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: 'lightgrey'
  }
});

export default App;
