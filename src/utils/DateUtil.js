class DateUtil {
  static parseDate(date) {
    let d = Date(date);
    return d;
    // var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();
    // return datestring;
  }
}

export default DateUtil;
