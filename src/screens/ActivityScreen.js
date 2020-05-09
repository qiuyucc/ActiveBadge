import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, View, ScrollView, Image, Text, Modal, Picker, Alert} from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from "../components/loader";
import BackButton from "../components/BackButton";
import {baseUrl} from "../Redux/imageUrl";
import {connect} from "react-redux";
import {postActivityRecord} from "../actions/ActionCreators";
import {updatePoint} from "../actions/auth.actions";
import {ErrorUtils} from "../core/auth.utils";


const mapStateToProps = state => {
    return {
        users: state.userReducer.getUser,
        activities: state.activityReducer.getActivity,
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch,
    postActivityRecord:(user, name, description, totalmins, date)=>dispatch(postActivityRecord(user,name,description,totalmins,date))
});

class ActivityScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: "",
            hour: 0,
            mins: 0,
            name: "",
            point:0,
            description: "",
            timeModal: false,
            successModal: false,
        }
    }

    toggleTimeModal() {
        this.setState({timeModal: !this.state.timeModal})
    }

    toggleSuccessModal() {
        this.setState({successModal: !this.state.successModal})
    }

    updatePoint= async(values) =>{
        try{
            const response = await this.props.dispatch(updatePoint(values));
            if(!response.success){
                throw response;
            }
        }
        catch(error){
            const newError = new ErrorUtils(error, "upload point error");
            newError.showAlert();
        }
    }



    // }    // postActivityRecord= async(user, name, description, totalmins, date) =>{
    //     try{
    //         const response = await this.props.dispatch(postActivityRecord(user, name, description, totalmins, date));
    //         if(!response.success){
    //             throw response;
    //         }
    //     }catch(error){
    //         const newError = new ErrorUtils(error, "upload avatar error");
    //         newError.showAlert();
    //     }
    formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    submitActivity() {
        const totalmins = this.state.hour * 60 + parseInt(this.state.mins);
        const now = new Date();
        const date = this.formatDate(now);
        const user = this.state.user;
        const name = this.state.name;
        const description = this.state.description;
        const point = parseInt(this.state.point) +10;
        this.props.postActivityRecord(user, name, description, totalmins, date);
        this.updatePoint(point);
        // Alert.alert(
        //     'Congrauation!',
        //     'Email ' + this.state.user + "\n" +
        //     'name ' + this.state.name + "\n" +
        //     'description ' + this.state.description + "\n" +
        //     'total mins ' + totalmins+"\n"+
        //     'point' + point+"\n"+
        //     'date '  +date
        //     ,[
        //         {
        //             text: 'CANCEL',
        //             onPress: () => this.resetForm(),
        //             style: 'cancel'
        //         },
        //         {
        //             text: 'OK',
        //             onPress: () => {
        //                 this.toggleTimeModal()
        //             }
        //         }
        //     ]
        // )
            this.toggleSuccessModal();
        this.toggleTimeModal();
    }


resetForm()
{
    this.setState({
        hour: 0,
        mins: 0,
        user: "",
        name: "",
        point:0,
        description: "",
    })
}

//   postActivityRecord = async (user, name, description, totalmins, date) => {
//     try {
//         const response = await this.props.dispatch(postActivityRecord(user, name, description, totalmins, date));
//         if (!response.success) {
//             throw response;
//             this.toggleSuccessModal();
//             this.resetForm();
//         }
//     } catch (error) {
//         const newError = new ErrorUtils(error, "upload profile error");
//         newError.showAlert();
//     }
// }


