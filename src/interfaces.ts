export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  username: string;
}
export interface IMessage {
  id: string;
  sender: IUser;
  receiver: IUser;
  content: string;
  createdAt: string;
}

export interface IChat {
  id: string;
  createdAt: string;
  updatedAt: string;
  messages: IMessage[];
  userA: IUser;
  userB: IUser;
  userAId: string;
  userBId: string;
}
