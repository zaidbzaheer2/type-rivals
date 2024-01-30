import {useState, useEffect} from "react"
export const useCountDown = (time_in_seconds)=>{
    const [time, setTime] = useState(time_in_seconds)
    const [timerOn, setTimerOn] = useState(false)
    
    useEffect(()=>{
        let timerID
        if(time>0 && timerOn){
            timerID = setInterval(()=>{
                setTime(prev_time=> prev_time -1)
                
            }, 1000)
        }
        return ()=>clearInterval(timerID)
    }, [time, timerOn])
    const getFormmatedTime = (time)=>{
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        let formatted_time = `${minutes < 10? "0" :""}${minutes}:${seconds<10? "0":""}${seconds}`
        
        return formatted_time
    }
    return [time,timerOn, setTimerOn, getFormmatedTime]

}