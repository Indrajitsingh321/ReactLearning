import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addjar: ' ',
            addStubsjar: ' ',
            addRcmjar: ' ',
            addRcmTag: '',
            disabled: true,
            data: '',
            hideJarDetails: '',
            LoaderPDN: false,
            LoaderPackage: false,
            LoaderDBscript: false,
            LoaderDeploy: false,
            LoaderUpload: false,
            changeCheck: '',
            visible: 'panel',
            packageVisible: 'hidepanel',
            generatePDN: false,
            generatePackage: false,
            generateDBScript: false,
            deployPackage: false,
            uploadPakage: false,
            regionTosend: '',
            regionTag: '',
            forLoopDataJava: '',
            submitDisable: false,
            dataToDisplay: [{ "tempData": " ", "componennts": " " }],
            makePackageData: [{ "tempData": " ", "componennts": " " }],
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.loaderCheck = this.loaderCheck.bind(this);
        this.stopLoader = this.stopLoader.bind(this);
        this.ajaxCall = this.ajaxCall.bind(this);
        this.handlepackageButton = this.handlepackageButton.bind(this);
    }
    loaderCheck(forLoopData) {
        if (forLoopData.indexOf("pdn") !== -1) {
            this.setState({ LoaderPDN: true });
        } else if (forLoopData.indexOf("package") !== -1) {
            this.setState({ LoaderPackage: true });
        } else if (forLoopData.indexOf("DB") !== -1) {
            this.setState({ LoaderDBscript: true });
        } else if (forLoopData.indexOf("deploy") !== -1) {
            this.setState({ LoaderDeploy: true });
        } else if (forLoopData.indexOf("upload") !== -1) {
            this.setState({ LoaderUpload: true });
        }
    }

    stopLoader(forLoopData) {
        if (forLoopData.indexOf("pdn") !== -1) {
            this.setState({ LoaderPDN: false });
        } else if (forLoopData.indexOf("package") !== -1) {
            this.setState({ LoaderPackage: false });
        } else if (forLoopData.indexOf("DB") !== -1) {
            this.setState({ LoaderDBscript: false });
        } else if (forLoopData.indexOf("deploy") !== -1) {
            this.setState({ LoaderDeploy: false });
        } else if (forLoopData.indexOf("upload") !== -1) {
            this.setState({ LoaderUpload: false });
        }
    }
    ajaxCall(newTask) {
        if (newTask.length > 0) {
            { this.loaderCheck(newTask[0]) };
            this.state.forLoopDataJava = newTask[0];
            console.log(this.state);
            axios.post('/DeliveryUtilities/ToDoTask', {
                data: this.state,
            })
                .then((response) => {
                    if (response.data !== ' ') {
                        if (newTask[0].indexOf("package") === -1) {
                            this.setState({ dataToDisplay: this.state.dataToDisplay.concat(response.data) });
                        } else if (newTask[0].indexOf("package") !== -1) {
                            var data = [
                                {
                                    "tempData": this.props.regionData + "\t Package Generated",
                                    "componennts": "/home0/jboss6/temp/Delivery_utilities/QD/packages/yahav/bb/" + this.props.regionData
                                }
                            ];
                            this.setState({
                                dataToDisplay: this.state.dataToDisplay.concat(data),
                                makePackageData: this.state.makePackageData.concat(response.data)
                            });

                        }
                        { this.stopLoader(newTask[0]) };
                        newTask.shift();
                        if (newTask.length > 0)
                        { this.ajaxCall(newTask) };
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    handleCloseClick() {
        this.setState({
            visible: this.state.visible === 'panel' ? 'panel visible' : 'panel',
            submitDisable: false,
            dataToDisplay: [{ "tempData": " ", "componennts": " " }],
            makePackageData: [{ "tempData": " ", "componennts": " " }],
        });
        this.state.visible === 'panel' ? document.body.style.backgroundColor = "rgb(251, 251, 251)" : document.body.style.backgroundColor = "white";
        if (this.state.packageVisible !== "hidepanel")
        { this.handlepackageButton() }
    }

    handleClick() {
        var task = ["pdn-" + this.state.generatePDN, "package-" + this.state.generatePackage, "DB-" + this.state.generateDBScript, "deploy-" + this.state.deployPackage, "upload-" + this.state.uploadPakage];
        var newTask = [];
        task.map((user, i) => {
            if (user.indexOf("true") !== -1) {
                newTask.push(task[i]);
            }
        });
        if (newTask.length > 0) {
            this.setState({
                visible: this.state.visible === 'panel' ? 'panel visible' : 'panel',
                submitDisable: true
            });
            this.state.regionTosend = this.props.regionData;
            this.state.regionTag = this.props.regionTag;

            this.state.visible === 'panel' ? document.body.style.backgroundColor = "rgb(251, 251, 251)" : document.body.style.backgroundColor = "white";

            { this.ajaxCall(newTask) }
            console.log(this.state);
            console.log(newTask);
        } else {
            alert("Please select any Options");
        }
    }

    componentDidMount() {
        this.setState({ hideJarDetails: false });
    }
    addJAR() {
        if (this.state.addRcmjar === true && this.state.addStubsjar === true) {
            this.setState({ data: "[ RCM Jar ] [ Stubs Jar ]" });
        }
        else if (this.state.addRcmjar === true) {
            this.setState({ data: '[ RCM Jar ]' });
        } else if (this.state.addStubsjar === true) {
            this.setState({ data: "[ Stubs Jar ]" })
        }
        this.setState({
            addjar: false,
            addRcmjar: false,
            addStubsjar: false,
        });
        this.state.addRcmTag = this.props.rcmTag;
        console.log(this.state);
    }

    addChargeChange(changeCheck) {
        this.setState({ addjar: changeCheck, hideJarDetails: changeCheck });
        if (changeCheck === false) {
            this.setState({ data: '' });
        }
    }

    handlepackageButton() {
        this.setState({ packageVisible: this.state.packageVisible === 'hidepanel' ? 'hidepanel visible' : 'hidepanel' });
    }
    render() {
        const isAddJar = this.state.addjar;
        var newArray = this.state.data.slice(0);
        let isRCM = this.state.addRcmjar;
        let isRCMStub;
        let isStbs = this.state.addStubsjar;
        let hideJarDetailsflag = this.state.hideJarDetails;
        var isLoader = this.state.isLoader;
        let addJar;
        let addStubsJar;
        let addJarButton;
        let addRcmTag;
        let addJarDeatils;
        let loaderPDN;
        let pacKage;
        let dbScript;
        let deployPackage;
        let uploadPackage;
        let dataToPaint;
        let display;
        let packageDisplay;
        let packageButton;
        display = <div>{this.state.dataToDisplay.map(((dataItirate, index) =>
            <div>
                <ul>
                    {dataItirate.tempData !== " " ? <li>{dataItirate.tempData}</li> : null}
                    {dataItirate.componennts !== " " ? <li>{dataItirate.componennts}</li> : null}
                </ul>

            </div>))}</div>
        if (this.state.generatePackage === true && this.state.visible === "panel visible") {
            packageButton = <div className="packageButton"><Button className="packageButtons" style={{ fontSize: "9px !important", width: "121px !important" }} name="packageButton" id="packageButton" onClick={this.handlepackageButton}><span>Package Deatils</span></Button></div>;
        }

        packageDisplay = <div>{this.state.makePackageData.map(((dataItirate, index) =>
            <div>
                {dataItirate.componennts !== " " ? dataItirate.tempData !== " " && dataItirate.tempData === "Response Code : 0" ?
                    <p style={{ color: "white", marginLeft: "27px" }}><span className="dotGreen"></span><div className="space">{dataItirate.componennts}</div></p> : <p style={{ color: "white", marginLeft: "27px" }}>
                        <span className="dotRed"></span><div className="space">{dataItirate.componennts}</div></p> : null}
            </div>))}</div>


        if (isRCM === ' ') {
            isRCM = false;
        }
        if (isStbs === ' ') {
            isStbs = false;
        }
        if (isAddJar === true && isAddJar !== ' ') {
            addJar = <div className="addJar"><label className="container"><input name="addRcmJar" checked={isRCM} type="checkbox" onChange={event => this.setState({ addRcmjar: event.target.checked })} />RCM Jar<br></br><span className="checkmark"></span></label></div>;
            addStubsJar = <div className="addJar"><label className="container"><input name="addStubsJar" checked={isStbs} type="checkbox" onChange={event => this.setState({ addStubsjar: event.target.checked })} />Stubs Jar<br></br><span className="checkmark"></span></label></div>;
        }
        if (((isRCM === true && isRCM !== ' ') || (isStbs === true && isStbs !== ' ')) && (isAddJar === true && isAddJar !== ' ')) {
            addRcmTag = <div className="addRcmTag"><input name="addRcmTag" type="text" value={this.props.rcmTag} disabled={(this.state.disabled)} /><br></br></div>;
            addJarButton = <div className="addJarButton"><Button className="button" name="addJarButton" onClick={() => this.addJAR()}><span>ADD</span></Button><br></br></div>;
        }
        if (hideJarDetailsflag === true) {
            addJarDeatils = <div className="jarDeatils"><label>{this.state.data}</label></div>;
        }
        if (this.state.LoaderPDN === true)
            loaderPDN = <div className="generatePDN"><div className="loader" id="loader"></div></div>;
        else if (this.state.LoaderPackage === true)
            pacKage = <div className="generatePackage"><div className="loader" id="loader"></div></div>;
        else if (this.state.LoaderDBscript === true)
            dbScript = <div className="generateDBScript"><div className="loader" id="loader"></div></div>;
        else if (this.state.LoaderDeploy === true)
            deployPackage = <div className="deployPackage"><div className="loader" id="loader"></div></div>;
        else if (this.state.LoaderUpload === true)
            uploadPackage = <div className="UploadPackage"><div className="loader" id="loader"></div></div>;
        return (
            <div>
                <Form inline style={{ paddingLeft: '58px' }}>
                    <label className="container">
                        <input name="addJar" id="addJar" type="checkbox" onChange={(event) => this.addChargeChange(event.target.checked)} disabled={(this.state.submitDisable)} />Add Jar<br></br>
                        <span className="checkmark"></span></label>
                    {addJarDeatils}
                    {addJar}
                    {addStubsJar}
                    {addRcmTag}
                    {addJarButton}
                    <label className="container">
                        <input name="generatePDN" id="generatePDN" type="checkbox" onChange={(event) => this.setState({ generatePDN: event.target.checked })} disabled={(this.state.submitDisable)} />Generate PDN {loaderPDN}<br></br>
                        <span className="checkmark"></span></label>
                    <label className="container">
                        <input name="generatePackage" id="generatePackage" type="checkbox" onChange={(event) => this.setState({ generatePackage: event.target.checked })} disabled={(this.state.submitDisable)} />Generate Package {pacKage}<br></br>
                        <span className="checkmark"></span></label>
                    <label className="container">
                        <input name="generateDB" id="generateDB" type="checkbox" onChange={(event) => this.setState({ generateDBScript: event.target.checked })} disabled={(this.state.submitDisable)} />Generate DBscript {dbScript}<br></br>
                        <span className="checkmark"></span></label>
                    <label className="container">
                        <input name="deployPackage" id="deployPackage" type="checkbox" onChange={(event) => this.setState({ deployPackage: event.target.checked })} disabled={(this.state.submitDisable)} />Deploy Package {deployPackage}<br></br>
                        <span className="checkmark"></span></label>
                    <label className="container">
                        <input name="uploadPackage" id="uploadPackage" type="checkbox" onChange={(event) => this.setState({ uploadPakage: event.target.checked })} disabled={(this.state.submitDisable)} />Combine Package {uploadPackage}<br></br>
                        <span className="checkmark"></span></label>
                    <div className="submitButton">
                        <Button className="buttons" name="submitPage" id="submitPage" onClick={this.handleClick} disabled={(this.state.submitDisable)}>
                            <span>Submit</span>
                        </Button>
                    </div><br></br>
                    <div className={this.state.visible}>
                        <div>
                            {packageButton}
                            <Button className="closeButton" name="closeButton" id="closeButton" onClick={this.handleCloseClick}><span>X</span></Button></div>
                        <div className="outputDiv">
                            {display}
                        </div>
                         </div>
                        <div className={this.state.packageVisible}>
                            <div className="outputDivs">
                                {packageDisplay}

                        </div>
                    </div>
                </Form>

            </div>
        )
    }
}
export default App;