export interface IApiResWithData<T> {
  success:boolean;
  message:string;
  data: T
}