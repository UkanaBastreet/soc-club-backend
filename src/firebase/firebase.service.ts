import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import {
  Database,
  DatabaseReference,
  child,
  get,
  getDatabase,
  onValue,
  ref,
  set,
} from 'firebase/database';
import { User } from 'src/users/entities/user.entity';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyB7PlYcevSsLbzZ3veI3yURw3vplggVFmk',
  authDomain: 'soc-club.firebaseapp.com',
  databaseURL:
    'https://soc-club-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'soc-club',
  storageBucket: 'soc-club.appspot.com',
  messagingSenderId: '9491221901',
  appId: '1:9491221901:web:9503fe6eff65e39e9d41c4',
};

@Injectable()
export class FirebaseService {
  app: FirebaseApp;
  db: Database;
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getDatabase(this.app);
  }
  async createUser(user: User) {
    const users: User[] = await this.getAllUsers();
    if (users && users.find((u) => u.email === user.email))
      return new HttpException(
        'User with this email is already existed.',
        HttpStatus.BAD_REQUEST,
      );
    set(ref(this.db, 'users/' + user.id), {
      ...user,
    });
    const newUser = (await get(ref(this.db, 'users/' + user.id))).val();
    return newUser;
  }
  async getAllUsers(): Promise<User[] | any> {
    try {
      const users = Object.values((await get(ref(this.db, 'users'))).val());
      return users;
    } catch (e) {
      return e;
    }
  }
  async getByValue(key, value): Promise<User | undefined> {
    const users: User[] = await this.getAllUsers();
    if (users) {
      // const user = Object.values(users).find((u) => u[key] === value);
      const user = users.find((u) => u[key] == value);
      if (user) return user;
    }
  }
}
