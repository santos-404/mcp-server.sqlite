# SQLite MCP Server

A Model Context Protocol (MCP) server implementation using TypeScript for interacting with an SQLite database. This server provides an interactive interface for executing SQL queries, managing database schemas, and synthesizing business insights—all within an extensible protocol framework.


## Features

Nothing implemented yet.


## How to install this locally?

```bash
git clone https://github.com/javsanmar5/mcp-server.sqlite.git

cd mcp-server.sqlite
```

A docker version will be add. However, now you must do this:
```bash
pnpm install
```

## How to run it?

As said, docker version will be add. However, now you must do this:

```bash
pnpm run build  # In order to build the compiled version

node dist/index.js --db-path ~/<path>/db.sqlite3
```

There are some files which need the compiled version of the server, if you are trying to run a file which doesn't you can just do:

```
npx ts-node
```

## License

This is project is licensed under the MIT License


## Contributing

I'm currently doing this with learning purposes so I think it makes no much sense to ask for contributing. But if you want to add something just make a Pull Request and I'll check it.


Thanks!
