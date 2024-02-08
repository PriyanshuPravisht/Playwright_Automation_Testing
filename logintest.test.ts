// import { test, expect } from '@playwright/test';

// test('Login Test', async ({ page }) => {
//     // Navigate to the login page
//     await page.goto('http://localhost:3000/');

//     // Fill the login form and submit
//     await page.fill('input[name="username"]', 'your_username');
//     await page.fill('input[name="password"]', 'your_password');
//     await page.click('button[type="submit"]');

//     // Wait for navigation to complete
//     await page.waitForNavigation({ timeout: 120000 });

//     // Example: Verify login success by checking for welcome message
//     const welcomeMessage = await page.innerText('.welcome-message');
//     expect(welcomeMessage).toContain('Welcome');

//     // Example: Verify login success by checking the URL of the redirected page
//     expect(page.url()).toBe('expected_url_after_login');
// });


import { test, expect } from '@playwright/test';

test('User can log in successfully', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://localhost:3000/');

  // Fill in the login form
  await page.fill('input[name="username"]', 'your_username');
  await page.fill('input[name="password"]', 'your_password');

  // Click on the login button
  await Promise.all([
    page.waitForNavigation(), // Wait for navigation to complete after clicking
    page.click('button[type="submit"]')
  ]);

  // Check if the user is successfully logged in
  const loggedInUsername = await page.textContent('.user-profile-username');
  expect(loggedInUsername).toContain('your_username');
});

test('User sees error message for invalid credentials', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://localhost:3000/');

  // Fill in the login form with invalid credentials
  await page.fill('input[name="username"]', 'invalid_username');
  await page.fill('input[name="password"]', 'invalid_password');

  // Click on the login button
  await page.click('button[type="submit"]');

  // Check if error message is displayed
  const errorMessage = await page.textContent('.error-message');
  expect(errorMessage).toContain('Invalid username or password.');
});
