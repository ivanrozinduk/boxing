import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface JanovianDB extends DBSchema {
  users: {
    key: string;
    value: {
      id: string;
      email: string;
      name: string;
      password: string;
      role: 'USER' | 'ADMIN';
      emailVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    indexes: { 'by-email': string };
  };
  profiles: {
    key: string;
    value: {
      id: string;
      userId: string;
      bio?: string;
      avatar?: string;
      goals: string[];
      experienceLevel?: string;
    };
  };
  journals: {
    key: string;
    value: {
      id: string;
      userId: string;
      title: string;
      content: string;
      tags: string[];
      favorite: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
    indexes: { 'by-user': string };
  };
  workouts: {
    key: string;
    value: {
      id: string;
      userId: string;
      type: string;
      duration: number;
      notes?: string;
      createdAt: Date;
    };
    indexes: { 'by-user': string };
  };
}

let db: IDBPDatabase<JanovianDB>;

export async function initDB() {
  db = await openDB<JanovianDB>('janovian-db', 1, {
    upgrade(db) {
      // Users store
      const userStore = db.createObjectStore('users', { keyPath: 'id' });
      userStore.createIndex('by-email', 'email', { unique: true });

      // Profiles store
      db.createObjectStore('profiles', { keyPath: 'id' });

      // Journals store
      const journalStore = db.createObjectStore('journals', { keyPath: 'id' });
      journalStore.createIndex('by-user', 'userId');

      // Workouts store
      const workoutStore = db.createObjectStore('workouts', { keyPath: 'id' });
      workoutStore.createIndex('by-user', 'userId');
    },
  });

  return db;
}

export async function getDB() {
  if (!db) {
    await initDB();
  }
  return db;
}