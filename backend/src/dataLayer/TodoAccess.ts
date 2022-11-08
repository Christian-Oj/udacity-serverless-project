import * as AWS from "aws-sdk";
import { TodoUpdate } from "../models/TodoUpdate";
import { Types } from 'aws-sdk/clients/s3';
import { TodoItem } from "../models/TodoItem";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

// TODO: Implement the dataLayer logic

export class TodoDataLogic {
    constructor(
        private readonly bucketClient: Types = 
            new XAWS.S3({ signatureVersion: 'v4' }),
        private readonly todoTable = 
            process.env.DYNAMODB_TODOS_TABLE,
        private readonly dynamoDocClient: DocumentClient = 
            new XAWS.DynamoDB.DocumentClient(),
        private readonly awsBucketStorage = process.env.TODO_AWS_BUCKET) {
    }

    async getTodoForUser(userId: string): Promise<TodoItem[]> {

        const attrExpressionValue = {":userId": userId};

        const attrExpressionName = {"#userId": "userId"};

        const keys = "#userId = :userId";

        const paramPayload = {
            TableName: this.todoTable,
            KeyConditionExpression: keys,
            ExpressionAttributeNames: attrExpressionName,
            ExpressionAttributeValues: attrExpressionValue
        };

        const res = 
            await this.dynamoDocClient.query(
                paramPayload
            ).promise();

        console.log(`Get User result: ${res}`);

        const items = res.Items;

        return items as TodoItem[];
    }

    async createTodoForUser(todoItem: TodoItem): 
        Promise<TodoItem> {

        const paramPayload = {
            TableName: this.todoTable, 
            Item: todoItem,
        };

        const res = 
            await this.dynamoDocClient.put(
                paramPayload
            ).promise();

        console.log(`Create User result: ${res}`);

        return todoItem as TodoItem;
    }

    async updateTodoForUser(
        todoUpdate: TodoUpdate, 
        todoId: string, 
        userId: string
        ): Promise<TodoUpdate> {

        const keys =  {
            "userId": userId,
            "todoId": todoId
        };

        const attrExpressionValue = {
            ":a": todoUpdate['name'],
            ":b": todoUpdate['dueDate'],
            ":c": todoUpdate['done']
        };

        const attrExpressionName = {
            "#a": "name",
            "#b": "dueDate",
            "#c": "done"
        };

        const paramPayload = {
            TableName: this.todoTable,
            Key:keys,
            UpdateExpression: "set #a = :a, #b = :b, #c = :c",
            ExpressionAttributeNames: attrExpressionName,
            ExpressionAttributeValues: attrExpressionValue,
            ReturnValues: "ALL_NEW"
        };

        const res = 
            await this.dynamoDocClient.update(paramPayload).promise();

        console.log(`Update result: ${res}`);

        const attributes = res.Attributes;

        return attributes as TodoUpdate;
    }

    async deleteTodoForUser(
        todoId: string, 
        userId: string): 
        Promise<string> {

        const keys = {
            "userId": userId,
            "todoId": todoId
        };

        const paramPayload = {
            TableName: this.todoTable,
            Key: keys,
        };

        const res = 
            await this.dynamoDocClient.delete(paramPayload).promise();

        console.log(`Delete result: ${res}`);

        return "" as string;
    }

    async createPresignedUrl(
        todoId: string): 
        Promise<string> {

        const url = this.bucketClient.getSignedUrl(
            'putObject', {
                Bucket: this.awsBucketStorage,
                Key: todoId,
                Expires: 1000,
            }
        );

        console.log(`SignedURL result: ${url}`);

        return url as string;
    }
}
