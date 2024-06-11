import { ResumesService } from "../../services/resumes.service.js";
//외부로 전달
export class resumesController { 
    resumesService = new ResumesService(); 
 //이력서 조회 api : 클라이언트에게 전달받는 데이터 없음
    getResumes = async (req, res, next) => {
        try {
            //이력서들 가져옴 ; 아래에 서비스 아키텍쳐 연결되어있음
            const resumes = await this.resumesService.findAllPosts()
         
            return res.status(200).json({ data: resumes });
        }
        catch (err) {
            next(err);
        }
    }

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

}