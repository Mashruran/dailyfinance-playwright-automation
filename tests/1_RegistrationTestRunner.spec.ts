import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { RegistrationPage } from "../pages/RegistrationPage.pom";
import { UserModel } from "../models/user.model";
import { generateRandomNumber , saveJsonData } from "../utils/Utils"
import userData from "../resources/userData.json";
import * as fs from 'fs';
import { readLatestEmail } from "../services/Gmail_Data_Read.service";


test.describe.serial("User Registration", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

test("Create new user", async () => {
    
    const person : UserModel = {
        firstName : faker.person.firstName(),
        lastName : faker.person.lastName() ,
        email : `matata.ext+${generateRandomNumber(1000, 9999)}@gmail.com` ,
        password : "1234" ,
        phoneNumber : "0130" + generateRandomNumber(1000000, 9999999),
        address : faker.location.city()
    };

    const regPage = new RegistrationPage(page);
    await regPage.registerUser(person);  

  //  userData.push(person);
  //  fs.writeFileSync( "./resources/userData.json" , JSON.stringify( userData , null , 2 ) );
  //   saveJsonData(person , "./resources/userData.json")
  saveJsonData(person,'resources/userData.json')

    await page.waitForTimeout(5000);

    let latestEmail = await readLatestEmail();
    console.log(latestEmail);

    expect( latestEmail ).toContain("Welcome to our platform");
  });
  
});