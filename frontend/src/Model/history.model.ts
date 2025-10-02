export interface HistoryModel {
    _id: string;
    memberId: string;
    bookId: {
        _id: string;
        title: string;
        image: string;
    };
    issueDate: string;
    dueDate: string;
    status: string;
    returnDate?: string;
}

export interface HistoryResponse {
    success: boolean;
    data: HistoryModel[];
}
