import { handleSpeak } from "@/utils";
import { Card, Stack, Typography, styled } from "@mui/material";
import { useState, useEffect } from "react";

const StackStyle = styled(Stack)(({theme}) => ({
  maxWidth:"500px",
  margin:"auto",
  [theme.breakpoints.up('lg')]:{
    maxWidth:"700px",
  }
}));

const CardStyle = styled(Card)(({ theme }) => ({
  position: "relative",
  minWidth: "80px",
  minHeight: "80px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.common.black,
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  [theme.breakpoints.up('lg')]:{
    minWidth: "120px",
    minHeight: "120px",
  }
}));

const TypoStyle = styled(Typography)(({ theme }) => ({
  fontSize: "48px",
  fontWeight: "bold",
  fontFamily: "'Bebas Neue'",
  color: theme.palette.common.white,
  marginBottom:3,
  [theme.breakpoints.up('lg')]:{
    fontSize: "72px",
  }
}));

const FooterStyle = styled(Typography)(({theme}) => ({
  position:'absolute',
  bottom:5,
  color:theme.palette.common.white,
  fontSize: '12px',
  fontWeight: 'bold',
  [theme.breakpoints.up('lg')]:{
    fontSize: '16px',
  }
}));

function toTimeFormat(num: number) {
  return num.toString().padStart(2, "0");
}



export default function Clock() {
  const [isMounted, setIsMounted] = useState(false);
  const [hours, setHours] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [seconds, setSeconds] = useState<number | null>(null);
  const [alarmActivated, setAlarmActivated] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
    const interval = setInterval(() => {
      const currentTime = new Date(new Date().getTime() - 5 * 60 * 60 * 1000);
      setHours(currentTime.getHours());
      setMinutes(currentTime.getMinutes());
      setSeconds(currentTime.getSeconds());

      // Comprobamos si son las 23:46 para activar la alarma
      if (currentTime.getHours() === 5 && currentTime.getMinutes() === 30) {
        setAlarmActivated(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (alarmActivated) {
      const interval = setInterval(() => {
        handleSpeak("Es hora de levantarse!");
      }, 3000);

      return () => {
        clearInterval(interval);
        setAlarmActivated(false); // Desactivamos la alarma cuando se desmonta el componente
      };
    }
  }, [alarmActivated]);


  const handleTurnOffAlarm = () => {
    setAlarmActivated(false);
  };

  return (
    <div>
      <StackStyle direction="row" justifyContent={"space-between"}>
        {isMounted && (
          <>
            <CardStyle>
              <TypoStyle>{hours && toTimeFormat(hours as number)}</TypoStyle>
              <FooterStyle>{"hours"}</FooterStyle>
            </CardStyle>
            <CardStyle>
              <TypoStyle>{minutes && toTimeFormat(minutes as number)}</TypoStyle>
              <FooterStyle>{"minutes"}</FooterStyle>
            </CardStyle>
            <CardStyle>
              <TypoStyle>{seconds && toTimeFormat(seconds as number)}</TypoStyle>
              <FooterStyle>{"seconds"}</FooterStyle>
            </CardStyle>
          </>
        )}
      </StackStyle>
      <button onClick={handleTurnOffAlarm}>apagar alarma</button>
    </div>
  );
}