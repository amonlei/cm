rm plugins/android.json
rm -rf platforms/android/
phonegap build android
cp plugins/org.stereolux.cordova.serial/lib/usbseriallibrary.jar platforms/android/libs/
phonegap build android
