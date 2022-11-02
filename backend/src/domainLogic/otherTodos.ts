import { TodoDataLogic } from "../helpers/totoAccess";
import { parseUserId } from "../auth/utils";
import { TodoItem } from "../models/TodoItem";


// TODO: Implement otherTodoLogic
const todoLogic = new TodoDataLogic();


export async function userGetTodo(
    jwtToken: string
    ): Promise<TodoItem[]> {

    const userId = parseUserId(jwtToken);
    return todoLogic.userGetTodo(userId);
}

export function userDeleteTodo(
    todoId: string, 
    jwtToken: string): Promise<string> {
    const userId = parseUserId(jwtToken);
    
    return todoLogic.userDeleteTodo(todoId, userId);
}

export function usercreatePresignedUrl(
    todoId: string): Promise<string> {
    
    return todoLogic.usercreatePresignedUrl(todoId);
}