import React, {Component} from 'react';
import {
    View,
    Platform,
    Text,
    ScrollView,
    Image,
    Picker,
    StyleSheet,
    Alert,
    Modal, TextInput, ImageBackground, TouchableOpacity, SafeAreaView
} from 'react-native';
import {connect} from "react-redux";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import {theme} from "../core/theme";
import {updateProfile} from "../actions/auth.actions";
import {ErrorUtils} from "../core/auth.utils";
import {FontAwesome5} from "@expo/vector-icons";
import BackButton from "../components/BackButton";


const styles = StyleSheet.create({
    button: {
        marginTop: 20,
    },
    textStyle: {
        fontSize: 16,
        color: theme.colors.secondary,
        paddingHorizontal: 6,
        paddingTop: 4,
    }, formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    formItem: {
        flex: 1
    },
    formItemInput: {
        flex: 1,
        borderColor: "#6c059c",
        borderWidth: 1,
        paddingLeft: 6,
        height: 45,
        margin: 10
    },
    profileContent: {
        flex: 2,
        fontSize: 18,
        fontWeight: 'bold',
        borderColor: "#ccd9e0",
        borderWidth: 1,
        paddingLeft: 6,
        margin: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        padding:25,
        marginBottom:10
    },
    modalView: {
        margin: 20,
        width: 350,
        height: 600,
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
    profileText: {
        flex:1,
        fontSize: 18,
        fontWeight: 'bold'
    },
    profileView: {
        justifyContent: 'center',
        margin: 40,
        padding: 10
    }
});

class ProfileScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            age: 6,
            gender: "Female",
            suburb:"",
            states: "Victoria",
            createProfileModal: false
        }
    }


    toggleCreateProfileModal() {
        this.setState({createProfileModal: !this.state.createProfileModal});
    }

    resetForm() {
        this.setState({
            age: 6,
            gender: "Female",
            suburb: "",
            states: "Victoria"
        })
    }

    onSubmit(){


        const age= this.state.age;
        const gender = this.state.gender;
        const states = this.state.states;
        const suburb = this.state.suburb;
        this.updateProfile(age,gender,states,suburb);
        this.resetForm();
    }

    updateProfile= async(age,gender,states,suburb) =>{
        try{
            const response = await this.props.dispatch(updateProfile(age,gender,states,suburb));
            if(!response.success){
                throw response;
            }
        }catch(error){
            const newError = new ErrorUtils(error, "upload profile error");
            newError.showAlert();
        }
    }

    render() {

        const {getUser: {userDetails}} = this.props;
        if (userDetails.age === 0) {
            return (
                <Background>
                    <BackButton goBack={() => this.props.navigation.navigate('Home')}/>
                    <Text style={styles.textStyle}>
                        Seems you haven't create profile yet?
                    </Text>
                    <Button mode="contained" style={styles.button} onPress={() => this.toggleCreateProfileModal()}>Create
                        profile</Button>

                    <Modal animationType={"slide"} transparent={true}
                           visible={this.state.createProfileModal}
                           onDismiss={() => this.toggleCreateProfileModal()}
                           onRequestClose={() => this.toggleCreateProfileModal()}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Header>Create your profile</Header>
                                <View style={styles.formRow}>
                                    <Text style={styles.profileText}>Age </Text>
                                    <Picker
                                        style={styles.formItem}
                                        selectedValue={this.state.age}
                                        onValueChange={(itemValue, itemIndex) => this.setState({age: itemValue})}>
                                        <Picker.Item label="6" value="6"/>
                                        <Picker.Item label="7" value="7"/>
                                        <Picker.Item label="8" value="8"/>
                                        <Picker.Item label="9" value="9"/>
                                        <Picker.Item label="10" value="10"/>
                                        <Picker.Item label="11" value="11"/>
                                        <Picker.Item label="12" value="12"/>
                                        <Picker.Item label="13" value="13"/>
                                        <Picker.Item label="14" value="14"/>
                                        <Picker.Item label="15" value="15"/>
                                        <Picker.Item label="16" value="16"/>
                                    </Picker>
                                </View>
                                <View style={styles.formRow}>
                                    <Text style={styles.profileText}>Gender</Text>
                                    <Picker
                                        style={styles.formItem}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                                        <Picker.Item label="Female" value="Female"/>
                                        <Picker.Item label="Male" value="Male"/>
                                    </Picker>
                                </View>
                                <View style={styles.formRow}>
                                    <Text style={styles.profileText}>State</Text>
                                    <Picker
                                        style={styles.formItem}
                                        selectedValue={this.state.states}
                                        onValueChange={(itemValue, itemIndex) => this.setState({states: itemValue})}>
                                        <Picker.Item label="New South Wales" value="New South Wales"/>
                                        <Picker.Item label="Victoria" value="Victoria"/>
                                        <Picker.Item label="Queensland" value="Queensland"/>
                                        <Picker.Item label="Western Australia" value="Western Australia"/>
                                        <Picker.Item label="South Australia" value="South Australia"/>
                                        <Picker.Item label="Tasmania" value="Tasmania"/>
                                    </Picker>
                                </View>

                                <View style={styles.formRow}>
                                    <Text style={styles.profileText}>Suburb</Text>
                                    <TextInput style={styles.formItemInput} value={this.state.suburb}
                                               onChangeText={(value) => this.setState({suburb: value})}/>
                                </View>
                                <Button mode="contained" style={styles.button}
                                        onPress={() => {this.toggleCreateProfileModal();this.onSubmit();}}>Save</Button>
                                <Button mode="contained" style={{backgroundColor: "#b3bec4"}}
                                        onPress={() => {this.toggleCreateProfileModal();this.resetForm();}}>Cancel</Button>
                            </View>
                        </View>
                    </Modal>
                </Background>
            );
        } else {
            return (
                <View style={styles.centeredView}>
                    <BackButton goBack={() => this.props.navigation.navigate('Home')}/>
                    <Header>
                        Hi, How are you badger?
                    </Header>
                    <View style={styles.formRow}>
                        <Text style={styles.profileText}>Username </Text>
                        <Text style={styles.profileContent}>{userDetails ? userDetails.username : ""}</Text>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.profileText}>Age </Text>
                        <Text style={styles.profileContent}>{userDetails ? userDetails.age : ""}</Text>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.profileText}>Gender </Text>
                        <Text style={styles.profileContent}>{userDetails ? userDetails.gender : ""}</Text>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.profileText}>State </Text>
                        <Text style={styles.profileContent}>{userDetails ? userDetails.state : ""}</Text>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.profileText}>Suburb </Text>
                        <Text style={styles.profileContent}>{userDetails ? userDetails.suburb : ""}</Text>
                    </View>

                    <Button mode="contained" style={{width: '60%' }} onPress={() => this.toggleCreateProfileModal()}>Update
                        Profile</Button>
                    <Button mode="contained" style={{backgroundColor: "#b3bec4",width:'60%'}}
                            onPress={() => {this.props.navigation.navigate('Home');}}>Cancel</Button>
                    <Modal animationType={"slide"} transparent={true}
                           visible={this.state.createProfileModal}
                           onDismiss={() => this.toggleCreateProfileModal()}
                           onRequestClose={() => this.toggleCreateProfileModal()}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Header>Update your profile</Header>
                                <View style={styles.formRow}>
                                    <Text style={styles.profileText}>Age </Text>
                                    <Picker
                                        style={styles.formItem}
                                        selectedValue={this.state.age}
                                        onValueChange={(itemValue, itemIndex) => this.setState({age: itemValue})}>
                                        <Picker.Item label="6" value="6"/>
                                        <Picker.Item label="7" value="7"/>
                                        <Picker.Item label="8" value="8"/>
                                        <Picker.Item label="9" value="9"/>
                                        <Picker.Item label="10" value="10"/>
                                        <Picker.Item label="11" value="11"/>
                                        <Picker.Item label="12" value="12"/>
                                        <Picker.Item label="13" value="13"/>
                                        <Picker.Item label="14" value="14"/>
                                        <Picker.Item label="15" value="15"/>
                                        <Picker.Item label="16" value="16"/>
                                    </Picker>
                                </View>
                                <View style={styles.formRow}>
                                    <Text style={styles.profileText}>Gender</Text>
                                    <Picker
                                        style={styles.formItem}
                                        selectedValue={this.state.gender}
                                        onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                                        <Picker.Item label="Female" value="Female"/>
                                        <Picker.Item label="Male" value="Male"/>
                                    </Picker>
                                </View>
                                <View style={styles.formRow}>
                                    <Text style={styles.profileText}>State</Text>
                                    <Picker
                                        style={styles.formItem}
                                        selectedValue={this.state.states}
                                        onValueChange={(itemValue, itemIndex) => this.setState({states: itemValue})}>
                                        <Picker.Item label="New South Wales" value="New South Wales"/>
                                        <Picker.Item label="Victoria" value="Victoria"/>
                                        <Picker.Item label="Queensland" value="Queensland"/>
                                        <Picker.Item label="Western Australia" value="Western Australia"/>
                                        <Picker.Item label="South Australia" value="South Australia"/>
                                        <Picker.Item label="Tasmania" value="Tasmania"/>
                                    </Picker>
                                </View>

                                <View style={styles.formRow}>
                                    <Text style={styles.profileText}>Suburb</Text>
                                    <TextInput style={styles.formItemInput} value={this.state.suburb}
                                               defaultValue={userDetails ? userDetails.suburb : ""}
                                               onChangeText={(value) => this.setState({suburb: value})}/>
                                </View>
                                <Button mode="contained" style={styles.button}
                                        onPress={() => {this.toggleCreateProfileModal();this.onSubmit();}}>Save</Button>
                                <Button mode="contained" style={{backgroundColor: "#b3bec4"}}
                                        onPress={() => {this.toggleCreateProfileModal();this.resetForm();}}>Cancel</Button>
                            </View>
                        </View>
                    </Modal>
                </View>
            );
        }

    }


}

const mapStateToProps = state => {
    return {
        getUser: state.userReducer.getUser
    }
}


const mapDispatchToProps=dispatch =>({
    dispatch
    }
)

export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen);