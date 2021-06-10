import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { createAction, handleActions } from "redux-actions";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";
import { finishLoading, startLoading } from "./loading";
import createRequstSaga from "../lib/createRequestSaga";

//액션타입 생성
//한 요청당 세 개를 만들어야함

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

//thunk 함수를 생성
//thunk 함수내부에서는 시작할 때 , 성공 , 실패 해ㅆ을떄 다른 액션을 디스패치함

// export const getPost = createRequestThunk(GET_POST, api.getPost);
// export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

//리덕스 사가 생성함수
export const getPost = createRequstSaga(GET_POST, api.getPost);
export const getUsers = createRequstSaga(GET_USERS, api.getUsers);

// export const getPost = (id) => async (dispatch) => {
//   dispatch({ type: GET_POST });
//   try {
//     const response = await api.getPost(id);
//     dispatch({
//       type: GET_POST_SUCCESS,
//       payload: response.data,
//     }); //요청 성공
//   } catch (e) {
//     dispatch({
//       type: GET_POST_FAILURE,
//       payload: e,
//       error: true,
//     }); //Error발생
//     console.log(e);
//     throw e; // 나중에 컴포넌트 단에서 에러를 조회할 수 있게 해 줌
//   }
// };

// export const getUsers = (id) => async (dispatch) => {
//   dispatch({ type: GET_USERS }); //요청을 시작한 것을 알림
//   try {
//     const response = await api.getUsers();
//     dispatch({
//       type: GET_USERS_SUCCESS,
//       payload: response.data,
//     }); //요청 성공
//   } catch (e) {
//     dispatch({
//       type: GET_USERS_FAILURE,
//       payload: e,
//       error: true,
//     }); //Error 발생
//     console.log(e);
//     throw e; //컴포넌트단에서 확인
//   }
// };

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

//초기 상태를 선언함
//요청의 로딩 중 상ㅌ태는 loading이라는 객체에서 관리

const initialState = {
  post: null,
  users: null,
};

const sample = handleActions(
  {
    // [GET_POST]: (state) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_POST: true, // 요청시작
    //   },
    // }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    // [GET_POST_FAILURE]: (state, action) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_POST: false, //요청 완료
    //   },
    // }),
    // [GET_USERS]: (state) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USERS: true, // 요청시작
    //   },
    // }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
    // [GET_USERS_FAILURE]: (state, action) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USERS: false, // 요청완료
    //   },
    // }),
  },
  initialState
);

export default sample;
