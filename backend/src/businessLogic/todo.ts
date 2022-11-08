import { TodoDataLogic } from "../dataLayer/TodoAccess";
import { parseUserId } from "../auth/utils";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { TodoItem } from "../models/TodoItem";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { TodoUpdate } from "../models/TodoUpdate";


// TODO: Implement business Logic
const todoLogic = new TodoDataLogic();
const uuidv4 = require('uuid/v4');

export function createTodoForUser(
    createTodoRequest: CreateTodoRequest, 
    jwtToken: string
    ): Promise<TodoItem> {

    const userId = parseUserId(jwtToken);
    const todoId =  uuidv4();
    const awsBucketStorage = process.env.TODO_AWS_BUCKET;
    
    return todoLogic.createTodoForUser({
        userId: userId,
        todoId: todoId,
        
        attachmentUrl:  `https://${awsBucketStorage}.s3.amazonaws.com/${todoId}`, 
        createdAt: new Date().getTime().toString(),
        done: false,

        ...createTodoRequest,
    });
}


export function updateTodoForUser(
    updateTodoRequest: UpdateTodoRequest, 
    todoId: string, 
    jwtToken: string
    ): Promise<TodoUpdate> {
        
    const userId = parseUserId(jwtToken);
    
    return todoLogic.updateTodoForUser(updateTodoRequest, todoId, userId);
}

export function createPresignedUrl(
    todoId: string): Promise<string> {
    
    return todoLogic.createPresignedUrl(todoId);
}

export async function getTodoForUser(
    jwtToken: string
    ): Promise<TodoItem[]> {

    const userId = parseUserId(jwtToken);
    return todoLogic.getTodoForUser(userId);
}

export function deleteTodoForUser(
    todoId: string, 
    jwtToken: string): Promise<string> {
    const userId = parseUserId(jwtToken);
    
    return todoLogic.deleteTodoForUser(todoId, userId);
}