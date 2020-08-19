export type State = {
  [key: string]: any;
};
export type UserType = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  _v: number;
};
export type ProjectType = {
  _id: string;
  devs: string[];
  title: string;
  status: string;
  rate: string;
  __v: number;
};
export type DispatchType = {
  type: string;
  [key: string]: any;
};
