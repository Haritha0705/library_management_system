import {Request, Response} from "express";
import memberService, {MemberService} from "../service/memberService.mjs";

class MemberControllers {

    private memberService :MemberService;

    constructor(memberService:MemberService) {
        this.memberService = memberService
    }


    getUser=(_:Request,res:Response):void=>{
        const member : string[]|null = this.memberService.getUsers(1,10);
        if (member === null){
            res.status(400).send('error')
        }
        res.status(200).json({
            data:member,
        })
    }
}

export default new MemberControllers(memberService);