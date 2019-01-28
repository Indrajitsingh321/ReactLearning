import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import App from './App';
import './App.css';
import './loader.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTag} from '../actions';

class Region extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            regionData: '',
            tagFromJenkins: '',
            nineK: false,
            elevenK: false,
            cr: false,
            rcmTag: '',
            regionTag: '',
        }
    }

    componentDidMount() {
        this.props.getTag({"RCMtag":"V2018"});
        var tagFetched = '';
        var tagRcmMain = '';
        axios.post('/DeliveryUtilities/FetchTag', {
        })
            .then((response) => {
                tagFetched = response.data;
                if (tagFetched !== ' ') {
                    tagRcmMain = tagFetched.split("#");
                    this.setState({
                        tagFromJenkins: tagRcmMain[0],
                        rcmTag: tagRcmMain[1]
                    });
                    var tag = this.state.tagFromJenkins;
                    if (tag.indexOf("11K") !== -1) {
                        this.setState({
                            elevenK: true,
                            regionData: '11000'
                        });
                    } else if (tag.indexOf("9K") !== -1) {
                        this.setState({
                            nineK: true,
                            regionData: '9000'
                        });
                    } else {
                        this.setState({
                            cr: true,
                            regionData: 'CR'
                        });
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        console.log("---------------------");
        console.log(this.props);
        return (
            <div>
                <hr className="line1"></hr>
                <div className="heading"><h1>Delivery Utilities</h1></div>
                <hr className="line"></hr>
                <div className="switch-field">
                    <input type="radio" id="switch_3_left" name="switch_3_left" checked={this.state.cr} disabled={(this.state.disabled)} />
                    <label htmlFor="switch_3_left">CR</label>
                    <input type="radio" id="switch_3_center" name="switch_3_center" checked={this.state.elevenK} disabled={(this.state.disabled)} />
                    <label htmlFor="switch_3_center">11K</label>
                    <input type="radio" id="switch_3_right" name="switch_3_right" checked={this.state.nineK} disabled={(this.state.disabled)} />
                    <label htmlFor="switch_3_right">9K</label>
                </div>
                <div className="textbox">
                    <input className="advancedSearchTextbox" value={this.state.tagFromJenkins} type="text" name="tagFromServer" disabled={(this.state.disabled)} />
                </div>
               <Router>
            <div>
               <Switch>
                  <Route exact={true} path='/' component={() => <App regionData={this.state.regionData} rcmTag={this.state.rcmTag} regionTag={this.state.tagFromJenkins} />}  />
               </Switch>
            </div>
         </Router>
            </div>
            
        )
    };
}

function mapStateToProps(state){
    return{
        dataStore: state.dataStore
    };

}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getTag},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Region);