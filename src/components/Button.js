import React from 'react'
import { useContext } from 'react';
import { CalculatorContext } from './Calculator';
import allbuttons from "./buttonData";


const numbers = allbuttons.filter(allbutton=>allbutton.type==="number");






const Button = (props) => {


const {
  dispatchClick,
  clickpattern,
  dispatchPattern,
  outputdisplay,
  
  } = useContext(CalculatorContext);

  function handleActionClick(event) {
    const { name, value } = event.target;
    
    if (clickpattern.includes("number")) {
      
        if (name === "Del") {

          
           dispatchClick({
              type: "DELETE",
            });
            
           
             dispatchPattern({
              type: "DELETEPATTERN",
            });
          
          
          
        } else if (name === "AC") {
          dispatchClick({
            type: "ALLCLEAR",
          });
          dispatchPattern({
            type: "ALLCLEARPATTERN",
          });
        } else if (name === "+/-") {
          
          dispatchClick({
            type: "CLICKED",
            id: {
              name: "PLUSORMINUS",
              value: clickpattern[clickpattern.length - 1],
            },
          });
        } else if (name === "=") {

          if(clickpattern.length>=3 && outputdisplay.length>0){

          



          dispatchClick({
            type: "OUTPUTCHANGE",
            id: {
              name: "output",
              value: outputdisplay,
            },
          });
        }
        } else if (clickpattern[clickpattern.length - 1] === "operator") {
          dispatchClick({
            type: "CHANGEOPERATOR",
            id: {
              name: name,
              value: value,
            },
          });
        } else {
          dispatchClick({
            type: "CLICKED",
            id: {
              name: "OPERATOR",
              value: value,
            },
          });
          dispatchPattern({
            type: "OPERATOR",
          });
        }
      }
    
  }

  function handleNumberClick(event) {
   
    const {  value } = event.target;
   

      dispatchClick({
        type: "CLICKED",
        id: {
          name: "NUMBER",
          value: value,
        },
      });
     
    
       dispatchPattern({
        type: "NUMBER",
      });
    
    
  }

 
  function changeClick(event){
   
  const index = numbers.findIndex(number=> number.name===Number(event.target.name))
  if (index>=0){
    handleNumberClick(event)
  }
  else{
    handleActionClick(event)
  }
  }


  return (<button key={props.props.key} className="w-100 h-100 btn btn-dark" name={props.props.name} value={props.props.value} onClick={changeClick}   > {props.props.name}</button>);
}

export default Button