export class Role {
  id: string;
  name: string;
  description: string;
  dateCreated: string;
  users: Users[];
}

export class Users{
  id: string;
  userName: string;
}
