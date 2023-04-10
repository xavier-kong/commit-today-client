//import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ddbClient } from "~/utils/dynamoDbConfig"
import { DynamoDBClient, GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const queryDb = async () => {
    if (!process.env.TABLE_NAME) {
        console.log("no table name configured in env");
        return;
    }

    const params: GetItemCommandInput = {
        TableName: process.env.TABLE_NAME,
        Key: marshall({
            "dateString":
        }),
    }

    const res = await ddbClient.send(new GetItemCommand(params));
    if (res.Item) {

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
