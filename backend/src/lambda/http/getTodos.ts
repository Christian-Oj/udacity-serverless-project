import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import 'source-map-support/register'
import { getTodoForUser } from "../../businessLogic/todo";


export const handler: APIGatewayProxyHandler = 
    async (event: APIGatewayProxyEvent): 
    Promise<APIGatewayProxyResult> => {
    
        const status = 200;
        const auth = event.headers.Authorization;
        // TODO: Get all TODO items for a current user
        
        const jwt = auth.split(' ')[1];

        const userTodo = await getTodoForUser(jwt);

        return {
            body: JSON.stringify({
                "items": userTodo,
            }),
            statusCode: status,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        };
};
