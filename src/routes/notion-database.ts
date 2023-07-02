import { notionClient } from "./../notion-api";
import { type HandlerRequest } from "../api/types";
import { parsePageId } from "../api/utils";
import { createResponse } from "../response";

export async function notionDatabaseRoute(req: HandlerRequest) {
  const databaseId = parsePageId(req.params.databaseId);

  const result = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: "published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "published_at",
        direction: "descending",
      },
    ],
  });

  return createResponse(result);
}
