import axios from 'axios';

const baseURL = 'http://47.32.254.89:7000/api'
const successCode = 'MHC - 0200'

export const secretKeyVerify = async (body: any, navigate: (p: string) => void) => {
    try {
        const response = await axios.post(`${baseURL}/user/verify`, body);

        console.log("SecretKey response:", response);

        if (response.data.message.code === successCode) {
            localStorage.setItem('authStaff', 'Verified')
            navigate('/q15-staff-configuration');
            navigate('/organization-details')
        } else {
            alert("Login failed: " + response.data.message.description);
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
    }
};