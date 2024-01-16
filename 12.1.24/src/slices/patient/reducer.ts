import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Patient{
  id:string;
}
interface PatientDetailsState{
  loading: boolean,
  patientData: Patient[],
  isOpen: boolean,
  errorMsg: string,
  patientName: {},
}
 const initialState :PatientDetailsState={
  loading: false,
  patientData: [],
  isOpen: false,
  errorMsg: "",
  patientName: {},
};

const PatientCreationSlice = createSlice({
  name: "patientData",
  initialState,
  reducers: {
    isLoading(state) {
      state.loading = true;
    },

    setIsLoadingFalse(state) {
      state.loading = false;
    },
    setErrorMessage(state, action:PayloadAction<string>) {
      state.loading = false;
      state.isOpen = true;
      state.errorMsg = action.payload;
    },

    closeErrorPopup(state) {
      state.isOpen = false;
      state.errorMsg = "";
    },

    getPatientSuccess(state, action:PayloadAction<Patient[]>) {
      state.loading = false;
      state.patientData = action.payload;
    },

    getPatientName(state, action:PayloadAction<Patient[]>) {
      state.loading = false;
      state.patientName = action.payload;
    },
    
  },
});

export const {
  isLoading,
  setIsLoadingFalse,
  setErrorMessage,
  closeErrorPopup,
  getPatientSuccess,
  getPatientName,

} = PatientCreationSlice.actions;

export default PatientCreationSlice.reducer;
