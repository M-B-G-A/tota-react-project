class DateUtil {
  static parseDate(date) {
    let d = new Date(+date);
    var datestring = d.getFullYear() + "." + (d.getMonth()+1)  + "." + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    return datestring;
  }

  static getRemainingTime(end) {
    var now = new Date();
    if (end - now > 0) {
      return (end - now) / 1000;
    }
    return 0;
  }
}

export default DateUtil;
