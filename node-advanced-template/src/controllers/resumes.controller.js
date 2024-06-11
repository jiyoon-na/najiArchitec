import { ResumesService } from "../services/resumes.service.js";
//1. 외부로 전달 : class는 대문자로 시작**
export class ResumesController { 
    resumesService = new ResumesService(); 

    //이력서 생성 api : 클라이언트에게 전달받는 데이터 있음
    createResume = async (req, res, next) => {
        try {
            const { title, content } = req.body;

            const createdResume = await this.resumesService.createResume(
                title, content
            );
            return res.status(201).json({ data: createdResume });
        }
       catch (err) {
           next(err);
       }
    }

 //이력서 조회 api : 클라이언트에게 전달받는 데이터 없음
    getResumes = async (req, res, next) => {
        try {
            //이력서들 가져옴 ; 아래에 서비스 아키텍쳐 연결되어있음
            const resumes = await this.resumesService.findAllResumes()
         
            return res.status(200).json({ data: resumes });
        }
        catch (err) {
            next(err);
        }
    }

    // --
    //이력서 한개 조회 api s 확인!
    getResume = async (req, res, next) => {
        try {
            //이력서들 가져옴 ; 아래에 서비스 아키텍쳐 연결되어있음
            const resume = await this.resumeService.findUniqueResume()
         
            return res.status(200).json({ data: resume });
        }
        catch (err) {
            next(err);
        }
    }
    // --
//수정
    updateResume = async (req, res, next) => {
        try {
            const { title, content } = req.body;
            return
        } catch (err) {
            next(err)
    }
}
    
//삭제
    deleteResume = async (req, res, next) => {
        try {
            
            return
        } catch (err) {
            next (err)
        }
    }

}