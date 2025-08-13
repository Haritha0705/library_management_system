export interface MemberModel {
    _id: string,
    username?: string,
    email: string,
    address?: string,
    full_name?: string,
    image?: File | string;
    phone?: string;
    status: 'issued' | 'returned' | 'overdue';
}

export interface MemberResponse {
    success:boolean;
    data:MemberModel[]
}