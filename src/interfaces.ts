export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  username: string;
}

export interface IChat {
  id: string;
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    sender: IUser;
    receiver: IUser;
    content: string;
    createdAt: string;
  }[];
  users: IUser[];
}
