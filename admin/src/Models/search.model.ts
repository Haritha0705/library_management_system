import type {BookModel} from "./book.model.ts";

export interface SearchResponse {
    success: boolean;
    data?: BookModel[];
}

