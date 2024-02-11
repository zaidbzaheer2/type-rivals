import { useRef, useState, useEffect } from "react"
import styled, {keyframes} from 'styled-components'
import "./AudioMap.css"
import narrator_icon from "/src/assets/speaker.png"
import { useCountDown } from "../../Hooks"
import { TrackInput } from "../TrackInput/TrackInput"
import { RaceStats } from "../RaceStats/RaceStats"
const VOLUME_KEY="volume@typerivals"
export const AudioMap = ({paragraph,audioLink,startRace, trackDuration})=>{
    const audioRef = useRef()
    const [input, setInput] = useState("")
    const [correct, setCorrect] = useState(true)
    const [raceTime, raceTimerOn, resetRaceTimer, setRaceTimerOn, getRaceFormattedTime] = useCountDown(trackDuration)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [raceFinsihed, setRaceFinsihed] = useState(false)
    const [volume, setVolume] = useState(()=>{
        const vol = localStorage.getItem(VOLUME_KEY)
        if(vol)
            return vol
        return 50
    })
    const ToggleAudio = ()=>{
        if(!isPlaying){
            audioRef.current.play()
        } else{
            audioRef.current.pause()
        }
        setIsPlaying(prev=>!prev)
    }
    useEffect(()=>{
        if(startRace){
            setRaceTimerOn(prev=>true)
        }
    }, [startRace])
    useEffect(()=>{
        if(raceTime<=0 && !raceTimerOn){
            setRaceFinsihed(prev=>true)
            console.log("Finished")
        }
    }, [raceTime, raceTimerOn])
    
    const handleVolumeChange = useEffect(()=>{
        audioRef.current.volume = volume/100
        localStorage.setItem(VOLUME_KEY, volume)
    }, [volume])
    const fadeInOut = keyframes`
    0%{
        opacity:1
    }
    50%{
        opacity:0.2
    }
    100%{
        opacity:1
    }
    `;
    const FadingDiv = styled.div`animation:${isPlaying?fadeInOut:null} 2s linear infinite`;
    const handleDurationChange = ()=>{
        if(audioRef){
            const progressedTrackDuration = (audioRef.current.currentTime/audioRef.current.duration) * 100
            setCurrentTime(prev=>progressedTrackDuration)
        
            if(progressedTrackDuration === 100){
                setIsPlaying(prev=>false)
            }
        } 
    }
    useEffect(()=>{
        if(audioRef && audioRef.current){
        audioRef.current.addEventListener('timeupdate', handleDurationChange)
        }
        return ()=>{
            if(audioRef && audioRef.current)
            audioRef.current.removeEventListener('timeupdate', handleDurationChange)
        }
    },[])
 
    return <div className="audio-map-container w-full relative">
        <RaceStats input={input} paragraph={paragraph} time={trackDuration - raceTime} raceFinisihed={raceFinsihed}/>
        <div className="timer absolute right-[3rem] top-[0rem] web-text text-md font-semibold">{getRaceFormattedTime(raceTime)}</div>
        <div className="audio-box w-[90%] mx-auto max-w-[45rem] h-[10rem] rounded-xl web-foreground">
            <audio ref={audioRef} src={audioLink}  type="audio/mp3">
            
            </audio>
            <div className="visual-audio flex flex-col rounded-l p-3 bg-blue-950 items-center justify-between h-full w-[50%] min-w-[20rem] float-left">
                <FadingDiv className="icon-flash">
                    <img src={narrator_icon} className="narrator-icon w-[100px] h-[100px]" />    
                </FadingDiv>
                <div className="duration-area relative">
                    <p className="web-icon text-sm absolute left-[-2.6rem] top-[6px]">{audioRef?.current? getRaceFormattedTime(audioRef.current.currentTime):0}</p>
                    <p className="web-icon text-sm absolute right-[-2.6rem] top-[6px]">{audioRef?.current? getRaceFormattedTime(audioRef.current.duration): 0}</p>     
                    <input id="duration-control" className="w-[10rem]" type="range" min={0} max={100} value={currentTime} readOnly/>
                </div>
            </div>
            <div className="playback-controls flex flex-col items-center justify-between p-3 h-full w-[50%] float-right">
                <button onClick={ToggleAudio} id="playback-control" className={"fa-solid mt-[3rem] fa-2xl audio-btn " + (isPlaying? "fa-pause":"fa-play")}></button>
                <div className="volume-area relative" >
                    <i className="absolute web-icon fa-solid fa-volume-high left-[-2rem] top-[8px]"></i>
                    <input id="volume-control" className="w-[10rem]" type="range" min={0} max={100} value={volume} onChange={e=>setVolume(e.target.value)}/>
                </div>
            </div>
        </div>
        <div className="input-area  w-full max-w-[40rem] mx-auto mt-5 relative">
            <TrackInput input={input} setInput={setInput} raceFinished={raceFinsihed} paragraph={paragraph} setCorrect={setCorrect} setRaceFinished={setRaceFinsihed}/>
            <p className={"absolute right-[0rem] fa-solid "+(correct?"text-green-600 fa-circle-check":"text-red-500 fa-circle-xmark")}></p>
        </div>
    </div>
}