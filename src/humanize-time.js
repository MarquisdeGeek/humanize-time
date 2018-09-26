(function() {
  humanize = function(options_) {
    var options = options_ || {};

    function time(t) {
      var the_time = unifyTimeArgument(t);
      var blocks = determineBlocks(options, the_time.hours, the_time.mins);
      var output = makeText(blocks);
      return output;
    }

    function unifyTimeArgument(t) {
      var hours, mins;

      if (typeof t === 'undefined') {
        t = new Date();
      }

      if (t.getHours) {
        hours = t.getHours();
      } else if (typeof t.hours !== 'undefined') {
        hours = t.hours;
      } else if (typeof t.hr !== 'undefined') {
        hours = t.hr;
      } else {
        throw new Error('Invalid value for hours');
      }

      if (t.getMinutes) {
        mins = t.getMinutes();
      } else if (typeof t.minutes !== 'undefined') {
        mins = t.minutes;
      } else if (typeof t.mins !== 'undefined') {
        mins = t.mins;
      } else if (typeof t.min !== 'undefined') {
        mins = t.min;
      } else {
         throw new Error('Invalid value for minutes');
      }

      return { hours: hours, mins: mins };
    }

    function determineBlocks(options, hours, mins) {
      var next_hour = hours > 11 ? (hours-11) : hours+1;
      var output_hour = getHours(options, hours);
      var output_next_hour = getHours(options, next_hour);
      var output_minutes_past = getMinutes(options, mins);
      var output_minutes_to = getMinutes(options, 60-mins);
      var blocks = [];

      switch(mins) {
        case 0: // top of the hour
          blocks.push(output_hour);
          if (hours) { // for all hours, except midnight, since 'midnight o clock is weird'
            blocks.push('o clock');
          }
          break;
        case 1: //singular minutes
          blocks.push(output_minutes_past);
          blocks.push('minute past');
          blocks.push(output_hour);
          break;

        case 15:
          blocks.push('quarter past');
          blocks.push(output_hour);
          break;

        case 30:
          blocks.push('half past');
          blocks.push(output_hour);
          break;

        case 45:
          blocks.push('quarter to');
          blocks.push(output_next_hour);
          break;

        case 59: //singular minutes
          blocks.push(output_minutes_to);
          blocks.push('minute to');
          blocks.push(output_next_hour);
          break;

        default:
          if (mins < 30) {
            blocks.push(output_minutes_past);
            blocks.push('minutes past');
            blocks.push(output_hour);
          } else {
            blocks.push(output_minutes_to);
            blocks.push('minutes to');
            blocks.push(output_next_hour);
          }
          break;
        }

        if ((mins <= 30 && hours === 0) || (mins > 30 && hours === 1)) {
          // nop - for midnight
        } else if (hours < 12) {
          blocks.push('A.M.');
        } else {
          blocks.push('P.M.');
        }

        return blocks;
      }

    function makeText(blocks) {
      return blocks.join(' ');
    }

    function getNumericWord(num) {
      var words = [
        'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
      ];
      var tens = [
        'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty'
      ];

      if ((num % 10) === 0) {
        return tens[num/10];
      }

      if (num < 20) {
        return words[num];
      }

      return tens[num/10] + ' ' + words[num % 10];
    }

    function getHours(options, h) {
      if (h === 0) {
      	return 'midnight';
      }

      return (options.asText) ? getNumericWord(h%12) : (h%12);
    }

    function getMinutes(options, m) {
      return (options.asText) ? getNumericWord(m) : m;
    }

    return {
      time
    }
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = humanize;
  else
    window.humanize = humanize;
})();