export function getNextBillingDateKST(baseDate: Date = new Date()): Date {
  const kstOffsetMs = 9 * 60 * 60 * 1000;
  
  // 1. UTC 기준 baseDate를 KST 시간대 값으로 변환
  const kstDate = new Date(baseDate.getTime() + kstOffsetMs);
  
  // 2. KST 기준으로 30일 더하기
  kstDate.setUTCDate(kstDate.getUTCDate() + 30);
  
  // 3. 시간을 00:00:00.000 으로 초기화 (KST 자정)
  kstDate.setUTCHours(0, 0, 0, 0);
  
  // 4. 다시 UTC로 변환하여 반환
  return new Date(kstDate.getTime() - kstOffsetMs);
}
