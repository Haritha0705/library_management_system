export interface UserModel {
    _id:string
    image:string
    username:string
    email:string
    status:string
    phone?:string
    full_name?:string
    address?:string
    createdAt?:string
    updatedAt?:string
}

export interface UserResponse {
    success:boolean
    data?:string
}

export interface UserUpdateResponse {
    success:boolean
    updatedProfile?:UserModel
}

