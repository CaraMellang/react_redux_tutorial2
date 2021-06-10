const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action && action.type); //액션타입으로 log를 그룹화
  console.log("이전상태", store.getState());
  console.log("액션", action);
  next(action); //다음 미들웨어 혹은 리듀서에게 전달
  console.log("다음상태", store.getState()); //업데이트 된 상태
  console.groupEnd(); //그룹 끝
  //미들웨어 기본구조
};

export default loggerMiddleware;

// const loggerMiddleware = function loggerMiddleware(store){
//     return function(next){
//         return function(action){
//             //기본구조
//         }
//     }
// }  funtion으로 하면 이런구조
