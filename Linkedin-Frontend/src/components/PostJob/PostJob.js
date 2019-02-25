import React, {Component} from 'react';


class PostJob extends Component{

    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        return(
            <div>
                <Header/>
                <p>post job</p>
                <div className = "post-job-container">
                </div>
            </div>
        );
    }
}

export default PostJob;