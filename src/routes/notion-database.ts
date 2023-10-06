import { notionClient } from "./../notion-api";
import { type HandlerRequest } from "../api/types";
import { parsePageId } from "../api/utils";
import { createResponse } from "../response";

export async function notionDatabaseRoute(req: HandlerRequest) {
  const databaseId = parsePageId(req.params.databaseId);

  const results = [];

  let result = await notionClient.databases.query({
    database_id: databaseId,
  });

  results.push(result.results);

  while (result.has_more) {
    result = await notionClient.databases.query({
      database_id: databaseId,
      start_cursor: result.next_cursor,
    });
    results.push(result.results);
  }

  return createResponse({
    ...result,
    results: results.flat(),
  });
}