import { Page } from '@playwright/test';
import { ItemModel } from '../models/item.model';

export class AddCostPage {

  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("/");
  }

  async fillItemName(itemName: string) {
    await this.page.getByLabel("Item Name").fill(itemName);
  }

  async clickQuantity() {
    await this.page.getByRole("button", { name: "+" }).click();
  }

  async fillAmount(amount: string) {
    await this.page.getByLabel("Amount").fill(amount);
  }

  async fillDate(date: string) {
    await this.page.getByLabel("Purchase Date").fill(date);
  }

  async selectMonth(month: string) {
    await this.page.getByLabel("Month").selectOption(month);
  }

  async fillRemarks(remarks: string) {
    await this.page.getByLabel("Remarks").fill(remarks);
  }

  async clickSubmitButton() {
    await this.page.getByRole("button", { name: "Submit" }).click();
  }

  async userAddCost(item: ItemModel) {
    await this.fillItemName(item.itemName);
    await this.clickQuantity();
    await this.fillAmount(item.amount);
    await this.fillDate(item.date!=null?item.date:"");
    await this.selectMonth(item.month);
    await this.fillRemarks(item.remarks!=null?item.remarks:"");
    await this.clickSubmitButton();
  }
  
}