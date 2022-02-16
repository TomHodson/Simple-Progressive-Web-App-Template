class HeartRateMonitor {

    constructor() {
      this.device = null;
      this.onDisconnected = this.onDisconnected.bind(this);
    }
    
    request() {
      let options = {
        "filters": [{
          "services": ["heart_rate"]
        }],
        "optionalServices": ['battery_service'],
      };
      return navigator.bluetooth.requestDevice(options)
      .then(device => {
        this.device = device;
        this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
      });
    }
    
    connect() {
      if (!this.device) {
        return Promise.reject('Device is not connected.');
      }
      return this.device.gatt.connect();
    }
    
    startHeartratemeasurementNotifications(listener) {
      return this.device.gatt.getPrimaryService("heart_rate")
      .then(service => service.getCharacteristic("heart_rate_measurement"))
      .then(characteristic => characteristic.startNotifications())
      .then(characteristic => characteristic.addEventListener('characteristicvaluechanged', listener));
    }
  
    stopHeartratemeasurementNotifications(listener) {
      return this.device.gatt.getPrimaryService("heart_rate")
      .then(service => service.getCharacteristic("heart_rate_measurement"))
      .then(characteristic => characteristic.stopNotifications())
      .then(characteristic => characteristic.removeEventListener('characteristicvaluechanged', listener));
    }
  
    disconnect() {
      if (!this.device) {
        return Promise.reject('Device is not connected.');
      }
      return this.device.gatt.disconnect();
    }
  
    onDisconnected() {
      console.log('Device is disconnected.');
    }
  }
  
var heartRateMonitor = new HeartRateMonitor();
  
document.querySelector('button').addEventListener('click', event => {
    heartRateMonitor.request()
    .then(_ => heartRateMonitor.connect())
    .then(_ => {console.log(heartRateMonitor.device.name)})
    .then(_ => {console.log(heartRateMonitor)})
    // .then(_ => heartRateMonitor.startHeartratemeasurementNotifications(event => console.log(event)))
    .catch(error => { console.log(error) });
  });



//add a listener that reads the battery percentage when you click the button
document.querySelector('#battery').addEventListener('click', event => {
    heartRateMonitor.connect()
    .then(server => server.getPrimaryService('battery_service'))
    .then(service => service.getCharacteristic('battery_level'))
    .then(characteristic => characteristic.readValue())
    .then(value => console.log(`Battery percentage is ${value.getUint8(0)}`))
    .catch(error => console.error(error));
});


  document.querySelector('#disconnect').addEventListener('click', event => {
    heartRateMonitor.disconnect()
  });