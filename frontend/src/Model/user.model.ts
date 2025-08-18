export interface UserModel {
    _id:string
    image:string
    username:string
    email:string
    status:string
    phone?:string
    full_name?:string
    address?:string
}

export interface UserResponse {
    success:boolean
    data?:string
}