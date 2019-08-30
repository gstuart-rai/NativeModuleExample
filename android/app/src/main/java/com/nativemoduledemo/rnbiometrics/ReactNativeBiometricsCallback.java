package com.nativemoduledemo.rnbiometrics;

import android.hardware.fingerprint.FingerprintManager;

public interface ReactNativeBiometricsCallback {

    void onAuthenticated(FingerprintManager.CryptoObject cryptoObject);

    void onCancel();

    void onError();
}
