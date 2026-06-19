import { test, expect } from '@playwright/test';

test.describe('Route Protection E2E Tests', () => {
  test('Free user (qwer13) should be blocked from creating notes and redirected to payment', async ({ page }) => {
    // 1. Go to auth page and login
    await page.goto('http://localhost:3000/auth');
    await page.fill('input[type="email"]', 'qwer13@naver.com');
    await page.fill('input[type="password"]', 'qwer13');
    await page.click('button[type="submit"]');

    // Check for error message
    try {
      const errorDiv = page.locator('.bg-error-container');
      if (await errorDiv.isVisible({ timeout: 3000 })) {
        const errorText = await errorDiv.textContent();
        console.error('Login Error for qwer13:', errorText);
        throw new Error('Login failed: ' + errorText);
      }
    } catch (e) {
      // Ignore timeout, meaning no error div showed up
    }

    // 2. Wait for redirect to dashboard or notes
    await page.waitForURL('**/dashboard*');

    // 3. Try to create a new note
    // The "New Note" button is in the sidebar and submits a form to create a note.
    const newNoteButton = page.getByRole('button', { name: /New Note/i });
    await expect(newNoteButton).toBeVisible();
    await newNoteButton.click();

    // 4. Expect to be redirected to payment page due to RLS / Free plan restriction
    await page.waitForURL('**/payment?error=upgrade_required*');
    await expect(page.url()).toContain('/payment?error=upgrade_required');
  });

  test('Pro user (qwer12) should be able to create notes', async ({ page }) => {
    // 1. Go to auth page and login
    await page.goto('http://localhost:3000/auth');
    await page.fill('input[type="email"]', 'qwer12@naver.com');
    await page.fill('input[type="password"]', 'qwer12');
    await page.click('button[type="submit"]');

    // Check for error message
    try {
      const errorDiv = page.locator('.bg-error-container');
      if (await errorDiv.isVisible({ timeout: 3000 })) {
        const errorText = await errorDiv.textContent();
        console.error('Login Error for qwer12:', errorText);
        throw new Error('Login failed: ' + errorText);
      }
    } catch (e) {
      // Ignore timeout, meaning no error div showed up
    }

    // 2. Wait for redirect
    await page.waitForURL('**/dashboard*');

    // 3. Try to create a new note
    const newNoteButton = page.getByRole('button', { name: /New Note/i });
    await expect(newNoteButton).toBeVisible();
    await newNoteButton.click();

    // 4. Expect to be redirected to the new note's detail page
    await page.waitForURL('**/notes/*');
    await expect(page.url()).toContain('/notes/');
    // Verify it doesn't contain payment error
    await expect(page.url()).not.toContain('/payment');
  });
});
