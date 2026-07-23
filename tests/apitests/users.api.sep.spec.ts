import { test, expect } from '../../src/fixtures/apiFixtures.js';

const TOKEN= process.env.API_TOKEN;  // fecthing this token from env file
let AUTH_TOKEN = { Authorization: `Bearer ${TOKEN}` };

let userId:number; 

test.describe.serial("End to End Users API Tests Cases", ()=>
{

/**
 *  // This getRequest method is returning the object type data which has two properties statusCode and responseBody.
 * So I am storing that object in the response variable.
 */
test("Get All Users API Test" ,async ({apiHelper})=>
    {

        let response=await apiHelper.getRequest("/public/v2/users", AUTH_TOKEN);
        console.log("Response Body is : ", response.responseBody);
        expect(response.statusCode).toBe(200);
        expect(response.responseBody.length).toBeGreaterThan(0);
    }
);

test("Create a Fresh User API Test" ,async ({apiHelper})=>
    {

         let userData ={
                "name": "Nishant Automation",
                "email": `nltech${Date.now()}@gmail.com`,
                "gender": "male",
                "status": "active"
            }

        let response=await apiHelper.postRequest("/public/v2/users",userData, AUTH_TOKEN);
        console.log("Response Body is : ", response.responseBody);
        expect(response.statusCode).toBe(201);
        expect(response.responseBody.name).toBe(userData.name);
        userId = response.responseBody.id;
        console.log("User ID is : ", userId);
    }
);

test("Update the already Created User API Test" ,async ({apiHelper})=>
    {

         let userData ={
                "name": "Nishant Goel Trainer",
                "email": `nltech${Date.now()}@gmail.com`,
                "gender": "male",
                "status": "inactive"
            }

        let response=await apiHelper.updateRequest(`/public/v2/users/${userId}`,userData, AUTH_TOKEN);
        console.log("Response Body is : ", response.responseBody);
        expect(response.statusCode).toBe(200);
        expect(response.responseBody.name).toBe(userData.name);
        expect(response.responseBody.status).toBe(userData.status);
    
    }
);      

test("Delete the already Created User API Test" ,async ({apiHelper})=>
    {
       let response=await apiHelper.deleteRequest(`/public/v2/users/${userId}`, AUTH_TOKEN);
        expect(response.statusCode).toBe(204);
        expect(response.statusText).toBe("No Content");
    }
)

});