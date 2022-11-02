// import { TodoUpdate } from "../models/TodoUpdate";
// import { parseUserId } from "../auth/utils";
// import { CreateTodoRequest } from "../requests/CreateTodoRequest";
// import { TodoItem } from "../models/TodoItem";
// import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
// import { TodoDataLogic } from "../helpers/totoAccess";



// // TODO: Implement domainLogic
// const todoLogic = new TodoDataLogic();
// const uuidv4 = require('uuid/v4');


// export async function userGetTodo(
//     jwtToken: string
//     ): Promise<TodoItem[]> {

//     const userId = parseUserId(jwtToken);
//     return todoLogic.userGetTodo(userId);
// }

// export function userCreateTodo(
//     createTodoRequest: CreateTodoRequest, 
//     jwtToken: string
//     ): Promise<TodoItem> {

        
//     const userId = parseUserId(jwtToken);
//     const todoId =  uuidv4();
//     const awsBucketStorage = process.env.TODO_AWS_BUCKET;
    
//     return todoLogic.userCreateTodo({
//         userId: userId,
//         todoId: todoId,
        
//         attachmentUrl:  `https://${awsBucketStorage}.s3.amazonaws.com/${todoId}`, 
//         createdAt: new Date().getTime().toString(),
//         done: false,

//         ...createTodoRequest,
//     });
// }

// export function userUpdateTodo(
//     updateTodoRequest: UpdateTodoRequest, 
//     todoId: string, 
//     jwtToken: string
//     ): Promise<TodoUpdate> {
        
//     const userId = parseUserId(jwtToken);
    
//     return todoLogic.userUpdateTodo(updateTodoRequest, todoId, userId);
// }

// export function userDeleteTodo(
//     todoId: string, 
//     jwtToken: string): Promise<string> {
//     const userId = parseUserId(jwtToken);
    
//     return todoLogic.userDeleteTodo(todoId, userId);
// }

// export function usercreatePresignedUrl(
//     todoId: string): Promise<string> {
    
//     return todoLogic.usercreatePresignedUrl(todoId);
// }