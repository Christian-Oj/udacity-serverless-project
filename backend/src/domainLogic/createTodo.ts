import { TodoDataLogic } from "../helpers/totoAccess";
import { parseUserId } from "../auth/utils";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { TodoItem } from "../models/TodoItem";


// TODO: Implement createTodoLogic
const todoLogic = new TodoDataLogic();
const uuidv4 = require('uuid/v4');

export function userCreateTodo(
    createTodoRequest: CreateTodoRequest, 
    jwtToken: string
    ): Promise<TodoItem> {

    const userId = parseUserId(jwtToken);
    const todoId =  uuidv4();
    const awsBucketStorage = process.env.TODO_AWS_BUCKET;
    
    return todoLogic.userCreateTodo({
        userId: userId,
        todoId: todoId,
        
        attachmentUrl:  `https://${awsBucketStorage}.s3.amazonaws.com/${todoId}`, 
        createdAt: new Date().getTime().toString(),
        done: false,

        ...createTodoRequest,
    });
}
