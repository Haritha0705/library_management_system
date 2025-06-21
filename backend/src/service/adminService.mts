export class AdminService{

    getUsers=(page:number,size:number):string[]|null=>{
        return ['admin1','admin2'];
    }
}

export default new AdminService();