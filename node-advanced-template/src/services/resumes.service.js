//3. 라우터에서 컨트롤러 가져오기

import { ResumesRepository } from '../repositories/resumes.repository.js';

//2. service와 연결
export class ResumesService {
    resumesRepository = new ResumesRepository()
//findAllResumes 통해 게시글 목록 조회완
findAllResumes = async () => {
       const resumes = this.resumesRepository.findAllResumes();

        //응답
        return resumes.map((resume) => {
            return {
                title:resume.title,
                content: resume.content,
            }
        }) 
    }

    createResume = async (title, content) => {
        const createResume = await this.resumesRepository.createResume(
            title, content
        );
        return {
            title: createResume.title,
            content: createResume.content,
        }
    }
}

