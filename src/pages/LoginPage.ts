import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage
{
    private readonly emailId:Locator
    private readonly password: Locator
    private readonly loginBtn:Locator
    private readonly forgotPwdLink:Locator
    private readonly pageErrorMesage:Locator

    constructor(page:Page)
    {
        super(page);  // this page object will now be available in the BasePage class and we can use it in the child classes as well.

        this.emailId = page.locator('#input-email')
        this.password = page.locator('#input-password')
        this.loginBtn = page.locator("//button[text()='Login']")
        this.forgotPwdLink = page.locator("(//a[text()='Forgotten Password'])[1]")
        this.pageErrorMesage = page.locator('.alert.alert-danger.alert-dismissible');
    }

    async goToLoginPage()
    {
        await this.page.goto('en-gb?route=account/login'); // Here this.page is coming from the BasePage class and we are using it in the child class.
    }

    async getLoginPageTitle() : Promise<string>
    {
         return await this.page.title();
    }

    async isForgotPwdLinkAvailable() : Promise<boolean>
    {
       return await this.forgotPwdLink.isVisible();
    }

    async doLogin(username:string, password:string)
    {
        console.log(`Application Creadentials are : ${username} and ${password}`);
        await this.emailId.fill(username);  // if we have to access the variables of this current class then it can be accessed via current class name or this keyword. But if we have to access the variables of the parent class then we have to use this keyword only.
        await this.password.fill(password);
        await this.loginBtn.click();

        await this.page.waitForTimeout(2000);
    }

    async getPageErrorMessage() : Promise<string>
    {
        return await this.pageErrorMesage.innerText();
    }

}