import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.pom';
import { getLastUser } from '../utils/Utils';
import { ItemModel, Month } from '../models/item.model';
import { faker } from '@faker-js/faker';
import { AddCostPage } from '../pages/AddCostPage.pom';
import * as fs from 'fs';
import { UserDashboardPage } from '../pages/UserDashboardPage.pom';
import { ProfilePage } from '../pages/ProfilePage.pom';

test.describe.serial("User Login & Upload Image", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });
  
  test("User Login", async () => {
    const loginPage = new LoginPage(page);

    const lastUser = getLastUser("resources/userData.json"); 

    await loginPage.login(lastUser.email, lastUser.password);
    await expect(page).toHaveURL(/.*\/user/);
  });
  test("Profile Icon", async () => {
    const userDashboardPage=new UserDashboardPage(page);
    userDashboardPage.clickProfileBtn();
    const text=page.getByRole("heading",{name:"User Details"})
    await expect(text).toContainText("User Details");
  });
    test("Image Upload", async () => {
      const profiePage = new ProfilePage(page);
      await profiePage.uploadProfileImage();
      await expect(page.locator('img')).toHaveAttribute('src', /profileImage/);

  });
});