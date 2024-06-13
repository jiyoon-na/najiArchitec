import { prisma } from '../utils/prisma.util.js';
// import { HTTP_STATUS } from '../constants/http-status.constant.js';
// import { MESSAGES } from '../constants/message.constant.js';
import { HttpError } from '../errors/http.error.js';

export class ResumesRepository {
  //조회
  findManyResumes = async (authorId, sort) => {
    let data = await prisma.resume.findMany({
      //authorId, sort
      where: { authorId },
      orderBy: {
        createdAt: sort,
      },
      include: {
        author: true,
      },
    });

    data = data.map((resume) => {
      return {
        id: resume.id,
        authorName: resume.author.name,
        title: resume.title,
        content: resume.content,
        status: resume.status,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });
    return data;
  };
  //생성
  createResume = async (authorId, title, content) => {
    // const createdResume
    return await prisma.resume.create({
      data: {
        authorId,
        title,
        content,
      },
    });
    // return createdResume;
  };
  //상세조회
  findresumeById = async (authorId, id) => {
    let data = await prisma.resume.findUnique({
      where: { id: +id, authorId },
      include: { author: true },
    });
    if (!data) {
      throw new Error(HttpError.NotFound);
      // return res.status(HTTP_STATUS.NOT_FOUND).json({
      //   status: HTTP_STATUS.NOT_FOUND,
      //   message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      // });
    }
    data = {
      id: data.id,
      authorName: data.author.name,
      title: data.title,
      content: data.content,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
    console.log('repodata-->', data);
    return data;
  };
  //수정
  updateResume = async (id, authorId, title, content) => {
    let existedResume = await prisma.resume.findUnique({
      where: { id: +id, authorId },
    });
    if (!existedResume) {
      throw new Error(HttpError.NotFound);
      // return res.status(HTTP_STATUS.NOT_FOUND).json({
      //   status: HTTP_STATUS.NOT_FOUND,
      //   message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      // });
    }
    const data = await prisma.resume.update({
      where: { id: +id, authorId },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });
    return data;
  };
  //삭제
  deleteResume = async (authorId, id) => {
    let existedResume = await prisma.resume.findUnique({
      where: { id: +id, authorId },
    });
    if (!existedResume) {
      throw new Error(HttpError.NotFound);
      // return res.status(HTTP_STATUS.NOT_FOUND).json({
      //   status: HTTP_STATUS.NOT_FOUND,
      //   message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      // });
    }
    const data = await prisma.resume.delete({ where: { id: +id, authorId } });
    return data;
  };
}
