import { useRef, useState } from "react";
import { Button } from "./button";

export const Otp = ({number}) => {

        const ref = useRef(Array(number).fill(0));
        const [disabled, setDisabled] = useState(true);


    return <div className="flex justify-center">
        
        {Array(number).fill(1).map((x,index) => <SubOtpBox reference = {(e) => ref.current[index] = e } key={index} onDone={()=>{
            if( index + 1 >= number){
                return
            }
            ref.current[index + 1].focus();
        }} onBack={()=>{
            if(index == 0){
                return
            }
            ref.current[index -1].focus()
        }}></SubOtpBox>)}
        
        <Button disabled={disabled}>Signup</Button>
    </div>
}

function SubOtpBox ({
    reference,
    onDone,
    onBack
}){

    const [inputBoxVal,setInputBoxVal] = useState("")

    return <div>
        <input value= {inputBoxVal} ref={reference} onKeyUp={(e)=>{
            if(e.key =="Backspace"){
                onBack();
            }
        }} onChange={(e)=>{
            const val = e.target.value
            if( val == "1" || val == "2" || val == "3" || val == "4" || val == "5" || val == "6" || val == "7" || val == "8" || val == "9" || val == "0"){
                setInputBoxVal(val);
                onDone();
            }else {

            }
        }} type="text" className="w-[40px] h-[50px] rounded-2xl bg-[#183e6a] m-1 outline-none text-white px-4"></input>
    </div>
}