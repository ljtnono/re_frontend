/**
 * 时间格式化工具
 *
 * @param time 时间戳或日期字符串
 * @param pattern 格式，如 YYYY-MM-DD / YYYY-MM-DD HH:mm:ss
 * @returns {string}
 */
export function formatTime(time, pattern = "YYYY-MM-DD") {
  if (!time) {
    return "";
  }
  let date = new Date(time);
  if (isNaN(date.getTime())) {
    return String(time);
  }
  let pad = (n) => String(n).padStart(2, "0");
  let map = {
    "YYYY": date.getFullYear(),
    "MM": pad(date.getMonth() + 1),
    "DD": pad(date.getDate()),
    "HH": pad(date.getHours()),
    "mm": pad(date.getMinutes()),
    "ss": pad(date.getSeconds())
  };
  return pattern.replace(/YYYY|MM|DD|HH|mm|ss/g, (k) => map[k]);
}
