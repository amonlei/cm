cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.stereolux.cordova.serial/www/serial.js",
        "id": "org.stereolux.cordova.serial.Serial",
        "clobbers": [
            "window.serial"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.stereolux.cordova.serial": "0.0.2"
}
// BOTTOM OF METADATA
});