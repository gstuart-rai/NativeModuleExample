//
//  ReactNativeBiometrics.m
//

#import "ReactNativeBiometrics.h"
#import <LocalAuthentication/LocalAuthentication.h>
#import <Security/Security.h>
#import <UIKit/UIKit.h>

@implementation ReactNativeBiometrics

RCT_EXPORT_MODULE(ReactNativeBiometrics);

RCT_EXPORT_METHOD(isSensorAvailable:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
//  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//    resolve(@"Native Mock");
//  });
}

RCT_EXPORT_METHOD(simplePrompt: (NSString *)promptMessage resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
//  UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"Native Module"
//                                                                           message:promptMessage
//                                                                    preferredStyle:UIAlertControllerStyleAlert];
//  //We add buttons to the alert controller by creating UIAlertActions:
//  UIAlertAction *actionOk = [UIAlertAction actionWithTitle:@"Test Success"
//                                                     style:UIAlertActionStyleDefault
//                                                   handler:^(UIAlertAction *action){
//                                                     resolve(@(YES));
//                                                   }]; //You can use a block here to handle a press on this button
//  UIAlertAction *actionFail = [UIAlertAction actionWithTitle:@"Test Failure"
//                                                     style:UIAlertActionStyleDefault
//                                                   handler:^(UIAlertAction *action){
//                                                     reject(@"Failure Code", @"Message", nil);
//                                                   }]; //You can use a block here to handle a press on this button
//
//  [alertController addAction:actionOk];
//  [alertController addAction:actionFail];
//  
//  UIViewController *VC = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
//  [VC presentViewController:alertController animated:YES completion:nil];
}

- (NSString *)getBiometryType:(LAContext *)context
{
  if (@available(iOS 11, *)) {
    return (context.biometryType == LABiometryTypeFaceID) ? @"FaceID" : @"TouchID";
  }
  
  return @"TouchID";
}

@end
