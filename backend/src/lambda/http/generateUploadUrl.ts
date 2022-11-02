import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import { usercreatePresignedUrl } from "../../domainLogic/otherTodos";

export const handler: APIGatewayProxyHandler = 
    async (event: APIGatewayProxyEvent): 
    Promise<APIGatewayProxyResult> => {

        const todoId = event.pathParameters.todoId;
        const status = 202;
        // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
        
        const signedURL = await usercreatePresignedUrl(todoId);

        return {
            statusCode: status,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                uploadUrl: signedURL,
            })
        };
};