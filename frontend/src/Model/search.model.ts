export interface SearchModel {
    _id:string
    title: string,
    image: string
}

export interface SearchResponse {
    success: boolean;
    data?: SearchModel[];
}

