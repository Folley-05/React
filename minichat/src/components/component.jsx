import React, { forwardRef } from 'react'
import { useRef } from 'react'

const name=localStorage['nom']

export function Message(props) {

    return  <div className="row">
                <div className={props.sens}></div><div className="message col-md-10">
                    <div className="auteur">pascal djouda</div>
                    <div className="text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga dicta sequi a sint dolore, neque quasi eveniet, quidem dolorem consectet</div>
                    <div className="date">vendredi</div>
                </div>
            </div>
  }
  
export const Write=forwardRef( function (props, ref1) {
  
    return  <div className="blockW ">
                <div className="write row">
                     <div className="col-md-10 ">
                        <textarea name="" id="" cols="27" rows="2" placeholder="taper votre message... " className="form-control" ref={ref1} ></textarea>
                    </div>
                     <div className="col-md-1">
                        <button type="submit" className="btn btn-success " onClick={props.send} >envoyer</button>
                    </div>
                </div>
            </div>
  })

export default function Corps() {

    const input1=useRef(null)

    const handleSend=(e)=>{
        console.log(input1.current.value)
    }

    return  <div className="corps">
                <div className="contentMessage">
                    <Message sens={""} />
                    <Message sens={"col-md-2"} />
                    <Message sens={""} />
                    <Message sens={""} />
                    <Message sens={"col-md-2"} />
                </div>
                <Write ref={input1} send={handleSend} />
            </div>
}