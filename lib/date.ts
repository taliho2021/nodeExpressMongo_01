// module.exports.getDate = getDate;
// module.exports.getDay = getDay;

// function getDate() {
//   let today = new Date();

//   // Use JS toLocalDateString to convert the date format  to Today is: Friday, July 15(specified in options)
//   let options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//   };

//   let day = today.toLocaleDateString("en-us", options);
//   return day;
// }

// function getDay() {
//   let today = new Date();

//   // Use JS toLocalDateString to convert the date format  to Today is: Friday, July 15(specified in options)
//   let options = {
//     weekday: "long",
//   };

//   let day = today.toLocaleDateString("en-us", options);
//   return day;
// }

// Refactored below

exports.getDate = function () {
  const today = new Date();

  // Use JS toLocalDateString to convert the date format  to Today is: Friday, July 15(specified in options)
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return day = today.toLocaleDateString("en-us", options);
}

exports.getDay = function () {
  const today = new Date();

  // Use JS toLocalDateString to convert the date format  to Today is: Friday, July 15(specified in options)
  const options = {
    weekday: "long",
  };

  return day = today.toLocaleDateString("en-us", options);
}
