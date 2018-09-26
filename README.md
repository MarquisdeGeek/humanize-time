# humanize-time
Generates human-like phrases for the given time

## Results

* quarter past midnight
* one minute to six A.M.
* 12 minutes past 5 P.M.

It supports both word and number variations.

## Install (NodeJS)

    npm i humanize-time

## Install (HTML5)

    <script type="text/javascript" src="arduino-controller.js"></script>

## Usage (NodeJS)


    let humanize = require('../src/humanize-time.js')({asText:false});

    console.log(humanize.time()); // current time
    console.log(humanize.time({hours:0, minutes:3}));
    console.log(humanize.time({hours:3, minutes:45}));


## Usage (HTML5)


    <script src="humanize-time.js"></script>
    <script>
      var humanize = humanize({asText:false});
    
      console.log(humanize.time());
      console.log(humanize.time({hours:0, minutes:3}));
      console.log(humanize.time({hours:3, minutes:45}));
    </script>


