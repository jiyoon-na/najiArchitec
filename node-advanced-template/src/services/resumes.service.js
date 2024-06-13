import { ResumesRepository } from '../repositories/resumes.repository.js';

//2. service와 연결
export class ResumesService {
  resumesRepository = new ResumesRepository();
  //findManyResumes 통해 게시글 목록 조회완료
  findManyResumes = async (authorId, sort) => {
    const data = await this.resumesRepository.findManyResumes(authorId, sort);

    return data;
  };

  //생성
  createResume = async (authorId, title, content) => {
    // const createdResume =
    return await this.resumesRepository.createResume(authorId, title, content);
    // return createdResume;
    // {
    //     id: createdResume.id,
    //     authorId:createdResume.AuthorId,
    //     title: createdResume.title,
    //     content: createdResume.content,
    //     status: createdResume.status,
    //     createdAt: createdResume.createdAt,
    //     updatedAt: createdResume.updatedAt,
    // }
  };
  //1개 조회
  // const resume = await this.resumesService.findresumeById(authorId, id);
  findresumeById = async (authorId, id) => {
    console.log('serviceid-->', id);

    const data = await this.resumesRepository.findresumeById(authorId, id);
    console.log('servidata-->', data);
    return data;
    // {
    //   id: resume.id,
    //   authorId: resume.authorId,
    //   title: resume.title,
    //   content: resume.content,
    //   status: resume.status,
    //   createdAt: resume.createdAt,
    //   updatedAt: resume.updatedAt,
    // };
  };
  //수정
  updateResume = async (id, authorId, title, content) => {
    const data = await this.resumesRepository.updateResume(
      id,
      authorId,
      title,
      content,
    );
    return data;
  };
  //삭제
  deleteResume = async (authorId, id) => {
    const resume = await this.resumesRepository.findresumeById(authorId, id);

    return {
      id: resume.id,
    };
  };
}
