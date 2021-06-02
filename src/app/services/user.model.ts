export class User {
  firstName: string;
  lastName: string;
  dateCreated: string;
  username: string;
  id: string;
  roles: Roles[];
}

export class Roles {
  id: string;
  roleName: string;
}
