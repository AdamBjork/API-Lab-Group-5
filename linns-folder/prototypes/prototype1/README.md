# Prototype with Socket.io & johnny-five

This is a prototype built using socket.io and johnny-five and an arduino.

## What is the project exploring?

After establishing a communication between a server and browsers using the socket.io in the examples, johnny-five and an arduino was added to create a physical interactive prototype.

The prototype enables controlling arduino led lights through a sever and local browsers, as well as give feedback live in the browsers.

## How to use

Make sure you have a text editor, a working terminal, Node.js, and Python installed.
If on a mac, also download Xcode.

### Set up arduino in arduino IDE

1. Plug in your arduino and set it up, (use the right wiring or change it in the code)
2. Make sure you are connected to the right port
3. Go to File>Examples>Firmata>StandardFirmataPlus
4. Upload the example to your Arduino

### In VS code

1. Open the terminal
2. Open the accurate environment in the terminal
3. In the terminal, type:

```bash
npm install
```

4. Start the server in the terminal by typing:

```bash
node server.js
```

5. Open up your your browser and type http://localhost:4400
6. Play around with the arduino lights through the browsers.

## Contributors

This code was developed by Linn Claesson, but also based on previous examples ect. Check out the list below!

The prototype code was based on:

-   The NetNinja Socket.io series - https://www.youtube.com/watch?v=vQjiN8Qgs3c

-   Socket.io whiteboard - https://github.com/socketio/socket.io/tree/master/examples/whiteboard

-   Workshop with Peter Tolstrup Aagesen 2021-03-02 - https://github.com/helmersson/Arduino-examples/blob/main/public/index.html

-   Code Train - https://www.youtube.com/watch?v=Kw5tC5nQMRY

-   Johnny-five, get started - http://johnny-five.io/examples/
