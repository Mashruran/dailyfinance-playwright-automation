import { expect, Page } from '@playwright/test';
import fs from 'fs';
import { waitForDebugger } from 'inspector';
import path from 'path';

export class ProfilePage {
  constructor(private page: Page) {}

async uploadProfileImage() {
  await this.page.getByRole("button", { name: "EDIT" }).click();

  const imagePath = path.join(process.cwd(), 'resources/img1.jpg');

  const stats = fs.statSync(imagePath);
  if (stats.size > 100 * 1024) {
    throw new Error('Profile image must be below 100KB');
  }

  await this.page.setInputFiles('input[type="file"]', imagePath);

  this.page.once('dialog', dialog => {
    console.log(dialog.message());
    dialog.dismiss().catch(() => {});
  });
  await this.page.getByRole('button', { name: 'Upload Image' }).click();

  this.page.once('dialog', dialog => {
    console.log(dialog.message());
    dialog.dismiss().catch(() => {});
  });
  await this.page.getByRole('button', { name: 'Update' }).click();
}
}