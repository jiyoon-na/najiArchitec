read me
실제 기록할 것





--
1. 라우터 기본구조
2. 컨트롤러와 연결

3. 라우터에서 컨트롤러 가져오기

& 인스턴스 생성 : 인스턴스화에서 가져온 컨트롤러를 새로 생성한 걸 담기)

라우터.메서드(주소) 기본생성 먼저하기
---기본작업 끝---

4. 컨트롤러 게시글 api틀 만들기 

5. 라우터 에 컨트롤러에서 만든 api 넣기

6. 컨트롤러 api 구현
   게시글 조회 : 클라이언트 받는 데이터 없음
   게시글 생성 : 클라이언트 받는 데이터 있음
: 에러 처리 ; 주요 app.js 에 있는 에러 핸들러 확인 : 에러전달)
: 게시글 = await 서비스 가져오기.찾기(게시글을)

7. 서비스 export 
8. 컨트롤러 서비스 import 하고 인스턴스 생성
9. 컨트롤러 가 서비스 계층 : 사용할 수 있게 멤버변수의 postsService 에 this 넣기 + 응답
10. 컨트롤러 : 생성 = 특정 데이터 전달

--
내가 보려고 만든 리드미 
: 작성이유 계층 아키텍쳐 적응..

상황 : 기존 라우터 분해 해서 계층 아키텍쳐 적용

1. 라우터 기본구조
import express from 'express'
const router = express.Router()
export default router;

2. 컨트롤러와 연결
export class PostController {

}

3. 라우터에서 컨트롤러 가져오기
import {PostController} from '../컨트롤러 파일위치.js'
& 인스턴스 생성 : 인스턴스화 (import {PostController}에서 가져온
컨트롤러를 새로 생성한 걸 postController에 담기)
const postController = new PostController
라우터.메서드(주소) 기본생성 먼저하기
---기본작업 끝---

4. 컨트롤러 게시글 api틀 만들기 
getPosts = async (req, res, next)=> { }
5. 라우터 에 컨트롤러에서 만든 api 넣기
router.get(주소, 컨트롤러에 있는.조회메서드);

6. 컨트롤러 api 구현
   게시글 조회 : 클라이언트 받는 데이터 없음
   게시글 생성 : 클라이언트 받는 데이터 있음
: 에러 처리 ; 주요 app.js 에 있는 에러 핸들러 확인 : 에러전달)

try {} catch (err) {
next(err)
}
: 게시글 = await 서비스 가져오기.찾기(게시글을)

7. 서비스 export 
8. 컨트롤러 서비스 import 하고 인스턴스 생성
9. 컨트롤러 가 서비스 계층 : 사용할 수 있게 멤버변수의 postsService 에 this 넣기 + 응답
10. 컨트롤러 : 생성 = 특정 데이터 전달
    const {data} = req.body
    서비스 데이터 또한 생성해야함. 생성된 데이터를 변수에 할당
    변수 = await this.포스터서비스에 있는 createPost사용 (받은 데이터 넣기) + 응답



