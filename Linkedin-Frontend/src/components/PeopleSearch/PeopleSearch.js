import React, { Component } from "react";
import JobHeader from "../Header/JobHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert'
//import {saveJobDetailsToStore} from '../../actions/jobResultsAction';
import {saveSearchFieldToStore} from '../../actions/peopleSearchAction';
import {saveUserProfiletoStore} from '../../actions/profileResultsAction';
import '../../static/css/MyNetwork.css';
import Header from '../Header/Header';

class PeopleSearch extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const MAX_LENGTH = 250;
    this.state = {
      profiles: [],
      redirectToProfileDisplayPage: false,
    };

    //bind
    //this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  componentDidMount() {
     // console.log(this.props.searchFieldToStore.searchfieldresult.query);
    axios.defaults.withCredentials = true;
    var data = {
      query :  this.props.searchFieldToStore.searchfieldresult.query
  }

  console.log("data" + data.query)
  axios.post('http://localhost:3001/peopleSearch',data)
  .then((response) => {
      console.log(response.data);
      var profiles = response.data;
                for(let i=0;i<profiles.length;i++){
                    if(profiles[i].user.profileimage.length > 0){
                        console.log('profile image', profiles[i].user.profileimage);
                       axios.post('http://localhost:3001/download/'+profiles[i].user.profileimage)
                            .then((res)=>{
                                if(res.status === 200){
                                    profiles[i].user.profileimage = 'data:image/jpg;base64, ' + res.data;
                                    this.setState({
                                        profiles : profiles
                                    });
                                }
                            });
                    }
                    else{
                        profiles[i].user.profileimage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEX///8IFyYAAAAAFCQAABoAABUAABgAESIAABMAABEEFSUAAAYAABcAAA8ACR0AAA3z9PXV1tmJjZIABxzd3+G0t7o+R1FkanHs7e7k5edXXmb5+fpXXWWanaExOUO6vcAdKDWipanMztGAhIlNU1uIjJF3fIJvdHqqrK5BSFEQHizGyMohKzc4QEqRlZqcoKQqNEAWIzElUYvjAAAIn0lEQVR4nO2d53biOhCAkWQsF1zAZuklFEMgQHj/l7uSbYyLQttwLe2Z78duFkyOBs1oikbaRgMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgL/H7/f7o7oH8Tbax9WZapqGvsbHfb/u0fwqfrc3a0y+seFSYlkWoTY+T/6hmexHGEfdwKMoxUJHNoP+Yrmqe2i/wwm36GFlE5RBl5NotbPtJvbrHtxf0g/ZH0PbQmhHUZ6gqblcYnvW8Cd1j/Iv6Jv9xuhgJHopRI8ae6/uYb7O6JsN/rMlli1V10PjiLt1D/Rlhnav0TNvCcjUdDRuftY90FfZYuNji28LiOw9Ijise6ivMWoR48O7IyAKNhpqduoe62t0mH6eyT0J+RJE53WP9SX8gPy4gpaFtNt1j/YVtncV9IqppEs80PuSXXBVDN5CW6iPhlBvLVz3cF/gwxFIwhZXXSgiVtAQx25uigIv4H9TvG+IHaSzrXu8z+Nlc0Ucrzdbagi1EPfsS5H6svBUNcLLVFlNcmIZ0pwSPEwypY1gkXXHNY/3eWb2ZQ3ZcLk6jqFl8XWvKiL9rnGsr3E0UgFjuRYYL3Opbg+XlxtLU66iEemJgHv+jxBHxarTGpejOaychCs3N4PrQfntbtMtSVh5RHa+eETT3MQ/i0oxg2nRGNVLoLhjJ+iW6h2xprSE3Fl4HzcfGQyxaykrYZ9JSO6uj4tPHKgq4YBJ2Fref24xxkacg2DVSvxcQnvxyJP949RW0VswLbWcRx9maQiZv3Ew78BnDv/xQKxtIwuplVz0dyxmC4aPPj4weXDQe+eIfpudy3PBx0uERGdB3BPP186EhSvmdPn42tEeI1ep5fRMkfnkhPgsyjPW7xnO78OSX7J79kN7G1Flti+6HtIfcPZFRjtiBarslm4dZN6OSEVMqTqGyCR0/m0JmZa+sJl0Jpamipa2MaJ/nv1Q6CE6fcdo3sHIsJD5rMKdTKRt3jKcdzAMkPGsmlKC8Owto3kHM/x0gHJk6YX2puG8AxaguIdnEj7m75Gn0h7iHltIPzxeH9waBNHzGwf0+yyZnrp4vHyk+NKN5raFiGr7axtea3NNel9VZ1inPNdSrmtoHVfR7PuZ+x+WN1lm66GajlwsxpgZF7n7GC/KeWtVopki3PPfncRPF+nqePoyEwfR3W1LjF2ncpsyGSOXIOd2cDOnqKneBvcV3pVg3/IYSxMRXU0bTGFW5t7IGPgyg59PJWWCJVLI+bGiMSIsulOmOPMDHY/N0k/OfKwrvcykHJjjx2J3HnnK6yinzzSRGCIROyyfMJUq5f/AgoXV1NtXXo/Y69rTxQ4p4U6d4FPxRX/MVNQ9K+0oGqN2Z3fkP8x484y9yvvFrqYhpCUCHj4/VFxt/NnmjJtpTjRrsfzB9XqLJILzt1N+QMj5jAUcGq7jTdcLpfaABx8rw9Z41xNNqkvh3LTYnOHdMFpuPg1+wIvgJN7uxR1+tIl3vZkiOrtYf2Mn7SJx9F7qC6M4XSSB3tL4e8Rxk8KaP1nhpDuKaDZenaTvyFj0XLuZ9Xfndy/CHjZoLLdFXJt2rko5WmUNYK5pzztSl/YjrOU78oxC9SzsTHVs29gmq21BH7/yLe/UbElczyg3VVY68PvhbLYIS2vKoNQWTeQt2XyUO7gf22qpnMsgssaqI1I5AfRDQFqkF5Q/pksay+2rTfjGsfCEn0xpaSn5qpw8sSQ9cpn2PRcMsZj8tXHz+3uOiylxaFcPYEh6DKrTrIyUuAVDbGOLUlJaf0THo9SRsGSIbUwZenFie5rSEhYNMfz+wzgU1xFXcEJRIQnvV2FEZqiShOjumbSu6JSiUhLmDTFcDRnjgpZudMUlLBhiF7uMoNDFcBadw1RJwoJrmCQeM9+0Xg5K1ZPQ0nNxdhqfebnIWmiGskp4El6ekDfE9GRw/ljzRuANWdQmZyIsno6cOKNd4vrynUFT4XFoR84suC00qZwhDtLANdfd1Rd+xmrVMf77DIRaSlAWml6+AoKyz4jnXdrjltX8kHPtIslibCPLcCORN5S3we2PKxqumVW7s8X2KnQ1N+S80J36/3AUuYucIQ4v34B3aV8YCD8h7+F8QZKPeI54eX930eKsv3YmvHeB3OluqA9flAjlNvKzLyC4RKZL4QVL7sOHbf53hpWaEudiVdkJ/WuTntgMbWmriY2uUOkuM7a/vpvmVL7YG5ry7l+MNJGakiB59+PqL9OC6F74jWiS1hJjlsK1Mc0lcr4vOaXfWIsfl7mJb1C5K4GT5hK5y07Sm0xWIgcqecd+TxSjpCFKLtdNbjIZCUM2eXctYkLR2pHMyij3VnKTyeLnhyUmqha+0779fOqRhNYT4bPVrg258EXht833ewvxi8ejFpEZyropk6MrUL34rF5hxvjy6u+qXwZ5+qxNDQyrkRg9NEqbaHxWRTYr+TKTMKrWBy2tHzdiXuEpleAyMFPWxLBI26s4RbZ8+IUbFHncUt0ZDaayJhUlqqbI68Lf+altMstEZTOkVAEjTDiVReQbNIV7PllgOij7e3qzX1oyjmURbbZ05u4T5NctlLNf2pQ1sxdyKgWovC5RirxL2a/rKiUgt8XCisorM7kMeN4oX42p7yTtMPmZ9i4/R3HwnfmL+Hal/CxbeKXIKprHH+buZIvj6ewaPt5IlA+7Xe9499dJSde5TmN8hVAaC8S50zbz98SeKrSIFvE3WEt10dkyEU9JaOoxk+tfiqfENGSt/z5E2MN6oqum+bXpxKsp+ToOiZcISL3gqKAFFggj146lsaiWugvSTAqrloa/JvLW1R7H766wrbtFB0lcAzsbmWtOz+HPlp8etj1DZzRND2N3fFTMwz9AONsel1EUrSfdf+x/mAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAafgP4Ap3iSRYr30AAAAASUVORK5CYII=';
                    }
                }
                console.log('profile data', profiles);
                this.setState({
                    profiles : profiles
                });
            });
    }

  saveUserProfiletoStore = (Parameter, event) =>{
    
    const index = Parameter;
    var profileDetail = this.state.profiles[index];
    
    console.log('profile details', profileDetail);
    console.log('Inside saveUserProfiletoStore');
    this.props.saveUserProfiletoStore(profileDetail);
    this.setState({
      redirectToProfileDisplayPage : true
    });
  }



