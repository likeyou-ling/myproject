import { createSlice } from "@reduxjs/toolkit";
import { _setToken, _getToken } from "@/utils";
import { _removeToken } from "@/utils";
import { getUserInfoAPI, getLoginAPI } from "@/apis/user";

const userInfo = createSlice({
  name: "user",
  initialState: {
    token: _getToken() || "",
    userInfo: {},
  },
  // synchronize modify state
  reducers: {
    // setToken is action.type
    setToken(state, action) {
      state.token = action.payload;
      // avoid refresh cause redux data empty
      _setToken(action.payload);
    },
    // get user info
    fetchUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    // clear user info
    clearUserInfo(state, action) {
      state.userInfo = {};
      state.token = "";
      _removeToken();
    },
  },
});

// get actions
const { setToken, fetchUserInfo, clearUserInfo } = userInfo.actions;
// get reducer
const userReducer = userInfo.reducer;

// asynchronize action
const fetchGetToken = (login) => {
  return async (dispatch) => {
    // sendrequest
    const res = await getLoginAPI(login);
    // use synchronize action
    dispatch(setToken(res.data.token));
  };
};

const fetchUserInfoAsync = () => {
  return async (dispatch) => {
    // sendrequest
    const res = await getUserInfoAPI();
    // use synchronize action
    dispatch(fetchUserInfo(res.data));
  };
};

export { setToken, fetchGetToken, fetchUserInfoAsync, clearUserInfo };
export default userReducer;
