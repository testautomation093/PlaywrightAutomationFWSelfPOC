import {test, expect} from "../src/fixtures/pageFixtures.js";
import {CsvHelper} from "../src/utils/csvUtils.js";
import {ExcelHelper} from "../src/utils/excelUtils.js";
import {JsonHelper} from "../src/utils/jsonUtils.js";

test.beforeEach(async ({loginPage})=>
{
    await loginPage.goToLoginPage();

});


test("Login Page Title Test", async ({loginPage})=>
{
    let title=await loginPage.getLoginPageTitle();
    expect(title).toBe("Account Login");
});

    test("Forgot Password Link Exist Test", async ({loginPage})=>
    {
    let isForgotPwdLinkAvailable=await loginPage.isForgotPwdLinkAvailable();
    expect(isForgotPwdLinkAvailable).toBe(true);
});

test("Use Doing actual login Test", async ({loginPage, homePage})=>
{
    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!); // Here ! is used to tell TypeScript that we are sure that the value will not be null or undefined.
    let flag:boolean = await homePage.isLogOutLinkAvailable();
    expect(flag).toBeTruthy();
});

// This below test case is to test the negative login scenarios via CSV file:

let testData= CsvHelper.readCsv("src/testData/testData.csv"); // Here we are reading the test data from the CSV file and storing it in the testData variable.

for(let data of testData)  // Here we are iterating through the test data and running the test case for each data set.
{
    test(`Negative Login Test with username: ${data.username} and password: ${data.password}`, async ({loginPage})=>
    {
        await loginPage.doLogin(data.username, data.password);  // picking the username and password from the CSV file and passing it to the doLogin method of the LoginPage class.
        let errorMessage=await loginPage.getPageErrorMessage();
        expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.");
    });
}

// This below test case is to test the negative login scenarios via Excel file:

let excelData= ExcelHelper.readExcel("src/testData/LoginData.xlsx");

for(let data of excelData)
{
    test(`Negative Login Test with Excel Sheet having username: ${data.username} and password: ${data.password}`, async ({loginPage})=>
    {
        await loginPage.doLogin(data.username, data.password);  // picking the username and password from the CSV file and passing it to the doLogin method of the LoginPage class.
        let errorMessage=await loginPage.getPageErrorMessage();
        expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.");
    });
}

let jsonData= JsonHelper.readJson("src/testData/jsonData.json");
for(let data of jsonData)
{
    test(`Negative Login Test with JSON data having username: ${data.username} and password: ${data.password}`, async ({loginPage})=>
    {
        await loginPage.doLogin(data.username, data.password);
        let errorMessage=await loginPage.getPageErrorMessage();
        expect(errorMessage).toContain("Warning: No match for E-Mail Address and/or Password.");
    });
}