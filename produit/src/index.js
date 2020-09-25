import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { render } from '@testing-library/react';
import 'bootstrap/dist/css/bootstrap.css'

//var app=document.querySelector("#root");
const Prod=[
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];
 


class Search extends React.Component {
    

    render() {
        return  <form action="">
                    <div className="form-group">
                        <input type="text" className="form-control" id="search" name="search" placeholder="search..." value={this.props.search} onChange={this.props.onChange} />
                    </div>
                    <div className="form-group">
                        <input type="checkbox" name="check" id="check" className="form-check-input" checked={this.props.check} onChange={this.props.onCheckchange} />
                        <label htmlFor="check" className="form-check-label">n'afficher que les produits en stock</label>
                    </div>
                </form>
    }
}

class Produit extends React.Component {
    constructor(props) {
        super(props)

    }
    render() {
    return  <tr>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
            </tr>
    
    }
}

class Categorie extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
    return <tr className="text-center"><th>{this.props.category}</th></tr>
    }
}

  class App extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            search: '',
            check: false,
            tab: 'deb'
        }
        this.handleChange=this.handleChange.bind(this)
        this.searchOff=this.searchOff.bind(this)
        this.searchOn=this.searchOn.bind(this)
        this.handleCheckchange=this.handleCheckchange.bind(this)
        this.rows=[]
        this.val=""
    }

    
    remplir() {
        let lastCategorie=null
        Prod.forEach(produit => {
            if(produit.category!=lastCategorie) {
                this.rows.push(<Categorie category={produit.category} key={produit.category}/>)
            }
            this.rows.push(<Produit name={produit.name} price={produit.price} key={produit.name}/>)
            lastCategorie=produit.category
        });
        return this.rows
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.val=e.target.value
        this.searchOff()
    }

    handleCheckchange(e) {
        this.setState({
            check: e.target.checked
        })
        this.searchOn(e)
    }

    searchOff() {
        let reg=new RegExp(this.val, 'i')
        let lastCategorie=null
        let i=0
        this.rows=[]
        Prod.forEach(produit =>{
            if(this.state.check){
                if(reg.test(produit.name) && produit.stocked) {
                    if(produit.category!=lastCategorie) {
                        this.rows.push(<Categorie category={produit.category} key={produit.category}/>)
                    }
                    this.rows.push(<Produit name={produit.name} price={produit.price} key={produit.name}/>)
                    lastCategorie=produit.category
                }
            }
            else {
                if(reg.test(produit.name)) {
                    if(produit.category!=lastCategorie) {
                        this.rows.push(<Categorie category={produit.category} key={produit.category}/>)
                    }
                    this.rows.push(<Produit name={produit.name} price={produit.price} key={produit.name}/>)
                    lastCategorie=produit.category
                }
            }
            i++
        })
        this.setState({
            tab : this.rows
        })
    }
    searchOn(e) {
        let reg=new RegExp(this.val, 'i')
        let lastCategorie=null
        let i=0
        this.rows=[]
        Prod.forEach(produit =>{
            if(e.target.checked){
                if(reg.test(produit.name) && produit.stocked) {
                    if(produit.category!=lastCategorie) {
                        this.rows.push(<Categorie category={produit.category} key={produit.category}/>)
                    }
                    this.rows.push(<Produit name={produit.name} price={produit.price} key={produit.name}/>)
                    lastCategorie=produit.category
                }
            }
            else {
                if(reg.test(produit.name)) {
                    if(produit.category!=lastCategorie) {
                        this.rows.push(<Categorie category={produit.category} key={produit.category}/>)
                    }
                    this.rows.push(<Produit name={produit.name} price={produit.price} key={produit.name}/>)
                    lastCategorie=produit.category
                }
            }
            i++
        })
        this.setState({
            tab : this.rows
        })
    }

    render() {
        return  <div className="container">
                    <div className="col-sm-8">
                        <Search search={this.state.search} check={this.state.check} onChange={this.handleChange} onCheckchange={this.handleCheckchange} />
                    </div>
                    <table className="table col-sm-8">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>PRICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.tab=="deb" ? this.remplir() : this.state.tab}
                            {this.state.search +"    "+ this.val+"    "+this.state.check}
                        </tbody>
                    
                    </table>
                </div>
    }
  }

render(<App />, document.querySelector("#app"))