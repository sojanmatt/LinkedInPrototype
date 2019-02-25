import React, {Component} from 'react';

class ApplicationInfo extends Component{
    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        return(
            <div>
                <h1>Application Info Page!</h1>
            </div>
        );
    }
}

export default ApplicationInfo;