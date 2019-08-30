package com.nativemoduledemo.rnbiometrics;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.hardware.fingerprint.FingerprintManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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
        promise.resolve("Android Native Mock");
    }

    @ReactMethod
    public void simplePrompt(String title, Promise promise) {
        AlertDialog alertDialog = new AlertDialog.Builder(getCurrentActivity()).create();
        alertDialog.setTitle("Native Module Mock");
        alertDialog.setMessage(title);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "Test Success",
                new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        promise.resolve(true);
                        dialog.dismiss();
                    }
                });
        alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "Test Failure",
                new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        promise.reject("Mock fingerprint authorization failed", "Mock Failure");
                        dialog.dismiss();
                    }
                });
        alertDialog.show();
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
