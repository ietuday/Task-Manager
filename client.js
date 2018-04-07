const EventEmitter = require('events');
const readLine = require('readline');

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new EventEmitter();
const server = require('./server')(client);

server.on('response', (resp) => {
  console.log(`Resp: ${resp}`);
  process.stdout.write('\u001B[2J\u001B[0;0f');
  process.stdout.write(resp);
  process.stdout.write('\n\>');
});

let command, args;
rl.on('line', (input) => {
  console.log("Inside Clinet.js : line Event",input);
  [command, ...args] = input.split(' ');
  client.emit('command', command, args);
})
