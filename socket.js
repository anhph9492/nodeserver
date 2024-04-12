console.log('socket server running')

import { WebSocketServer } from 'ws';
import fs from 'fs';

const wss = new WebSocketServer({ port: 1357 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    const stream = fs.createReadStream('./mp4_example_acv1.mp4');
    stream.on('data', chunk => {
      console.log('send chunk - ', chunk)
      ws.send(chunk);
    });
    stream.on('end', () => {
      console.log('ended stream')
      // ws.close();
    });
  });
  

});