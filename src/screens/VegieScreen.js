import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, View, ScrollView, Image, Text, Modal, Picker} from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from "../components/loader";
import BackButton from "../components/BackButton";
import {baseUrl} from "../Redux/imageUrl";
import {connect} from "react-redux";
import {postVegieRecord} from "../actions/ActionCreators";
import {updatePoint} from "../actions/auth.actions";
import {ErrorUtils} from "../core/auth.utils";

const mapStateToProps = state =>{
    return{
        users:state.userReducer.getUser,
        vegies: state.vegieReducer.getVegie,
    }
}

const mapDispatchToProps = dispatch=>({
    dispatch,
    postVegieRecord:(user,name,description,date,count) =>dispatch(postVegieRecord(user,name,description,date,count))
})

class VegieScreen extends Component{

    constructor(props) {
        super(props);

        this.state = {
            user: "",
            name: "",
            point:0,
            count:0,
            description: "",
            quantityModal: false,
            successModal: false,
        }
    }
    toggleQuantityModal(){
        this.setState({quantityModal:!this.state.quantityModal})
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

    submitVegie(){
        const now = new Date();
        const date = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
        const user = this.state.user;
        const name = this.state.name;
        const description = this.state.description;
        const point = parseInt(this.state.point) +10;
        const count = this.state.count;
        this.props.postVegieRecord(user,name,description,date,count);
        this.updatePoint(point);

        this.toggleSuccessModal();
        this.toggleQuantityModal();
    }

    resetForm()
    {
        this.setState({
            user: "",
            name: "",
            point:0,
            count:0,
            description: "",
        })
    }

    render(){
        const {users: {userDetails}} = this.props;
        if(this.props.vegies.isLoading){
            return(
                <Loader/>
            );
        }else if(this.props.vegies.errors){
            return(
                <View>
                    <Text>{props.vegies.errors}</Text>
                </View>
            );
        }else{
            return (
                <Background>
                    <BackButton goBack={() => this.props.navigation.navigate('Home')}/>
                    <Header>Select Your Vegie</Header>
                    <Text style={{fontSize:16, fontWeight:'bold', margin:5}}>What fruit / veg did you eat today?</Text>
                    <View style={styles.body}>
                        <ScrollView style={styles.scroll}
                                    keyboardShouldPersistTaps="always">
                            <View style={styles.avatarBox}>
                                {this.props.vegies.vegieDetails.map((item) => {
                                    return (
                                        <TouchableOpacity key={item.id}  onPress={() => {
                                            this.setState({
                                                name: item.name,
                                                description: item.description,
                                                user: userDetails.email,
                                                point: userDetails.point
                                            });
                                            this.toggleQuantityModal();
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
                           visible={this.state.quantityModal}

                           onRequestClose={() => this.toggleQuantityModal()}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', margin: 25}}>Quantity needed for Fruit / Veg</Text>
                                <Text style={{fontSize: 30, borderColor: '#a02bff', borderWidth: 1}}>
                                    {this.state.count} Each / Box </Text>
                                <View style={styles.formRow}>
                                    <Picker style={{flex: 2}}
                                            selectedValue={this.state.count}
                                            onValueChange={(itemValue, itemIndex) => this.setState({count: itemValue})}>
                                        <Picker.Item label="0" value="0"/>
                                        <Picker.Item label="1" value="1"/>
                                        <Picker.Item label="2" value="2"/>
                                        <Picker.Item label="3" value="3"/>
                                        <Picker.Item label="4" value="4"/>
                                        <Picker.Item label="5" value="5"/>
                                        <Picker.Item label="6" value="6"/>
                                    </Picker>
                                </View>
                                <Button mode="contained" style={{width: '60%'}}
                                        onPress={() => this.submitVegie()}>Confirm</Button>
                                <Button mode="contained" style={{backgroundColor: "#b3bec4", width: '60%'}}
                                        onPress={() => {
                                            this.toggleQuantityModal();
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

export default connect(mapStateToProps,mapDispatchToProps)(VegieScreen);



