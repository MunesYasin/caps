'use strict';
//--------------------------------------------------------
const faker = require('faker');
const io = require('socket.io-client');
const host = 'http://localhost:3000';
const conCaps = io.connect(`${host}/caps`);
//--------------------------------------------------------
setInterval(() => {
  let customerOrder = {
    store:'1-206-flowers',
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress(),
};
//--------------------------------------------------------
  conCaps.emit('pickup', customerOrder);
},4000);
//--------------------------------------------------------
conCaps.on('delivered', payload => {
  console.log(` VENDOR: Thank you for delivering  ${payload.orderID}`);
});
//--------------------------------------------------------
conCaps.on('orderinQueue',payload=> {
  console.log(`VENDOR: Order in Queue : ${payload.orderID} `);
});
//--------------------------------------------------------
module.exports = conCaps;