import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import 'source-map-support/register'
import {createTodoForUser} from "../../businessLogic/todo";
import {CreateTodoRequest} from '../../requests/CreateTodoRequest';


export const handler: APIGatewayProxyHandler = 
    async (event: APIGatewayProxyEvent): 
    Promise<APIGatewayProxyResult> => {

        const newTodo: CreateTodoRequest = JSON.parse(event.body);
        // TODO: Implement creating a new TODO item
        const status = 201;
        const auth = event.headers.Authorization;
        const jwt = auth.split(' ')[1];
        
        const getTodoItem = await createTodoForUser(newTodo, jwt);
        return {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                "item": getTodoItem
            }),
            statusCode: status,
        };
};