render()
{
    const {users: {userDetails}} = this.props;

    if (this.props.activities.isLoading) {
        return (
            <Loader/>
        );
    } else if (this.props.activities.errors) {
        return (
            <View>
                <Text>{props.activities.errors}</Text>
            </View>
        );
    } else {
        return (
            <Background>
                <BackButton goBack={() => this.props.navigation.navigate('Home')}/>
                <Header>Select Your Activity</Header>
                <Text style={{fontSize: 16, fontWeight: 'bold', margin: 5}}>What activity did you complete
                    today？</Text>
                <View style={styles.body}>
                    <ScrollView style={styles.scroll}
                                keyboardShouldPersistTaps="always">
                        <View style={styles.avatarBox}>
                            {this.props.activities.activityDetails.map((item) => {
                                return (
                                    <TouchableOpacity key={item.id}
                                                      onPress={() => {
                                                          this.setState({
                                                              name: item.name,
                                                              description: item.description,
                                                              user: userDetails.email,
                                                              point: userDetails.point
                                                          });
                                                          this.toggleTimeModal()
                                                      }}>
                                        <Image source={{uri: baseUrl + item.name}} style={styles.image}/>
                                    </TouchableOpacity>
                                );
                            })
                            }
                        </View>
                    </ScrollView>
                </View>
                <Modal animationType={"slide"} transparent={true}
                       visible={this.state.timeModal}
                       onDismiss={() => this.toggleTimeModal()}
                       onRequestClose={() => this.toggleTimeModal()}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', margin: 25}}>How long was your activity
                                today</Text>
                            <Text style={{fontSize: 30, borderColor: '#a02bff', borderWidth: 1}}>
                                {this.state.hour} Hr : {this.state.mins} Min
                            </Text>
                            <View style={styles.formRow}>
                                <Picker style={{flex: 2}}
                                        selectedValue={this.state.hour}
                                        onValueChange={(itemValue, itemIndex) => this.setState({hour: itemValue})}>
                                    <Picker.Item label="0" value="0"/>
                                    <Picker.Item label="1" value="1"/>
                                    <Picker.Item label="2" value="2"/>
                                    <Picker.Item label="3" value="3"/>
                                    <Picker.Item label="4" value="4"/>
                                    <Picker.Item label="5" value="5"/>
                                    <Picker.Item label="6" value="6"/>
                                </Picker>
                                <Picker style={{flex: 2}}
                                        selectedValue={this.state.mins}
                                        onValueChange={(itemValue, itemIndex) => this.setState({mins: itemValue})}>
                                    <Picker.Item label="0" value="0"/><Picker.Item label="1" value="1"/><Picker.Item
                                    label="2" value="2"/><Picker.Item label="3" value="3"/><Picker.Item label="4"
                                                                                                        value="4"/><Picker.Item
                                    label="5" value="5"/><Picker.Item label="6" value="6"/><Picker.Item label="7"
                                                                                                        value="7"/><Picker.Item
                                    label="8" value="8"/><Picker.Item label="9" value="9"/>
                                    <Picker.Item label="10" value="10"/><Picker.Item label="11"
                                                                                     value="11"/><Picker.Item
                                    label="12" value="12"/><Picker.Item label="13" value="13"/><Picker.Item
                                    label="14" value="14"/><Picker.Item label="15" value="15"/><Picker.Item
                                    label="16" value="16"/><Picker.Item label="17" value="17"/><Picker.Item
                                    label="18" value="18"/><Picker.Item label="19" value="19"/>
                                    <Picker.Item label="20" value="20"/><Picker.Item label="21"
                                                                                     value="21"/><Picker.Item
                                    label="22" value="22"/><Picker.Item label="23" value="23"/><Picker.Item
                                    label="24" value="24"/><Picker.Item label="25" value="25"/><Picker.Item
                                    label="26" value="26"/><Picker.Item label="27" value="27"/><Picker.Item
                                    label="28" value="28"/><Picker.Item label="29" value="29"/>
                                    <Picker.Item label="30" value="30"/><Picker.Item label="31"
                                                                                     value="31"/><Picker.Item
                                    label="32" value="32"/><Picker.Item label="33" value="33"/><Picker.Item
                                    label="34" value="34"/><Picker.Item label="35" value="35"/><Picker.Item
                                    label="36" value="36"/><Picker.Item label="37" value="37"/><Picker.Item
                label="38" value="38"/><Picker.Item label="39" value="39"/>
                <Picker.Item label="40" value="40"/><Picker.Item label="41"
                                                                 value="41"/><Picker.Item
                label="42" value="42"/><Picker.Item label="43" value="43"/><Picker.Item
                label="44" value="44"/><Picker.Item label="45" value="45"/><Picker.Item
                label="46" value="46"/><Picker.Item label="47" value="47"/><Picker.Item
                label="48" value="48"/><Picker.Item label="49" value="49"/>
                <Picker.Item label="50" value="50"/><Picker.Item label="51"
                                                                 value="51"/><Picker.Item
                label="52" value="52"/><Picker.Item label="53" value="53"/><Picker.Item
                label="54" value="54"/><Picker.Item label="55" value="55"/><Picker.Item
                label="56" value="56"/><Picker.Item label="57" value="57"/><Picker.Item
                label="58" value="58"/><Picker.Item label="59" value="59"/>
            </Picker>
            </View>
        <Button mode="contained" style={{width: '60%'}}
                onPress={() => this.submitActivity()}>Confirm</Button>
        <Button mode="contained" style={{backgroundColor: "#b3bec4", width: '60%'}}
        onPress={() => {
            this.toggleTimeModal();
            this.resetForm();
        }}>Cancel</Button>
    </View>
    </View>
    </Modal>
                <Modal animationType={"slide"} transparent={true}
                       visible={this.state.successModal}
                       onDismiss={() => this.toggleSuccessModal()}
                       onRequestClose={() => this.toggleSuccessModal()}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalSuccess}>
                            <Header>CONGRATULATIONS!</Header>
                            <Text style={{fontSize: 18, fontWeight: 'bold', margin: 25}}>You've received 10 badger
                                points</Text>
                            {/*<Button mode="contained" style={{width: '60%'}}*/}
                            {/*        onPress={() => this.toggleSuccessModal()}>OK</Button>*/}
                        </View>
                    </View>
                </Modal>
            </Background>
        );
    }
}
}


const styles = StyleSheet.create({
    body: {
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 1,
        width: 380,

    },
    scroll: {
        paddingVertical: 10,
        height: 480,
        borderWidth: 2,
        borderColor: "#61da88",

    },
    avatarBox: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 5,
        borderWidth: 2,
        borderColor: "#FFF"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        padding: 25,
        marginBottom: 10
    },
    modalView: {
        margin: 20,
        width: 350,
        height: 450,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalSuccess: {
        margin: 20,
        width: 300,
        height: 250,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen);



