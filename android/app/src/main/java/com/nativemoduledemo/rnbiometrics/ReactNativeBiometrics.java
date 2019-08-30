package com.nativemoduledemo.rnbiometrics;

import android.app.Activity;
import android.app.KeyguardManager;
import android.content.Context;
import android.hardware.fingerprint.FingerprintManager;
import android.os.Build;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


/**
 * Created by brandon on 4/5/18.
 */

public class ReactNativeBiometrics extends ReactContextBaseJavaModule {

    protected String biometricKeyAlias = "biometric_key";

    public ReactNativeBiometrics(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ReactNativeBiometrics";
    }

    @ReactMethod
    public void isSensorAvailable(Promise promise) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                ReactApplicationContext reactApplicationContext = getReactApplicationContext();
                FingerprintManager fingerprintManager = reactApplicationContext.getSystemService(FingerprintManager.class);
                Boolean isHardwareDetected = fingerprintManager.isHardwareDetected();
                Boolean hasFingerprints = fingerprintManager.hasEnrolledFingerprints();

                KeyguardManager keyguardManager = (KeyguardManager) reactApplicationContext.getSystemService(Context.KEYGUARD_SERVICE);
                Boolean hasProtectedLockscreen = keyguardManager.isKeyguardSecure();

                if (isHardwareDetected && hasFingerprints && hasProtectedLockscreen) {
                    promise.resolve("Android Fingerprint");
                } else {
                    promise.reject("Finger print not configured", "Hardware available but no fingerprint found");
                }
            } else {
                promise.resolve(null);
            }
        } catch (Exception e) {
            promise.reject("Error detecting fingerprint availability: " + e.getMessage(), "Error detecting fingerprint availability");
        }
    }

    @ReactMethod
    public void simplePrompt(String title, Promise promise) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                ReactNativeBiometricsDialog dialog = new ReactNativeBiometricsDialog();
                dialog.init(title, null, getSimplePromptCallback(promise));
                Activity activity = getCurrentActivity();
                dialog.show(activity.getFragmentManager(), "fingerprint_dialog");
            } else {
                promise.reject("Cannot display biometric prompt on android versions below 6.0", "Cannot display biometric prompt on android versions below 6.0");
            }
        } catch (Exception e) {
            promise.reject("Error displaying local biometric prompt: " + e.getMessage(), "Error displaying local biometric prompt");
        }
    }

    protected ReactNativeBiometricsCallback getSimplePromptCallback(final Promise promise) {
        return new ReactNativeBiometricsCallback() {
            @Override
            public void onAuthenticated(FingerprintManager.CryptoObject cryptoObject) {
                promise.resolve(true);
            }

            @Override
            public void onCancel() {
                promise.reject("User cancelled fingerprint authorization", "User cancelled fingerprint authorization");
            }

            @Override
            public void onError() {
                promise.reject("Error generating public private keys" , "Error generating public private keys");
            }
        };
    }
}
