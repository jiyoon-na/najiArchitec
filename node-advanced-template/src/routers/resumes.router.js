import express from 'express';
// import { HTTP_STATUS } from '../constants/http-status.constant.js';
// import { MESSAGES } from '../constants/message.constant.js';
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
// import { prisma } from '../utils/prisma.util.js';
import { updateResumeValidator } from '../middlewares/validators/updated-resume-validator.middleware.js';
// 2. ResumesController를 인스턴스화 시킴 :export로 받아온 이름과 일치
import { ResumesController } from '../controllers/resumes.controller.js';

const resumesRouter = express.Router();
//3. class사용해서 인스턴스 만들 때 새로운 인스턴스로 만들고, 인스턴스 받은 변수이름은 소문자로
const resumesController = new ResumesController();
//기존 코드 옮기며 어디서 어떻게 가져왔는지, 리턴 잊지않기
// 이력서 생성
//이게 맞나..? 만약 이 주소로 요청이 오면 resumesController에 있는 createResume 실행
resumesRouter.post(
  '/',
  resumesController.createResume,
  createResumeValidator,

  // try {
  //   const user = req.user;
  //   const { title, content } = req.body;
  //   const authorId = user.id;
  //   const data = await prisma.resume.create({
  //     data: {
  //       authorId,
  //       title,
  //       content,
  //     },
  //   });
  //   return res.status(HTTP_STATUS.CREATED).json({
  //     status: HTTP_STATUS.CREATED,
  //     message: MESSAGES.RESUMES.CREATE.SUCCEED,
  //     data,
  //   });
  // } catch (error) {
  //   next(error);
  // }
);
// 이력서 목록 조회
resumesRouter.get(
  '/',
  resumesController.getResumes,
  // try {
  //   const user = req.user;
  //   const authorId = user.id;

  //   let { sort } = req.query;

  //   sort = sort?.toLowerCase();

  //   if (sort !== 'desc' && sort !== 'asc') {
  //     sort = 'desc';
  //   }

  //   let data = await prisma.resume.findMany({
  //     where: { authorId },
  //     orderBy: {
  //       createdAt: sort,
  //     },
  //     include: {
  //       author: true,
  //     },
  //   });

  //   data = data.map((resume) => {
  //     return {
  //       id: resume.id,
  //       authorName: resume.author.name,
  //       title: resume.title,
  //       content: resume.content,
  //       status: resume.status,
  //       createdAt: resume.createdAt,
  //       updatedAt: resume.updatedAt,
  //     };
  //   });

  //   return res.status(HTTP_STATUS.OK).json({
  //     status: HTTP_STATUS.OK,
  //     message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
  //     data,
  //   });
  // } catch (error) {
  //   next(error);
  // }
);

// 이력서 상세 조회
resumesRouter.get(
  '/:id',
  resumesController.getResumeById,

  // try {
  //   const user = req.user;
  //   const authorId = user.id;
  //   const { id } = req.params;

  //   let data = await prisma.resume.findUnique({
  //     where: { id: +id, authorId },
  //     include: { author: true },
  //   });
  //   if (!data) {
  //     return res.status(HTTP_STATUS.NOT_FOUND).json({
  //       status: HTTP_STATUS.NOT_FOUND,
  //       message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
  //     });
  //   }
  //   data = {
  //     id: data.id,
  //     authorName: data.author.name,
  //     title: data.title,
  //     content: data.content,
  //     status: data.status,
  //     createdAt: data.createdAt,
  //     updatedAt: data.updatedAt,
  //   };
  //------
  //   return res.status(HTTP_STATUS.OK).json({
  //     status: HTTP_STATUS.OK,
  //     message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
  //     data,
  //   });
  // } catch (error) {
  //   next(error);
  // }
);

// 이력서 수정
resumesRouter.put(
  '/:id',
  resumesController.updateResume,
  updateResumeValidator,
  //async (req, res, next) => 는 컨트롤러의 updateResume가 그역할을 해주므로 없어도됨

  // try {
  //   const user = req.user;
  //   const authorId = user.id;
  //   const { id } = req.params;
  //   const { title, content } = req.body;

  //   let existedResume = await prisma.resume.findUnique({
  //     where: { id: +id, authorId },
  //   });
  //   if (!existedResume) {
  //     return res.status(HTTP_STATUS.NOT_FOUND).json({
  //       status: HTTP_STATUS.NOT_FOUND,
  //       message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
  //     });
  //   }
  //   const data = await prisma.resume.update({
  //     where: { id: +id, authorId },
  //     data: {
  //       ...(title && { title }),
  //       ...(content && { content }),
  //     },
  //   });
  //   return res.status(HTTP_STATUS.OK).json({
  //     status: HTTP_STATUS.OK,
  //     message: MESSAGES.RESUMES.UPDATE.SUCCEED,
  //     data,
  //   });
  // } catch (error) {
  //   next(error);
  // }
);

// 이력서 삭제
resumesRouter.delete(
  '/:id',
  resumesController.deleteResume,

  // try {
  //   const user = req.user;
  //   const authorId = user.id;
  //   const { id } = req.params;

  //   let existedResume = await prisma.resume.findUnique({
  //     where: { id: +id, authorId },
  //   });
  //   if (!existedResume) {
  //     return res.status(HTTP_STATUS.NOT_FOUND).json({
  //       status: HTTP_STATUS.NOT_FOUND,
  //       message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
  //     });
  //   }
  //   const data = await prisma.resume.delete({ where: { id: +id, authorId } });
  //   return res.status(HTTP_STATUS.OK).json({
  //     status: HTTP_STATUS.OK,
  //     message: MESSAGES.RESUMES.DELETE.SUCCEED,
  //     data: { id: data.id },
  //   });
  // } catch (error) {
  //   next(error);
  // }
);

export { resumesRouter };
