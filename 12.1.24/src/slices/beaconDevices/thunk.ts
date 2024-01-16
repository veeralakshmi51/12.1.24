import axios from 'axios'
import { isLoading, setErrorMessage, setIsLoadingFalse, getBeaconSuccess } from "./reducer"

const baseURL = 'http://47.32.254.89:7000/api'
const successCode = 'MHC - 0200'

export const getAllBeacon = async (dispatch: any) => {
    dispatch(isLoading());
    try {
      const response = await axios.get(`${baseURL}/getAll`);
  
      if (response.data.message.code === successCode) {
        console.log(response.data.data)
        dispatch(getBeaconSuccess(response.data.data));
      } else {
        console.log(response.data.data)
        dispatch(setErrorMessage(response.data.message.description));
      }
    } catch (error) {
      dispatch(setIsLoadingFalse());
      console.error(error);
    }
  };