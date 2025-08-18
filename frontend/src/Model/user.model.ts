export interface UserModel {
    _id:string
    image:string
    username:string
    email:string
    status:string
}

export interface UserResponse {
    success:boolean
    data?:string
}