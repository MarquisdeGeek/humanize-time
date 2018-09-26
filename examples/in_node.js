let humanize = require('../src/humanize-time.js')({asText:false});

console.log(humanize.time()); // current time
console.log(humanize.time({hours:0, minutes:3}));
console.log(humanize.time({hours:3, minutes:45}));
