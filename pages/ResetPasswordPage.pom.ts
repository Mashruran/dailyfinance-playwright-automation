import { Page, Locator } from '@playwright/test';
import { readLatestEmail } from '../services/Gmail_Data_Read.service';

export class ResetPasswordPage {

  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("/forgot-password");
  }  
  async sendResetLink(email: string, newPass:string) {
    await this.navigate()
    await this.page.getByRole("textbox",{name:"Email"}).fill(email);
    await this.page.getByRole("button",{name:"SEND RESET LINK"}).click();
    
    let content: string = "";
    for (let i = 0; i < 10; i++) {
      content = await readLatestEmail();
      if (content.includes("http")) break; 
      await this.page.waitForTimeout(1000); 
    }

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const linkArray = content.match(urlRegex);

    if (!linkArray || linkArray.length === 0) {
      throw new Error("No reset link found in email!");
    }

    const link = linkArray[0];
    await this.page.goto(link);
    await this.page.getByRole("textbox", { name: "New Password" }).fill(newPass);
    await this.page.getByRole("textbox", { name: "Confirm Password" }).fill(newPass);
    await this.page.getByRole("button", { name: "Reset Password" }).click();

   
  }

}

