import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useReducer } from 'react';
import ScatterComponent from './components/ScatterComponent';
import { useCallback } from "react";
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";
import { ToggleButton } from '@mui/material';
import { useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';



const reducer = (state, action) => {
  switch (action.type){
    case 'setDay':
      return {...state, day: action.payload};
    case 'setMonth':
      return {...state, month: action.payload+1 };
    case 'setYear':
      return {...state, year: action.payload};

    case 'setLuckyNumber':
      return {...state, luckyNumber: state.day * state.month * state.year};

    case "howOld":
      return {...state, age: new Date().getFullYear() - state.year  };

    case "setData":
      var xArr=[]
      for(let i=1; i <= state.luckyNumber?.toString().split("").length;i++){
        xArr.push(i)
      }
      return {...state, data: {
        y:state.luckyNumber?.toString().split("").map(Number),
        x:xArr
      }
      }

    
    default:
      return state;
  }
}


function DateComponent() {

  const [state, dispatch] = useReducer(reducer, {day: 0, month: 0, year: 0, luckyNumber: 0, age: 0});
  const [selected, setSelected] = useState(false);

  const handleDateChange = (date) => {

    dispatch({type: 'setDay', payload: date['$D']});
    dispatch({type: 'setMonth', payload: date['$M']});
    dispatch({type: 'setYear', payload: date['$y']});
    dispatch({type: 'setLuckyNumber'});
    dispatch({type: 'howOld'});
    dispatch({type: 'setData'});

  };

  const particlesInit = useCallback(async engine => {

    await loadFull(engine);
}, []);
const particlesLoaded = useCallback(async container => {
  await console.log(container);
}, []);
  
  


  return (
    <>
      <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#FFD9D9",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 2,
                        },
                        repulse: {
                            distance: 100,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#BE1E28",
                        distance: 150,
                        enable: true,
                        opacity: 0.1,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 3,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.3,
                    },
                    shape: {
                      type: "image",
                      image: {
                        src: "https://static.vecteezy.com/system/resources/previews/010/329/885/original/doodle-love-heart-free-png.png", // Replace with the path to your heart image
                      },
                    },
                    size: {
                        value: { min: 12, max: 15 },
                    },
                },
                detectRetina: true,
            }}
        />
      <CssBaseline />
      <Box 
       sx={{
         height: '100vh',
        color: '#E74646',
        width: "100vw",
        fontSize: 16,
        fontWeight: 600,
        position: "relative",
       }}
       >      
          <Box
            sx={{
              paddingY: 6,          
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
            }}
          >
            <DatePicker label="Select birth date" 
            style={{color: "#BE1E28"}}
  onChange={handleDateChange} />          
          </Box>     
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              zIndex: 2,
              width: '100%',
              flexWrap: 'wrap',
              marginBottom: 3,
            }}
          >
            <p>Month {state.month}</p>
            <p>Day {state.day}</p>
            <p>Year {state.year}</p>
            <p>Age {state.age}</p>
          
            
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2,
            }}
          >

          {
            state.data && 
            (
              <>
              <ScatterComponent data={state.data} age={state.age} />

              <Box sx={{display:"flex"}}>

              <ToggleButton
              sx={{border: 'none'}}
              value="check"
              selected={selected}
              onChange={() => {
    setSelected(!selected);
  }}
>
  <InfoOutlinedIcon sx={{ color:"#E74646"}}/>
  </ToggleButton>
      {
        selected &&
        <h3 style={{padding:"0 2rem" ,fontWeight:"100"}}>Here is the graphic that describes your love life by your lifetime
        <br/>
        x axis: your age
        <br/>
        y axis: your love life
        </h3>
      }
          </Box>
              </>
              )
          }
       
          </Box>          

        

      </Box>
    </>
  );
}

export default DateComponent;
