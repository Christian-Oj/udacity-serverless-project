import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { userUpdateTodo } from "../../domainLogic/updateTodo";

export const handler: APIGatewayProxyHandler = 
    async (event: APIGatewayProxyEvent): 
        Promise<APIGatewayProxyResult> => {

            const todoId = event.pathParameters.todoId;
            const status = 200;
            // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object

            const auth = event.headers.Authorization;
            const jwt = auth.split(' ')[1];

            const todoUpdate: UpdateTodoRequest = JSON.parse(event.body);
            const item = await userUpdateTodo(todoUpdate, todoId, jwt);

            return {
                statusCode: status,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    "item": item
                }),
            };
};