render() {
    var redirectVar = null;

    if(this.state.redirectToProfileDisplayPage === true){
        redirectVar = <Redirect to="/profile/:id"/>
      }  
    if(this.props.loginStateStore.isAuthenticated === false){
        redirectVar  = <Redirect to="/login"/>
    } 

   

    var requestProfiles = null;
    if(this.state.profiles.length > 0){
        requestProfiles = this.state.profiles.map((profile, index)=>{
            return (
                <div key={index}>
                <hr/>
                <div className="con-cotainer mt-1">
                    <div className="row">
                        <div className="col-1">
                            <img className="con-img" src={profile.user.profileimage} alt="con-img"/>
                        </div>
                        <div className="col-6 ml-4">
                       
                            <div><b> <Link to="#" onClick={this.saveUserProfiletoStore.bind(this, index)}>{profile.user.Fname} {profile.user.Lname}</Link></b></div>
                            <div>{profile.user.aboutMe}</div>
                        </div>
                        
                    </div>
                </div>
                </div>
            )
        });
    }

    return (
        <div>
            <Header />
            {redirectVar}
            <div className="mynetwork-container">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col-5 con-req-container border mt-5 pb-3">
                      {requestProfiles}
                    </div>
                </div>
            </div>                
        </div>
    );
}
}


const mapStateToProps  = state =>({
    loginStateStore : state.Login,
  searchFieldToStore : state.peopleSearchFieldsStateStore,
  profileResultsStateStore : state.profileResultsStateStore,
  saveUserProfiletoStore : state.profileResultsStateStore,
});

/* function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveSearchFieldToStore}, dispatch);
}
 */
export default connect(mapStateToProps, {saveUserProfiletoStore})(PeopleSearch);