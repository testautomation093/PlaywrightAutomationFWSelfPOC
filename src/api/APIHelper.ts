import {APIRequestContext} from "@playwright/test";

export class APIHelper
{

private readonly request: APIRequestContext;
private readonly baseUrl: string;

constructor(request: APIRequestContext, baseUrl: string)
{
    this.request = request;
    this.baseUrl = baseUrl;

}


// Public HTTP methods :


/**
 * Returning the object type data from this function
 * @param endPoint
 * @param requestHeaders --> Here the requestHeaders is optional parameter which is of type Record<string, string> which means it can accept any key value pair of string type. 
 */
async getRequest(endPoint:string, requestHeaders?:Record<string, string>)
{
    let response =await this.request.get(`${this.baseUrl}${endPoint}`, {headers: requestHeaders}); // in the get call we have to pass two things endppint and request headers.

    return {     
              statusCode: response.status(),
              responseBody: await response.json()
             }


}

async postRequest(endPoint:string, bodyData:object,requestHeaders?:Record<string, string>)
{
    let response =await this.request.post(`${this.baseUrl}${endPoint}`, 
        {  headers: requestHeaders,
           data : bodyData

        }); // in the get call we have to pass two things endpoint and request headers with bodyData.
   
        return {     
              statusCode: response.status(),
              responseBody: await response.json()
             }
}

async updateRequest(endPoint:string, bodyData:object,requestHeaders?:Record<string, string>)
{
    let response =await this.request.put(`${this.baseUrl}${endPoint}`, 
       
        {  headers: requestHeaders,
           data : bodyData

        }); // in the get call we have to pass two things endpoint and request headers with bodyData.
   
        return {     
              statusCode: response.status(),
              responseBody: await response.json()
             }
}

async deleteRequest(endPoint:string,requestHeaders?:Record<string, string>)
{
    let response =await this.request.delete(`${this.baseUrl}${endPoint}`, {  headers: requestHeaders}); // in the get call we have to pass two things endpoint and request headers with bodyData.
   
        return {     
              statusCode: response.status(),
              statusText: response.statusText()
             }
}
};