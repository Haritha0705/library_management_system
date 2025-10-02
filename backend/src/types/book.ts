export interface BookBody {
    _id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    availableCopies: number;
    image:string
}

export interface BookUpdateBody {
    title?: string;
    author?: string;
    category?: string;
    description?: string;
    availableCopies?: number;
    file?: Express.Multer.File;
}

export interface BookAlreadyBorrowBody {
    memberId: string;
    bookId:string;
}

export interface BorrowHistoryBody {
    memberId: string;
}

export interface BookRes {
    success:boolean;
    status:number
    message?:string
    data?:BookBody;
}

export interface UpdateBookRes {
    success:boolean;
    status:number
    message:string
    data?:BookUpdateBody;
}
