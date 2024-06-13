import { ResumesService } from '../services/resumes.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
//1. 외부로 전달 : class는 대문자로 시작**
export class ResumesController {
  resumesService = new ResumesService();

  //이력서 생성 api : 클라이언트에게 전달받는 데이터 있음
  createResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      const { title, content } = req.body;

      const createdResume = await this.resumesService.createResume(
        authorId,
        title,
        content,
      );
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.CREATE.SUCCEED,
        data: createdResume,
      });
    } catch (err) {
      next(err);
    }
  };

  //이력서 조회 api : 서비스 가기전에 데이터 준비과정
  getResumes = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      let { sort } = req.query;

      sort = sort?.toLowerCase();

      if (sort !== 'desc' && sort !== 'asc') {
        sort = 'desc';
      }

      const data = await this.resumesService.findManyResumes(authorId, sort);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  // --
  //이력서 한개 조회 api s 확인!
  getResumeById = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      //해당경로 매개변수 전달받기
      const { id } = req.params;
      // console.log('authorId-->', authorId);
      // console.log('user-->', user);
      // console.log('id-->', id);
      //이력서들 가져옴 ; 아래에 서비스 아키텍쳐 연결되어있음
      const resume = await this.resumesService.findresumeById(authorId, id);
      console.log('resume--->', resume);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
        data: resume,
      });
    } catch (err) {
      next(err);
    }
  };
  // --
  //수정 :
  updateResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      const { title, content } = req.body;

      const updatedResume = await this.resumesService.createResume(
        authorId,
        title,
        content,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.UPDATE.SUCCEED,
        data: updatedResume,
      });
    } catch (err) {
      next(err);
    }
  };

  //삭제
  deleteResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      const { id } = req.params;

      const deletedResume = await this.resumesService.deleteResume(
        authorId,
        id,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.DELETE.SUCCEED,
        data: deletedResume,
      });
    } catch (err) {
      next(err);
    }
  };
}
