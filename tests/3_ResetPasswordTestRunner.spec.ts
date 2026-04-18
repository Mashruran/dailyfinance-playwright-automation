import { test, expect,Page } from '@playwright/test';
import { ResetPasswordPage } from '../pages/ResetPasswordPage.pom';
import { getLastUser,updateLastUserField} from '../utils/Utils'; 


import * as fs from 'fs';
test.describe.serial("User Resets Password", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });
  test('User sends resets password and confirms password', async ({ page}) => {
    const resetPage = new ResetPasswordPage(page);
    const lastUser = getLastUser("resources/userData.json"); 
    const userEmail=lastUser.email;
    await resetPage.sendResetLink(userEmail,"12345");
    updateLastUserField("resources/userData.json","password","12345")
  });
});