//import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ddbClient } from "~/utils/dynamoDbConfig"
import { DynamoDBClient, GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

function createDateString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const queryDb = async () => {
    if (!process.env.TABLE_NAME) {
        console.log("no table name configured in env");
        return;
    }

    const dateString = createDateString();

    const params: GetItemCommandInput = {
        TableName: process.env.TABLE_NAME,
        Key: marshall({
            "dateString": dateString
        }),
    }

    const res = await ddbClient.send(new GetItemCommand(params));
    if (res.Item) {
        return true;
    } else {
        return false;
    }
}

export const fetchStatusRouter = createTRPCRouter({
    fetchStatus: publicProcedure
    .query(() => {
        return {
            status: queryDb(),
        };
    }),
});
