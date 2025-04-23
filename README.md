# SQLite MCP Server

A Model Context Protocol (MCP) server implementation using TypeScript for interacting with an SQLite database. This server provides an interactive interface for executing SQL queries, managing database schemas, and synthesizing business insights—all within an extensible protocol framework.

Not familiar with MCP? Check out the [What is an MCP?](#whats-an-mcp) section below.

## Features

| Command | Description | Example |
|---------|-------------|---------|
| `list_tables` | List all tables on the SQLite database | - |
| `read_query` | Execute SELECT queries on the SQLite database | `SELECT * FROM users WHERE age > 18` |

## Installation & Setup

```bash
git clone https://github.com/javsanmar5/mcp-server.sqlite.git
cd mcp-server.sqlite
```

Since this hasn't been published as an npm package yet, we'll focus on the Docker installation method:

### 1. Build the Docker image

```bash
docker build -t mcp/sqlite .
```

### 2. Configure your AI client

Add the following to your AI client's configuration file:

```json
"mcpServers": {
  "sqlite": {
    "command": "docker",
    "args": [
      "run",
      "--rm",
      "-i",
      "-v",
      "mcp-test:/mcp",
      "mcp/sqlite",
      "--db-path",
      "test_db.sqlite3"
    ]
  }
}
```

If you don't know what is that json file you might want to see the [Client Configuration Guide](#tutorial-setting-up-with-claude-desktop).

### 3. Restart your AI client

After restarting, the MCP Tools should be available in your AI client's interface.
_On Windows, you may need to manually kill the process for the changes to take effect._

## Documentation

### What's an MCP?

Model Context Protocol (MCP) is a standardized way for AI models to interact with external tools and services. It allows AI assistants to perform actions like running database queries, accessing external APIs, or manipulating files through a defined protocol interface.

MCPs extend AI capabilities beyond conversation by providing structured access to tools and data sources without requiring direct integration into the AI model itself.

### Tutorial: Setting up with Claude Desktop

Claude Desktop is one of many AI clients that support MCP servers. Here's how to set it up on Windows:

1. Press `Windows Key + R` to open the Run dialog
2. Type `%appdata%\Claude` and press Enter
3. Create a new file called `claude_desktop_config.json` if it doesn't exist already
4. Add the configuration from step 2 of the setup instructions above
5. Save the file and restart Claude Desktop
6. You should now see the SQLite tools available in your Claude interface

## License

This project is licensed under the MIT License.

## Contributing

This project was created primarily for learning purposes. However, if you'd like to contribute, feel free to submit a Pull Request and I'll review it.

Thanks for your interest!
