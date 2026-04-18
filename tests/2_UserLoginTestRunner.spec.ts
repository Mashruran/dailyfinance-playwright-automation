import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.pom';
import { getLastUser } from '../utils/Utils';
import { ItemModel, Month } from '../models/item.model';
import { faker } from '@faker-js/faker';
import { AddCostPage } from '../pages/AddCostPage.pom';
import * as fs from 'fs';
import { UserDashboardPage } from '../pages/UserDashboardPage.pom';

test.describe.serial("User Login & Add Item", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("Login with the new user", async () => {
    const loginPage = new LoginPage(page);

    const lastUser = getLastUser("resources/userData.json"); 

    await loginPage.login(lastUser.email, lastUser.password);
    await expect(page).toHaveURL(/.*\/user/);
  });

  test("Add item 1", async () => {
    await page.getByRole("button", { name: "Add Cost" }).click();

    const item: ItemModel = {
      itemName: faker.commerce.productName(),
      amount: "250",
      date: "2027-09-10",
      month: Month.May,
      remarks: faker.lorem.sentence()
    };

    const costPage = new AddCostPage(page);
    await costPage.userAddCost(item);


    fs.appendFileSync(
      'resources/itemData.txt',
      JSON.stringify(item) + '\n'
    );
    
  });
    test("Add item 2", async () => {
    await page.getByRole("button", { name: "Add Cost" }).click();
    const item2: ItemModel = {
      itemName: faker.commerce.productName(),
      amount: "30",
      date: "2026-09-10",
      month: Month.July,
      remarks: faker.lorem.sentence()
    };

    const costPage = new AddCostPage(page);
    await costPage.userAddCost(item2);


    fs.appendFileSync(
      'resources/itemData.txt',
      JSON.stringify(item2) + '\n'
    );
  });
  
    test("User Logout", async () => {
      const userDashboardPage=new UserDashboardPage(page);
      await userDashboardPage.doLogout();
  });
});