import { all, call } from "redux-saga/effects";
import userSagas from "./User/user.sagas";
import productsSagas from "./products/products.sagas";
// {all} mas epitrepei na kanoume Promise.all (dld parallhla na ginontai resolve ola ta saga)
// {call} enw me tin call apla kaloume ta functions

export default function* rootSaga() {
  yield all([call(userSagas), call(productsSagas)]);
}
