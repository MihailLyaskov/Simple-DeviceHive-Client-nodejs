global.XMLHttpRequest = require('xhr2');
global.WebSocket = require('ws');

var DeviceHive = require('./devicehive.client');

var dh = new DeviceHive('http://playground.devicehive.com/api/rest' , 'FsJCDRAbjTO+5GA8b0nydWJvtHl4Nwc4wZqHnqM/+Gk=');


var command = "gpio/write";
var parameters1 = { "5":1 };
var parameters0 = { "5":0 };


console.log("trying to open chanell!");
dh.openChannel(function (err, res) {
	            if (err) {
	                console.log(err);
	            }
	            console.log("trying to send command!");
				dh.sendCommand('esp-device',command, parameters1 ,function(err, res) {
					if(err){
						console.log(err);
					}
					console.log("equipment sendNotification " + "esp-device" + " " + command);
					console.log(res);
					return;
				});

				setTimeout( function(){
					dh.sendCommand('esp-device',command, parameters0 ,function(err, res) {
						if(err){
							console.log(err);
						}
						console.log("equipment sendNotification " + "esp-device" + " " + command);
						console.log(res);
						return;
					});
					dh.closeChannel(
						function(err,res){
							if(err){
								console.log("failed to close websocket channel");
							}
							else console.log(res);
						}
					);

				},3000);
	        }, 
	        "websocket"
);
