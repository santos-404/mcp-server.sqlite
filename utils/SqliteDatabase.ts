import * as fs from "fs";
import * as path from "path";
import os from "os";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

export class SqliteDatabase {
  private dbPath: string;

  constructor(dbPath: string) {
     if (dbPath.startsWith("~")) {
      dbPath = path.join(os.homedir(), dbPath.slice(1));
    }
    this.dbPath = dbPath;

    const dir = path.dirname(this.dbPath);
    fs.mkdirSync(dir, { recursive: true });   
  }

  async initDatabase(): Promise<Database> {
    const db = await open({
      filename: this.dbPath,
      driver: sqlite3.Database,
    })
    return db;
  }

  // Params is there for the future.
  async executeQuery(query: string, params?: any[]): Promise<any[]> {
    const db = await this.initDatabase();

    try {
      const result = await db.all(query, params);
      return result;

    } catch (error) {
      console.error("Database error:", error);
      throw error;

    } finally {
      await db.close();
    }
  }
}
