import { describe, it, expect } from 'vitest';
import { getNextBillingDateKST } from './dateUtils';

describe('getNextBillingDateKST', () => {
  it('KST 자정 기준으로 30일 뒤 날짜를 정확히 계산해야 한다', () => {
    // 임의의 기준일 설정 (UTC 기준 2026년 6월 19일 06:00:00 -> KST 기준 6월 19일 15:00:00)
    const baseDate = new Date('2026-06-19T06:00:00.000Z');
    const result = getNextBillingDateKST(baseDate);

    // KST 기준으로 30일 뒤는 2026년 7월 19일 00:00:00 KST
    // 이를 UTC로 변환하면 2026년 7월 18일 15:00:00 UTC 이어야 함
    expect(result.toISOString()).toBe('2026-07-18T15:00:00.000Z');
  });

  it('월말/월초 계산을 정확히 처리해야 한다', () => {
    // 기준일: UTC 기준 2026년 1월 31일 10:00:00 -> KST 기준 1월 31일 19:00:00
    const baseDate = new Date('2026-01-31T10:00:00.000Z');
    const result = getNextBillingDateKST(baseDate);

    // 1월 31일 + 30일 = 3월 2일 (2월은 28일까지)
    // KST 3월 2일 00:00:00 -> UTC 3월 1일 15:00:00
    expect(result.toISOString()).toBe('2026-03-01T15:00:00.000Z');
  });

  it('KST 자정 전(UTC 15시~24시) 결제 시 하루가 넘어가지 않도록 계산해야 한다', () => {
    // 기준일: UTC 기준 2026년 6월 19일 20:00:00 -> KST 기준 6월 20일 05:00:00
    // 즉, 한국에서는 이미 다음날(20일) 결제가 일어난 것.
    const baseDate = new Date('2026-06-19T20:00:00.000Z');
    const result = getNextBillingDateKST(baseDate);

    // KST 기준 6월 20일 + 30일 = 7월 20일 00:00:00
    // 이를 UTC로 변환하면 7월 19일 15:00:00 UTC
    expect(result.toISOString()).toBe('2026-07-19T15:00:00.000Z');
  });
});
