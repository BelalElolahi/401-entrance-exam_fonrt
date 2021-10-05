import React, { Component } from 'react'
import axios from 'axios';
import WhatchView from './WhatchView';
import { withAuth0 } from '@auth0/auth0-react';




export class Min extends Component {
    constructor(props){
        super(props);
        this.state={
            watchdataApi:[]
        };
    }
    

    componentDidMount=()=>{
        axios.get(`${process.env.REACT_BAK_URL}/watchs`).then(res=>
            this.setState({
                watchdataApi:res.data
            })
        ).catch(err=>console.log(err));
    }


    handelAdd=(watch)=>{
        axios.post(  `${process.env.REACT_BAK_URL}/create-watch` , {
            userEmail:this.props.auth.user.email,
    tilte:watch.tilte,
   description:watch.description,
   toUSD:watch.toUSD,
   image_url:watch.image_url,
   username:this.props.auth.user.email
        }).then(res=>
            this.setState({
                watchdataApi:res.data
            })
        ).catch(err=>console.log(err));


    }
    render() {
        return (
            <div>
               

                  <WhatchView watchdataApi={this.state.watchdataApi} handelAdd={this.handelAdd} />
               
            </div>
        )
    }
}

export default withAuth0(Min);
