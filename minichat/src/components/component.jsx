import React, { forwardRef, useState, useEffect } from 'react'
import { useRef } from 'react'


var scroll=0

const setData=async (form)=>{
   let response=await fetch("http://ftp.dvap.online/minichat/js/handler.php?action=set", {
        method: 'POST',
        body: form
    })
    if(response.ok) {
        let data=await response.json()
        console.log(data[1].content)
        //render(<Text Message={data}/>, document.querySelector("#root"))
        return data
        
    }
}
const days=['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
const months=['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet','aout', 'septembre', 'octobre', 'novembre', 'decembre']
function formatDate(date, jours, mois) {

    return jours[date.getDay()]+" "+date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()+" a "+deuxchiffre(date.getHours())+":"+deuxchiffre(date.getMinutes())
}
function deuxchiffre(chiffre) {
    return chiffre<10 ? '0'+chiffre : chiffre
}

const name=localStorage['nom']

export function Message({msg, nom}) {
    let stamp=parseInt(msg.date, 10)
    let datepub=new Date(stamp)
    return  <div className="row" >
                <div className={nom==msg.sender ? "col-3" : "" }></div><div className="message col-9">
                    <div className={nom==msg.sender ? "auteur text-right" : "auteur" }>{msg.sender}</div>
                    <div className={nom==msg.sender ? "justify-content-end" : "" }><span className="text">{msg.content}</span></div>
                </div>
            </div>
  }
  
export const Write=forwardRef( function (props, ref1) {
  
    const clickButton=()=>{
        if(ref1.current.value) {
            props.send()
        }
        else {
            ref1.current.className="form-control border-danger"
        }
    }
    const clickText=()=>{
        ref1.current.className="form-control"
    }
    
    return  <div className="blockW ">
                <div className="write row">
                     <div className="col-md-10 ">
                        <textarea name="" id="" cols="27" rows="2" placeholder="taper votre message... " className="form-control" ref={ref1} onClick={clickText} ></textarea>
                    </div>
                     <div className="col-md-1">
                        <button type="submit" className="btn btn-success " onClick={clickButton} >envoyer</button>
                    </div>
                </div>
            </div>
  })

export default function Corps({nom}) {

    const [Messages, setMessages]=useState([])
    const [load, setLoad]=useState(true)


    useEffect(()=>{
        (async ()=>{
            let response=await fetch("http://ftp.dvap.online/minichat/js/handler.php?action=get")
            if(response.ok) {
              let data=await response.json()
              setMessages(data)
              //console.log(Messages)
              setLoad(false)
              if(!scroll) divMessage.current.scrollTop=divMessage.current.scrollHeight
              scroll++
            }
          })()
    }, [Messages])

    
    const input1=useRef(null)
    const divMessage=useRef(null)

    const handleSend=(e)=>{
        console.log(input1.current.value, localStorage.getItem('nom'))
        const form=new FormData()
        const date=new Date()
        form.append('date', Date.parse(date))
        form.append('sender', localStorage.getItem('nom'))
        form.append('text', input1.current.value)
        setData(form)
        input1.current.value=""
        input1.current.focus()
        setTimeout(()=>{divMessage.current.scrollTop=divMessage.current.scrollHeight}, 1000)

    }

    
        
    
    return  <div className="corps">
                <div ref={divMessage} className="contentMessage">
                    {load ? "en cours de chargement ..." : Messages[0] ? Messages.map(message=><Message nom={nom} key={message.id} msg={message} />) : " cous n'avez aucun message " }
                </div>
                <Write ref={input1} send={handleSend} />
            </div>
}

