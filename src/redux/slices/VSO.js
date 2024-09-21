const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  vso: {},
  isVsoStartVisit: false,
  isVsoEndVisit: false,
  isVsoDoctorVisit: false,
  vsoStep: 0,
};

const slice = createSlice({
  name: 'vso',
  initialState,
  reducers: {
    setVsoVisit(state, action) {
      state.vso = action.payload;
    },
    setVsoStartVisit(state, action) {
      // console.log('action', action.payload);
      state.isVsoStartVisit = action.payload;
    },
    setVsoEndVisit(state, action) {
      state.isVsoEndVisit = action.payload;
    },
    setVsoDoctorVisit(state, action) {
      state.isVsoDoctorVisit = action.payload;
    },
    setVsoStep(state, action) {
      state.vsoStep = action.payload;
    },

    clearVso(state, action) {
      state.vso = {};
      state.isVsoStartVisit = false;
      state.isVsoEndVisit = false;
      state.isVsoDoctorVisit = false;
      state.vsoStep = 0;
    },
  },
});

export const {
  setVsoVisit,
  setVsoStartVisit,
  setVsoEndVisit,
  setVsoDoctorVisit,
  setVsoStep,
  clearVso,
} = slice.actions;
export default slice.reducer;
