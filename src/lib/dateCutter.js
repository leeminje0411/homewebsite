export default function dateCutter(formData) {  
  formData = formData.map((item) => {
  const dateObj = new Date(item.created_at);

  // 오늘 0시, 어제 0시를 구해 날짜 비교에 활용
  const now = new Date();  
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfItemDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

  // 일 수 차이 (현재 시각 ~ 아이템 날짜) (정확한 시분초는 무시, 일단 '일' 단위만)
  const diffDays = Math.floor(
    (startOfToday - startOfItemDate) / (1000 * 60 * 60 * 24)
  );

  let displayDate = "";

  if (diffDays === 0) {
    // 오늘
    displayDate = "오늘";
  } else if (diffDays === 1) {
    // 어제
    displayDate = "어제";
  } else if (diffDays > 1 && diffDays <= 7) {
    // 7일 이내
    displayDate = `${diffDays}일 전`;
  } else {
    // 그 외 → "MM/DD" 형식 (월/일)
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    displayDate = `${month}/${day}`;
  }

  return {
    ...item,
    created_at: displayDate, // 최종 표시용 문자열
  };

});

    return formData;
}