import React, {useState} from 'react';
import type {BookModel} from "../Admin/book.model.ts";


const AddBook:React.FC = () => {
    const [data,setData] = useState<BookModel>({
        title:"",
        author:"",
        category:"",
        description:"",
        availableCopies:"",
        image: ""
    })
    return (
        <div>
            <h1>Add Book</h1>
        </div>
    );
};

export default AddBook;