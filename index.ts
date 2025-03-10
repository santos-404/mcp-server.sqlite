#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListRootsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { VERSION } from "./common/version.js";

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

server.setRequestHandler(ListRootsRequestSchema, async () => {
  return {
    tools: [
    ]
  }
});


async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("SQLite MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
