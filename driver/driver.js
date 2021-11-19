'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const conCaps = io.connect(`${host}/caps`);

conCaps.emit('getAll');

conCaps.on('pickup', payload => {

conCaps.emit('received', payload.orderId);
    console.log(`DRIVER: will get the order :${payload.orderID}`);

    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.orderID}`);
        conCaps.emit('in-transit', payload);
    }, 2000);

    setTimeout(() => {
        console.log(`DRIVER: delivered up ${payload.orderID}`);
        conCaps.emit('delivered', payload);
    }, 3000);
});