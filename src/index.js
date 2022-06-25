import React from 'react';
import ReactDom from 'react-dom/client';
import './index.css';

function CalcDisplay(props){
    return(
        <div className="display">
           {props.value}
        </div>
    )
}
function CalcButton(props){
    return(
        <button className='number'
        onClick={props.onClick}>
            {props.value}
        </button>
    );
}
function FuncButton(props){
    return(
        <button
        onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state={
            input: [],
            result: null,
        }
    }
    renderEneter(text){
        return(
            <FuncButton
            value={text}
            onClick={()=>this.calculate()}/>
        );
    }
    renderDelete(text){
        return(
            <FuncButton
            value={text}
            onClick={()=>this.Delete()}/>
        );
    }
    Delete(){
        let input = this.state.input.slice(0, this.state.input.length-1);
        this.setState({
            input: input,
        });
    }
    calculate(){
        let results = GetResults(this.state.input);
        this.setState({
            input: [],
            result: results,
        })
    }
    getInput(text){
        if(this.state.result!==null){
            this.setState({
                result: null,
            })
        }
        let input = this.state.input.slice(0, this.state.input.length+1);
        input.push(text);
        this.setState({                
            input: input,
        });
    }
    //Returns the regualr calculator buttons
    renderCalculator(text){
        return(
            <CalcButton
            value={text}
            onClick={()=>this.getInput(text)}/>
        );
    }
    //What to display on the calculator 
    renderDisplay(){
        const display = (this.state.result===null ? this.state.input : this.state.result);
        return(
            <CalcDisplay 
            value={display}/>
        );
    }
    render(){
        return(
            <div className='Caclulator'>
                {this.renderDisplay()}
                <div className='calcRow'>
                    {this.renderCalculator(0)}
                    {this.renderCalculator(1)}
                    {this.renderCalculator(2)}
                    {this.renderCalculator(3)}
                </div>
                <div className='calcRow'>
                    {this.renderCalculator(4)}
                    {this.renderCalculator(5)}
                    {this.renderCalculator(6)}
                    {this.renderCalculator(7)}
                </div>
                <div className='last-calcRow'>
                    {this.renderCalculator(8)}
                    {this.renderCalculator(9)}
                </div>
                <div className='calcRow'>
                    {this.renderCalculator("*")}
                    {this.renderCalculator("+")}
                    {this.renderCalculator("-")}
                    {this.renderCalculator("/")}
                </div>
                <div className='functions'>
                    {this.renderDelete("DELETE")}
                    {this.renderEneter("ENTER")}
                </div>
            </div>
        );
    }
}
//Calculates and returns the results of the input
function GetResults(input){
    if(input[0]==="/" || input[0]==="*")
        return "ERROR";
    let current="";
    let final = [];

    input.forEach((element, index)=>{
        if(Number.isInteger(element))
        {
            current+=element.toString();
            if(index===input.length-1){
                final.push(parseInt(current));
            }
        }
        else{
            if(current!=="")
            {
                 final.push(parseInt(current));
            }
            final.push(element);
            current="";
        }
    });
    let ans = final[0];
    final.forEach((element, index)=>{

        if(!parseInt(element))
        {
            if(index!==final.length){
                if(element==="+")
                {
                    ans+=final[index+1];
                }
                else if(element==="-")
                {
                    ans-=final[index+1];
                }
                else if(element==="/")
                {
                    if(final[index+1]===0)
                    {
                        ans = "DIVISION ERROR";
                        return ans;
                    }
                    ans/=final[index+1];
                }
                else if(element==="*")
                {
                    ans*=final[index+1];
                }
            }
        }
    });
    return ans;
}
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<Calculator />);