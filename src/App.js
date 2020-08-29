import React,{useEffect, useRef, useState} from 'react';
import './App.css';


function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false);
  const [allowDraw, setallowDraw] = useState(false);
  const [drawType, setDrawType] = useState('line');


  const [mouseLastX, setmouseLastX ] =  useState(0);
  const [mouseLastY, setmouseLastY ] =  useState(0);
  const [mouseCurrX, setmouseCurrX ] =  useState(0);
  const [mouseCurrY, setmouseCurrY ] =  useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width =  560*2;
    canvas.height = 360*2;
    canvas.style.width = `560px`;
    canvas.style.height = `360px`;

    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 4
    contextRef.current = context;
  }, [])

  const startDrawing  = ({nativeEvent}) => {
    console.log(drawType)
    if(!allowDraw) {
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    if(drawType == 'Line' || drawType == 'Ereaser'){
      contextRef.current.beginPath()
      contextRef.current.moveTo(offsetX, offsetY) 
    }
    if(drawType == 'Reactangle') {
      setmouseLastX(parseInt(offsetX-canvasRef.current.offsetTop))
      setmouseLastY(parseInt(offsetY-canvasRef.current.offsetLeft))
    }

    setIsDrawing(true) 
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {

    if(!isDrawing){
      return                 
    }
    const { offsetX, offsetY } = nativeEvent;
    if(drawType == 'Line'){
      contextRef.current.lineTo(offsetX, offsetY)
      contextRef.current.stroke()
      contextRef.current.lineWidth = 2;
    }
    if(drawType == 'Reactangle') {
      setmouseCurrX(parseInt(offsetX-canvasRef.current.offsetTop));
      setmouseCurrY(parseInt(offsetY-canvasRef.current.offsetLeft));
      contextRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height); //clear canvas
      contextRef.current.beginPath();
      let width = mouseCurrX-mouseLastX;
      let height = mouseCurrY-mouseLastY;
      console.log(canvasRef.current.width,canvasRef.current.height)
      contextRef.current.rect(mouseLastX,mouseLastY,width,height);
      contextRef.current.strokeStyle = 'black';
      contextRef.current.lineWidth = 2;
      contextRef.current.stroke()

    }

    if(drawType == 'Ereaser') {
      contextRef.current.lineWidth = 5;
      contextRef.current.strokeStyle = '#FFF';
      contextRef.current.globalCompositeOperation="destination-out";
      contextRef.current.lineTo(offsetX ,offsetY);
      contextRef.current.stroke();
    }else {
      contextRef.current.globalCompositeOperation="source-over";
    }

  }

  const clean = () => {
    contextRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height); //clear canvas
  }


  const allowDrawHandler = (value) => {
    setDrawType(value)
    setallowDraw(true)
  }

  return (
    <div>
      <canvas width="560" height="360"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      {/* <Rect /> */}
      <button onClick={(event) => allowDrawHandler(event.target.innerHTML)}>Reactangle</button>
      <button onClick={(event) => allowDrawHandler(event.target.innerHTML)}>Line</button>
      <button onClick={(event) => clean(event.target.innerHTML)}>Clean</button>
      <button onClick={(event) => allowDrawHandler(event.target.innerHTML)}>Ereaser</button>
    </div>
  );
}

export default App;
