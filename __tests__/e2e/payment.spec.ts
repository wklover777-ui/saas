import { test, expect } from '@playwright/test';

test.describe('Payment Widget Integration E2E', () => {
  test('should load payment widget and enable payment button', async ({ page }) => {
    // 1. 결제 페이지 접속
    await page.goto('/payment');

    // 2. 결제 위젯이 로드될 때까지 대기
    // 토스페이먼츠 SDK가 iframe 등을 삽입하는 것을 기다림
    await expect(page.locator('#payment-method')).toBeVisible();
    await expect(page.locator('#agreement')).toBeVisible();

    // 3. 결제 버튼 활성화 확인
    // isReady 상태가 true가 되면 텍스트가 "결제하기"를 포함하고 disabled 속성이 사라짐
    const paymentButton = page.getByRole('button', { name: /결제하기/ });
    await expect(paymentButton).not.toBeDisabled();
    await expect(paymentButton).toHaveText(/50,000원 결제하기/);

    // 참고: 실제 결제 승인 프로세스(리다이렉트 이후)를 테스트하려면 
    // 토스페이먼츠 테스트 창을 모킹하거나, 별도의 테스트 환경 설정이 필요합니다.
    // 여기서는 결제 위젯 렌더링 및 클릭 전 상태까지만 검증합니다.
  });
});
