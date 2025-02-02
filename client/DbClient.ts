import sqlite3 from 'sqlite3';
import fs from 'fs';
import { DB_INIT_QUERY } from '../config/dbInit';

class DbClient {
    private static instance: DbClient;
    private db: sqlite3.Database | null = null;

    private constructor() { }

    private async connect(databaseFilePath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(databaseFilePath, (err) => {
                if (err) {
                    console.error('Failed to connect to the database:', err.message);
                    reject(err);
                } else {
                    console.log(`Connected to SQLite database: ${databaseFilePath}`);
                    resolve();
                }
            });
        });
    }

    // Get the singleton instance of the DbClient
    public static async getInstance(): Promise<DbClient> {
        const databaseFilePath = process.env.DB_PATH || './default-database.sqlite'; // Use environment variable or fallback


        if (!DbClient.instance) {
            DbClient.instance = new DbClient();
            await DbClient.instance.connect(databaseFilePath);
            // Create tables if they don't exist
            // we already have init.sql file to create tables
            // const initSql = await fs.promises.readFile('config/init.sql', 'utf-8');
            // await DbClient.instance.run(initSql);
            await DbClient.instance.init();
        }

        return DbClient.instance;
    }

    // Run a SQL query
    public run(sql: string, params: any[] = []): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new Error('Database connection is not established.'));
            }

            this.db.run(sql, params, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    // Fetch all rows from a SQL query
    public all<T = any>(sql: string, params: any[] = []): Promise<T[]> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new Error('Database connection is not established.'));
            }

            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows as T[]);
            });
        });
    }

    // Fetch a single row from a SQL query
    public get<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(new Error('Database connection is not established.'));
            }

            this.db.get(sql, params, (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row as T | undefined);
            });
        });
    }

    // Close the database connection
    public close(): void {
        if (this.db) {
            this.db.close((err) => {
                if (err) {
                    console.error('Failed to close the database connection:', err.message);
                } else {
                    console.log('Database connection closed.');
                }
            });
            this.db = null;
        }
    }
    private async init(): Promise<void> {

        for (const key of Object.keys(DB_INIT_QUERY) as Array<keyof typeof DB_INIT_QUERY>) {
            await this.run(DB_INIT_QUERY[key]);
        }
    }
}

export default DbClient;
