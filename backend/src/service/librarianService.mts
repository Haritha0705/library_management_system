export class LibrarianService {

    getUsers=(page:number,size:number):string[]|null=>{
        return ['librarian1','librarian2'];
    }
}

export default new LibrarianService();