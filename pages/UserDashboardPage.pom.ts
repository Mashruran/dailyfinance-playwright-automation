import { Page, Locator } from '@playwright/test';

export class UserDashboardPage {
  constructor(private page: Page) {}
  async clickProfileBtn() {
    await this.page.getByTestId('AccountCircleIcon').click();
    await this.page.getByRole("menuitem").nth(0).click(); // Profile option
  }
  async doLogout() {
    await this.page.getByTestId('AccountCircleIcon').click();
    await this.page.getByRole("menuitem").nth(1).click(); // Logout option
  }

  async clickAddCostBtn() {
    await this.page.getByRole("button",{name:"Add Cost"}).click();
  }

}