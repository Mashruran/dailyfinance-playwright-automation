export interface UserModel{ //object type declare through interface
    firstName:string,
    lastName?:string,
    email:string,
    password:string,
    phoneNumber:string,
    address?:string
}