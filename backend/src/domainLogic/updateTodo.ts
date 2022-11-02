import { TodoUpdate } from "../models/TodoUpdate";
import { TodoDataLogic } from "../helpers/totoAccess";
import { parseUserId } from "../auth/utils";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";


// TODO: Implement userUpdateTodoLogic
const todoLogic = new TodoDataLogic();


export function userUpdateTodo(
    updateTodoRequest: UpdateTodoRequest, 
    todoId: string, 
    jwtToken: string
    ): Promise<TodoUpdate> {
        
    const userId = parseUserId(jwtToken);
    
    return todoLogic.userUpdateTodo(updateTodoRequest, todoId, userId);
}
