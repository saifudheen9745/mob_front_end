export interface IAdminProductList {
  id:number;
  name:string;
  image:string;
  category:number;
  quantity:number;
  disabled:boolean;
  price:number;
  description:string;
}

export interface IAdminProductCreateFormData {
  name:string;
  price:string;
  description:string;
  category:string | null;
  disabled:boolean;
  quantity:string;
}