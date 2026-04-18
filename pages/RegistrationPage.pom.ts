import { Page } from '@playwright/test';
import { UserModel } from "../models/user.model";

export class RegistrationPage{

      constructor(private page: Page) {}
    
    
        async navigate() {
        await this.page.goto("/");
        }

       async clickOnRegisterLink(){
       await  this.page.getByRole(  "link" , { name : "Register" } ).click();
       }
      
       async fillFirstName( firstName : string  ){
        await this.page.getByLabel("First Name").fill(firstName) ;

       }

       async fillLastName(lastName: string) {
       await this.page.getByLabel("Last Name").fill(lastName);
      }

      async fillEmail(email: string) {
        await this.page.getByLabel("Email").fill(email);
      }

     async fillPassword(password: string) {
      await this.page.getByLabel("Password").fill(password);
     }

     async fillPhoneNumber(phone: string) {
      await this.page.getByLabel("Phone Number").fill(phone);
     }

     async fillAddress(address: string) {
      await this.page.getByLabel("Address").fill(address);
    }

      async selectGender() {

      await this.page.getByRole("radio").first().check();
    }

    async acceptTerms() {
    await this.page.getByRole("checkbox").check();
     }

    async clickRegisterButton() {
    await this.page.getByRole("button", { name: "REGISTER" }).click();
     }

    
    async registerUser(user : UserModel  ){
        await this.navigate()
        await this.clickOnRegisterLink();
        await this.fillFirstName(user.firstName);
        await this.fillLastName( user.lastName!=null?user.lastName:"" );
        await this.fillEmail(user.email);
        await this.fillPassword(user.password);
        await this.fillPhoneNumber(user.phoneNumber);
        await this.fillAddress(user.address!=null?user.address:"");
        await this.selectGender();
        await this.acceptTerms();
        await this.clickRegisterButton();
    }
}
