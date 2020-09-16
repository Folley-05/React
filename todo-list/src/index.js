import React from 'react';
import ReactDOM, { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css'

class Tache extends React.Component {
  

  render() {
    const {etat, name, children, date, check, onChange}=this.props
    return  <div className="form-group">
              <input type="checkbox" id={etat} name={name} className="form-check-input" checked={check} onChange={onChange} />
              <label htmlFor=""  className="form-check-label">{children}</label>
              <label htmlFor=""  className="form-check-label">{date}</label>

            </div>
  }
}

class Liste extends React.Component {

  render() {
    const {children}=this.props
    return  <div>
                {children}
            </div>
  }
}

class Corps extends React.Component {
  constructor(props) {
    super(props)
    
    this.rows=[]
    this.handlecheck=this.handlecheck.bind(this)
  }

  remplir() {
    this.rows=[]
  for (let i=0; i<localStorage.length; i++) {
    let t=JSON.parse(localStorage.getItem(localStorage.key(i)));
    let date=new Date(t.date)
    this.rows.push(<Tache key={localStorage.key(i)} etat={JSON.stringify(t)} check={t.check} name={localStorage.key(i)} onChange={this.handlecheck} date={date.toLocaleDateString()+" a "+date.toLocaleTimeString()} >{t.label+"   le"}</Tache>)
    
  }
  return this.rows
  }
  handlecheck(e) {
    let change=JSON.parse(e.target.id)
    change.check=!change.check
    localStorage.setItem(e.target.name, JSON.stringify(change))
    this.props.onChange()
  }

  render() {
      return  <div >
                  <div className="col-sm-10">
                      <Liste >{this.remplir()}</Liste>
                  </div>
              </div>
  }
}

class PopUp extends React.Component {
  constructor(props) {
    super(props)
    this.soumission=this.soumission.bind(this)
    this.annuler=this.annuler.bind(this)
  }
  
  soumission(e) {
    e.preventDefault()
    let tache={
      label: "tache a pas oublier",
      date: new Date(),
      check: false
    }
    localStorage.setItem("key"+Math.random(), JSON.stringify(tache))
    this.props.onChange()
  }

  annuler(e) {
    this.props.onChange()
    console.log("annulation")
  }

  render() {
    return  <div className="col-8 pop">
              <form action="" onSubmit={this.soumission}>
                <div className="form-group">
                  <label htmlFor="text">libelle de la tache</label>
                  <input type="text" id="text" className="form-control" />
                </div>
                <div className="row">
                  <div className="col-md-2">
                      <button type='submit' className="btn btn-lg btn-primary btn-block">envoyer</button>
                  </div>
                  <div className="col-md-8"></div>
                  <div className="col-md-2">
                      <button type="button" className="btn btn-lg btn-danger btn-block" onClick={this.annuler} >annuler</button>
                  </div>
                </div>
              </form>
            </div>
  }
}

class Control extends React.Component {

  

  checkAll() {
  }

  unCheckAll() {
  }

  deleteAll() {
  }

  render() {
    const {newTask}=this.props
    return  <>
              <div className="row">
                <div className="col-md-3 border-success bg-primary" onClick={newTask} ><span className="glyphicon glyphicon-ok"> New Task</span></div>
                <div className="col-md-3 border-success bg-primary" onClick={this.checkAll()} ><span className="glyphicon glyphicon-ok"></span>Check All</div>
                <div className="col-md-3 border-success bg-primary" onClick={this.unCheckAll()} ><span className="glyphicon glyphicon-list">Uncheck All</span></div>
                <div className="col-md-3 border-success bg-primary" onClick={this.deleteAll()} ><span className="glyphicon glyphicon-ok"></span>Delete All</div>
                
              </div>
            </>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      claspop: "not-display",
      clasdiv: '',
      mod: true
    }
    this.modifState=this.modifState.bind(this)
    this.newTask=this.newTask.bind(this)
  }

  modifState() {
    let mod2=!this.state.mod
    this.setState({mod: mod2})
  }
  newTask() {
    this.setState({
      claspop: "display",
      clasdiv: "masqued"
    })
  }

  render() {
    return  <>
              <div className={this.state.clasdiv}>
                <Control task={this.newTask}  />
                <Corps onChange={this.modifState} />
              </div>
              <div className={this.state.claspop} >
                  <PopUp clas={this.state.clas} onChange={this.modifState} />
              </div>
            </>
  }
}

render( <div className="container-fluid">
            <App />
        </div>, document.querySelector("#root") )




var tache={
  label: "tache a pas oublier",
  date: new Date(),
  check: false
}
var text=JSON.stringify(tache)
console.log(text)