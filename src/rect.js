import React,{useEffect, useRef, useState} from 'react';


function Rect() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false);
  const [allowDraw, setallowDraw] = useState(false);

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
    const {offsetX, offsetY} = nativeEvent; 
    setmouseLastX(parseInt(offsetX-canvasRef.current.offsetTop))
    setmouseLastY(parseInt(offsetY-canvasRef.current.offsetLeft))
    setIsDrawing(true) 
  }

  const finishDrawing = () => {
    console.log("finishDrawing")
    contextRef.current.closePath()
    setallowDraw(false)
    setIsDrawing(false) 
  }

  const draw = ({nativeEvent}) => {
    if(allowDraw && isDrawing) {
      const {offsetX, offsetY} = nativeEvent;
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
      contextRef.current.stroke();
    }
  }

  const allowDrawHandler = () => {
    setallowDraw(true)
  }

  return (
    <div>
      <canvas width="800" height="500"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <button onClick={allowDrawHandler}>Reactangle</button>

    </div>
  );
}

export default Rect;
