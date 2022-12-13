const crypto = require('crypto');
console.log(crypto.randomUUID());

const uuid = require('uuid');
console.log(`Here is a test v1 uuid: ${uuid.v1()}`);
console.log(`Here is a test v4 uuid: ${uuid.v4()}`);

// const Nanoid = require('nanoid');
// const NanoidAsync = require('nanoid/async');

// console.log(`UUID with Nano ID sync: ${Nanoid.nanoid()}`);

// (async function() {
//   const nanoId = await NanoidAsync.nanoid();
//   console.log(`UUID with Nano ID async: ${nanoId}`);
// })();