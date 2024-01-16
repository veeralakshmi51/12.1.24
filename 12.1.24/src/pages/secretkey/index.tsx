import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import "react-dropdown-tree-select/dist/styles.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Image1 from '../../assets/images/Image1.png';
import { useSelector } from "react-redux";
import { secretKeyVerify } from "../../slices/secretkey/thunk";
import { useNavigate } from "react-router-dom";

const SecretKey = () => {
  const jwt = useSelector((state: any) => state.Login.jwt);
  const navigate = useNavigate()
  const [secretKey, setSecretKey] = useState("");
  const otpInputsRef = useRef<HTMLInputElement[]>([]);

  const handlePinChange = (index: number, value: string) => {
    const newSecretKey = secretKey.split("");
    newSecretKey[index] = value;
    setSecretKey(newSecretKey.join(""));
  
    // Automatically move focus to the next input
    if (index < otpInputsRef.current.length - 1 && value !== "") {
      otpInputsRef.current[index + 1].focus();
    }
  
    // If it's the last input and the value is empty, move focus to the previous input
    if (index === otpInputsRef.current.length - 1 && value === "") {
      otpInputsRef.current[index - 1].focus();
    }
  
    // If the last input is empty and not the first input, move focus to the previous input
    if (index === otpInputsRef.current.length - 1 && value === "" && index > 0) {
      otpInputsRef.current[index - 1].focus();
    }
  };
  

  const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      // Clear the current input
      const newSecretKey = secretKey.split("");
      newSecretKey[index] = "";
      setSecretKey(newSecretKey.join(""));
  
      // If not in the first input, move focus to the previous input after a small delay
      if (index > 0) {
        setTimeout(() => {
          otpInputsRef.current[index - 1].focus();
        }, 10); // Adjust the delay as needed
      }
    }
  };
  const handleVerify = () => {
    const body ={
      secretKey,
      jwt
    }
    secretKeyVerify(body,navigate)
  }
  useEffect(() => {
    const handleBackspaceGlobal = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && secretKey.length > 0) {
        const newSecretKey = secretKey.split("");
        newSecretKey[secretKey.length - 1] = "";
        setSecretKey(newSecretKey.join(""));
      }
    };

    document.addEventListener("keydown", handleBackspaceGlobal);

    return () => {
      document.removeEventListener("keydown", handleBackspaceGlobal);
    };
  }, [secretKey]);

  useEffect(() => {
    return () => {
      setSecretKey("");
    };
  }, []);


  return (
    <div className="p-grid passcode-section" style={{ background: '#fff', width:'100vw', height:'100vh' }}>
      <div className="p-col-12 p-md-7" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column', marginLeft: '-6px', height: '101%' }}>
        <img src={Image1} style={{ height: '-webkit-fill-available', marginRight: '-7px' }} alt="Passcode Image"></img>
      </div>
      <div className="p-col-12 p-md-1" id="removePadding"></div>
      <div className="p-col-12 p-md-3 passcode-secondPage d-flex flex-column justify-content-center align-item-center " id="removePadding">
        <div><span style={{ display: 'block' }} className="passCodeText">Enter your Passcode :</span></div>
        <div className=" p-4 d-flex gap-3" style={{width:'5px'}}>
          {[0, 1, 2, 3, 4, 5].map(index => (
            <input
              key={index}
              id={`pinNumber${index}`}
              type="password"
              className={`passwordText${index + 1}`}
              name="pinNumber"
              onChange={(e) => handlePinChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              maxLength={1}
              style={{ width: '40px', height: '40px', display:'flex', justifyContent:'center', alignItems:'center', border: '1px solid #0f3995', textAlign: 'center', padding: '15px', borderRadius: '8px' }}
              ref={(ref: HTMLInputElement | null) => {
                if (ref) {
                  otpInputsRef.current[index] = ref;
                }
              }}
            />
          ))}
        </div>
        <div className="buttonPasscode">
          <Button onClick={handleVerify} style={{ width: '321px', position: 'relative', fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '16px', height: '48px', backgroundColor: '#1F489F' }} label="Submit"></Button>
        </div>
        <a onClick={()=>alert('clicked')} style={{ cursor: 'pointer' }}><div className="forgotPassCode">Forgot Passcode?</div></a>
      </div>
      <div className="p-col-12 p-md-1"></div>
    </div>
  );
};

export default SecretKey;