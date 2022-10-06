#include <WebUSB.h>

/**
   Creating an instance of WebUSBSerial will add an additional USB interface to
   the device that is marked as vendor-specific (rather than USB CDC-ACM) and
   is therefore accessible to the browser.

   The URL here provides a hint to the browser about what page the user should
   navigate to to interact with the device.
*/
WebUSB WebUSBSerial(1 /* https:// */, "juxtapix.github.io");

#define Serial WebUSBSerial

void setup() {
  while (!Serial) {
    ;
  }
  Serial.begin(9600);
  Serial.write("---------------------- Start! \r\n> ");
  Serial.flush();
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  if (Serial && Serial.available()) {
    int byte = Serial.read();
    Serial.write(byte);
    if (byte == 'H') {
      Serial.write("\r\n LED on.");
      digitalWrite(LED_BUILTIN, HIGH);
    } else if (byte == 'L') {
      Serial.write("\r\n LED off.");
      digitalWrite(LED_BUILTIN, LOW);
    }
    Serial.write("\r\n> ");
    Serial.flush();
  }
}
