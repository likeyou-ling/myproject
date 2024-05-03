import { createSlice } from "@reduxjs/toolkit";
import { httpRequest } from "@/utils";
import { _setToken, _getToken } from "@/utils";

const userToken = createSlice({
  name: "user",
  initialState: {
    token: _getToken() || "",
  },
  // synchronize modify state
  reducers: {
    // setToken is action.type
    setToken(state, action) {
      state.token = action.payload;
      // avoid refresh cause redux data empty
      _setToken(action.payload);
    },
  },
});

// get actions
const { setToken } = userToken.actions;
// get reducer
const userReducer = userToken.reducer;

// asynchronize action
const fetchGetToken = (login) => {
  return async (dispatch) => {
    // sendrequest
    const res = await httpRequest.post("/authorizations", login);
    // use synchronize action
    dispatch(setToken(res.data.token));
  };
};

export { setToken, fetchGetToken };
export default userReducer;
