## A WIP project to look at using a WebBluetooth and an Adafruit nRF52840 Feather
Ideally I would like to make a small progressive webapp that I can run on my phone or laptop and use to interact with a microcontroller that BLE support.

Status: I can read values from the Feather on Chrome. Haven't tried on IOS yet.

Steps to serve a page from your local machine to your phone etc:
1. Make a [local ssl cert](https://web.dev/how-to-use-local-https/)
2. Install the cert on your IOS/other device

### Links
[Web Bluetooth Walkthrough](https://web.dev/bluetooth/)

[A little app to generate boilerplate code for webbluetooth](https://beaufortfrancois.github.io/sandbox/web-bluetooth/generator/)
[example code for listening to a changed in a service](https://googlechrome.github.io/samples/web-bluetooth/read-characteristic-value-changed.html)

[Adafruit nRF52840 Feather example: implementing a custom heart rate monitor](https://learn.adafruit.com/introducing-the-adafruit-nrf52840-feather/custom-hrm)

[A browser for IOS that implements WebBluetooth](https://www.greenparksoftware.co.uk/projects/webble/1.2.3)
