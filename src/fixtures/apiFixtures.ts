import {test as baseTest} from '@playwright/test';
import { APIHelper } from '../api/APIHelper.js';

// defining types for api fixtures :

type apiFixtures = {
                    apiHelper:APIHelper;
                  }   


   export let test=baseTest.extend<apiFixtures>({
   
    apiHelper:async ({request}, use)=>
    {
        let apiHelper = new APIHelper(request,process.env.API_BASE_URL!); // Here I am creating an instance of APIHelper class and passing the request object that playwright gives to me and the api base url that I have defined in the .env file.
        await use(apiHelper); // This use callback function is provided by playwright and from here I am passing the apiHelper instance to the test function so that I can use it in my tests
    }
});

export { expect } from '@playwright/test';
