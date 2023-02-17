import { useEffect, useState } from "react";


function App() {

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("0");
  const [lastChar, setLastChar] = useState(text1[text1.length - 1]);
  const [secLastChar, setSecLastChar] = useState(text1[text1.length - 2]);
  const [equalPressed, setEqualPressed] = useState(false);


  useEffect(()=>{
    setLastChar(text1[text1.length - 1]);
    setSecLastChar(text1[text1.length - 2]);
  }, [text1])
  
  const handleEquals = () => {
    // eslint-disable-next-line
    setText2(eval(text1.replace("X", "*")));
    // eslint-disable-next-line
    setText1(text1 + "=" + (eval(text1.replace("X", "*"))))
    setEqualPressed(true);
  }

  const hoverHandle = e => {
    e.target.classList.add("active");
    setTimeout(() => {
      e.target.classList.remove("active");
    }, 250);
  }

  const clickEvent = e => {
    hoverHandle(e);
    const char = e.target.innerText;
    if (char !== "=" && equalPressed) {
      if (char === "/" || char === "X" || char === "+" || char === "-" ) {
        setText1(text2 + char);
        setText2(char);
      } else {
        setText1("");
        setText2("0");
      }
      setEqualPressed(false);
    } else {
      if (char === "/" || char === "X" || char === "+" || char === "-" ) {
        setText2(char);
        if (text1.length === 0) {
          setText1("0" + char);
        } else if (char === "-" && (secLastChar !== "/" && secLastChar !== "X" && secLastChar !== "+" && secLastChar !== "-")) { 
          setText1(text1 => text1 + char);
        } else if (lastChar !== "/" && lastChar !== "X" && lastChar !== "+" && lastChar !== "-" && lastChar !== ".") {
          setText1(text1 => text1 + char);
        } else if (lastChar === "-" && (secLastChar === "/" || secLastChar === "X" || secLastChar === "+" || secLastChar === "-" )) {
          setText1(text1 => text1.slice(0,(text1.length-2)) + char);
        } else if (lastChar === "."){
          setText1(text1 => text1 + "0" + char);
        } else {
          setText1(text1 => text1.slice(0,(text1.length-1)) + char);
        }
      } else if (char === "AC") {
        setText1("");
        setText2("0");
      } else if (char === "0") {
        if (!(text2.length === 1 && text2[0] === "0")) {
          if (text2.length === 1 && (text2[0] === "/" || text2[0] === "X" || text2[0] === "+" || text2[0] === "-" )) {
            setText2(char);
          } else {
            setText1(text1 => text1 + char);
            setText2(text2 => text2 + char);
          }
        }
      } else if (char === ".") {
        console.log((text2.split("").filter(i => i === ".").length))
        if ((text2.split("").filter(i => i === ".").length) === 0) {
          if (text2.length === 1 && (text2[0] === "/" || text2[0] === "X" || text2[0] === "+" || text2[0] === "-" )) {
            setText1(text1 => text1 + "0" + char);
            setText2(text2 => text2.slice(0,text2.length-1) + "0" + char);
          } else {
            setText1(text1 => text1 + char);
            setText2(text2 => text2 + char);
          }
        }
      } else if (char === "=") {
        handleEquals();
      } else {
        setText1(text1 => text1 + char);
        if (text2.length === 1 && (text2[0] === "0" || text2[0] === "/" || text2[0] === "X" || text2[0] === "+" || text2[0] === "-" )) {
          setText2(char);
        } else {
          setText2(text2 => text2 + char);
        }  
      }
    } 
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="display">
          <h2>{ text1 }</h2>
          <h2 id="display">{ text2 }</h2>
        </div>
        <div className="row-flexrow">
          <button id ="clear" className="button two-columns" onClick={ clickEvent }>AC</button>
          <button id ="divide" className="button" onClick={ clickEvent }>/</button>
          <button id ="multiply" className="button" onClick={ clickEvent } >X</button>
        </div>
        <div className="row-flexrow">
          <button id ="seven" className="button" onClick={ clickEvent } >7</button>
          <button id ="eight" className="button" onClick={ clickEvent } >8</button>
          <button id ="nine" className="button" onClick={ clickEvent } >9</button>
          <button id ="subtract" className="button" onClick={ clickEvent } >-</button>
        </div>
        <div className="row-flexrow">
          <button id ="four" className="button" onClick={ clickEvent } >4</button>
          <button id ="five" className="button" onClick={ clickEvent } >5</button>
          <button id ="six" className="button" onClick={ clickEvent } >6</button>
          <button id ="add" className="button" onClick={ clickEvent } >+</button>
        </div>
        <div className="row-flexrow">
          <div className="row-column">
            <div className="row-flexrow">
              <button id ="one" className="button" onClick={ clickEvent } >1</button>
              <button id ="two" className="button" onClick={ clickEvent } >2</button>
              <button id ="three" className="button" onClick={ clickEvent } >3</button>
            </div>
            <div className="row-flexrow">
              <button id ="zero" className="button two-columns" onClick={ clickEvent } >0</button>
              <button id ="decimal" className="button" onClick={ clickEvent } >.</button>
            </div>
          </div>
          <button id="equals" className="button two-rows" onClick={ clickEvent } >=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
