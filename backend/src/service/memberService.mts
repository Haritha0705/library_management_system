export class MemberService {

    getUsers=(page:number,size:number):string[]|null=>{
        return ['user1','user2'];
    }
}

export default new MemberService();