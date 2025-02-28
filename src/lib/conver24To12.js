export default function convert24To12(time24) {
    
  // time24 예: "14:05", "09:30", "00:10"
  // 콜론으로 분리 후 숫자로 변환
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  // AM/PM 결정
  const ampm = hour >= 12 ? "PM" : "AM";

  // 0~11 -> AM, 12~23 -> PM
  // 12시간제로 변경(12 -> 12, 13 -> 1, 0 -> 12)
  hour = hour % 12;
  if (hour === 0) hour = 12;

  // 분은 2자리로 보이도록 패딩
  const minutePadded = minute.toString().padStart(2, "0");

  // 최종 문자열 예: "2:05 PM", "12:00 AM"
  return `${hour}:${minutePadded} ${ampm}`;
}