import * as bcrypt from 'bcrypt';

type IUser = {
  id?: string;
  username: string;
  password: string;
};

const users: IUser[] = [
  {
    id: 'f5e6f72f-4565-4133-a35a-4aca8bc113cf',
    username: 'OnionChicken',
    password: 'Password@1234',
  },
  {
    id: '8fde29d4-9987-423a-8752-be0fb4521a6d',
    username: 'HotNSpicy',
    password: 'Password@1234',
  },
  {
    id: 'a69357d1-7979-4dcd-af7f-c519c97e5847',
    username: 'FishFillet',
    password: 'Password@1234',
  },
];

users.map(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
  return user;
});

export const userSeed = users;
