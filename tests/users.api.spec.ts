import {test, expect} from "@playwright/test"; 

let AUTH_TOKEN = {'Authorization': 'Bearer cec5b9d5f18030b14a3d81318b360ed2ee4573d227688ee4d48bdbb4c4d4b6e0'};

test("Fetch All the Users Data", async ({request})=>
{

    let response = await request.get("https://gorest.co.in/public/v2/users/8554207", { headers: AUTH_TOKEN });
    
    
    console.log(response);  // it will print the response object in the console

    let responseBody = await response.json();  // JS object to JSON conversion is also called as serealization.
    console.log(responseBody);

    console.log("Status Code is :" + response.status());  // it will print the status of the response in the console
    console.log("Status Text is :" + response.statusText());  // it will print the status text of the response in the console

});

test("Fetch the Single Users Data", async ({request})=>
{

    let response = await request.get("https://gorest.co.in/public/v2/users", { headers: AUTH_TOKEN });

    let responseBody = await response.json();  // JS object to JSON conversion is also called as serealization.
    console.log(responseBody);

    console.log("Status Code is :" + response.status());  // it will print the status of the response in the console
    console.log("Status Text is :" + response.statusText());  // it will print the status text of the response in the console

});

test("Create a New User Test", async ({request})=>
{
    let userData ={
                "name": "Nishant Goel Automation",
                "email": `nltech${Date.now()}@gmail.com`,
                "gender": "male",
                "status": "active"
            }
            
    let response = await request.post("https://gorest.co.in/public/v2/users",{headers: AUTH_TOKEN, data: userData});
    let responseBody = await response.json();
    console.log(responseBody);
    console.log("Status Code is :" + response.status());
    console.log("Status Text is :" + response.statusText()); 

});

test("Update the already Created User Test", async ({request})=>
{
    let userData ={
                "name": "Nishant Goel Trainer",
                "email": `nltech${Date.now()}@gmail.com`,
                "gender": "male",
                "status": "inactive"
            }
            
    let response = await request.put("https://gorest.co.in/public/v2/users/8554207",{headers: AUTH_TOKEN, data: userData});
    let responseBody = await response.json();
    console.log(responseBody);
    console.log("Status Code is :" + response.status());
    console.log("Status Text is :" + response.statusText()); 

});

test("Delete the already Created User Test", async ({request})=>
{
    let response = await request.delete("https://gorest.co.in/public/v2/users/8552640",{headers: AUTH_TOKEN});
    console.log("Status Code is :" + response.status());
    console.log("Status Text is :" + response.statusText()); 

});



