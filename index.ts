import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import zodToJsonSchema from "zod-to-json-schema";
import { z } from "zod";

import { VERSION } from "./utils/version.js";
import * as types from './utils/types.js';
import { SqliteDatabase } from "./utils/SqliteDatabase.js";
import { getArgumentValue } from "./utils/parseArguments.js";

const dbPath: string | undefined = getArgumentValue("--db-path");
if (!dbPath) throw new Error("A dbpath must be specified by the argument: --db-path");

const db: SqliteDatabase = new SqliteDatabase(dbPath);

const server = new Server(
  {
    name: "sqlite-mcp-server",
    version: VERSION,
  },
  {
    capabilities: {
      tools: {},
    }
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "read_query",
        description: "Execute a SELECT query on the SQLite database",
        inputSchema: zodToJsonSchema(types.ReadQuerySchema)
      }
    ]
  }
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (!args) 
      throw new Error("Arguments are required");

    switch (name) {  // switch-case because there will be multiple options
      case "read_query": {
        const { query, params } = args as { query: string; params?: any[] };

        if (typeof query !== "string") 
          throw new Error("Invalid arguments: expected 'query' to be a string");
        if (!query.trim().toUpperCase().startsWith("SELECT")) 
          throw new Error("Only SELECT queries are allowed for read_query");

        const results = await db.executeQuery(query, params);
        return {
          content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
        };
      } 
      default:
        throw new Error(`Unknown tool: ${request.params.name}`);
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid input: ${JSON.stringify(error.errors)}`);
    }
    throw error;
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
