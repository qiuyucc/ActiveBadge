import  React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Alert, ScrollView,Dimensions } from "react-native";
import Loader from "../components/loader";
import {connect} from "react-redux";
import {FontAwesome5} from "@expo/vector-icons";
import Button from "../components/Button";
import  moment  from  "moment";
import DatePicker from 'react-native-datepicker';
import {fetchActivityReportByActivity,fetchActivityReportByDate,fetchVegieReportByVegie,fetchVegieReportByDate} from "../actions/ActionCreators";
import {
    BarChart,
    PieChart,
    ContributionGraph,
} from "react-native-chart-kit";
import BackButton from "../components/BackButton";





const mapStateToProps = state =>{
    return{
        users: state.userReducer.getUser,
        activityReport1:state.activityReducer.getActivityRecordByActivity,
        activityReport2:state.activityReducer.getActivityRecordByDate,
        vegieReport1:state.vegieReducer.getVegieRecordByVegie,
        vegieReport2:state.vegieReducer.getVegieRecordByDate

    }
}

const mapDispatchToProps = (dispatch) =>({
    fetchActivityReportByActivity:(email,start,end)=>dispatch(fetchActivityReportByActivity(email,start,end)),
    fetchActivityReportByDate:(email,start,end)=>dispatch(fetchActivityReportByDate(email,start,end)),
    fetchVegieReportByVegie:(email,start,end)=>dispatch(fetchVegieReportByVegie(email,start,end)),
    fetchVegieReportByDate:(email,start,end)=>dispatch(fetchVegieReportByDate(email,start,end)),
});


class ReportScreen extends Component{

    state={
        startDate:null,
        endDate:null,
        show:false,
        search:true
    }


    RenderReport(){

        if(this.state.show){
           if(this.props.activityReport1.isLoading &&this.props.activityReport2.isLoading&&this.props.vegieReport1.isLoading&&this.props.vegieReport2.isLoading){
               return(
                 <Loader/>
               );
           }else if (this.props.activityReport1.errors && this.props.activityReport2.errors&&this.props.vegieReport1.errors &&this.props.vegieReport2.errors) {
               return (
                   <View>
                       <Text>{props.activityReport1.errors}</Text>
                       <Text>{props.activityReport2.errors}</Text>
                       <Text>{props.vegieReport1.errors}</Text>
                       <Text>{props.vegieReport2.errors}</Text>
                   </View>
               );
        }else{

               const date =[];
               this.props.activityReport2.recordByDate.map((item)=>{
                   date.push(item.date.substring(5,10));
               })
               date.push('..');
               const mins =[];
               this.props.activityReport2.recordByDate.map((item)=>{
                   mins.push(item.mins);
               })
               mins.push(0);

               const dateVegie =[];
               this.props.vegieReport2.recordByDate.map((item)=>{
                   dateVegie.push(item.date.substring(5,10));
               })
               dateVegie.push('..');
               const nums =[];
               this.props.vegieReport2.recordByDate.map((item)=>{
                   nums.push(item.totalnum);
               })
               nums.push(0);
               const totalNum=[];
               const averageNum=[];
               this.props.vegieReport1.recordByVegie.map((item)=>{
                   totalNum.push(item.totalNum);
                   averageNum.push(item.averageTime);
               });

               const totalTime=[];
               const averageTime=[];
               this.props.activityReport1.recordByActivity.map((item)=>{
                   totalTime.push(item.totalTime);
                   averageTime.push(item.averageTime);
               });

               return(
                   <ScrollView>
                   <View style={{  padding: 10, paddingTop: 20, alignItems: 'center' }}>
                       <BackButton goBack={()=>this.setState({search:true,
                                                                        show:false})}></BackButton>
                       <Text style={{fontSize:20, fontWeight:'bold', margin:10}}>Report :{this.state.startDate}-{this.state.endDate}</Text>
                       <Text style={{fontSize:18, fontWeight:'normal', margin:5}}>Tot Activities Mins: {totalTime[0]} avg: {averageTime[0]} per/day</Text>
                       <Text style={{fontSize:18, fontWeight:'normal', margin:5}}>Tot Vegies Number: {totalNum[0]} avg: {averageNum[0]} per/day</Text>
                       <Text style={{fontSize:20, fontWeight:'bold', margin:10}}>Pie Chart - Activity</Text>

                           <PieChart
                               data={this.props.activityReport1.recordByActivity}
                               width={Dimensions.get("window").width}
                               height={220}
                               chartConfig={{
                                   backgroundColor: "#e26a00",
                                   backgroundGradientFrom: "#fb8c00",
                                   backgroundGradientTo: "#ffa726",
                                   decimalPlaces: 2, // optional, defaults to 2dp
                                   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                   style: {
                                       borderRadius: 16
                                   },
                                   propsForDots: {
                                       r: "6",
                                       strokeWidth: "2",
                                       stroke: "#ffa726"
                                   },
                                   graphStyle:{
                                       marginVertical: 8,
                                   }
                               }
                               }
                               accessor="totalbyActivity"
                               backgroundColor="transparent"
                               paddingLeft="15"
                           ></PieChart>




                           <Text style={{fontSize:20, fontWeight:'bold', margin:10}}>Bar Chart - Activity</Text>
                           <BarChart
                               data={{
                                   labels: date,
                                   datasets: [
                                       {
                                           data: mins
                                       }
                                   ]
                               }}
                               width={Dimensions.get("window").width} // from react-native
                               height={220}
                               chartConfig={{
                                   backgroundColor: '#022173',
                                   backgroundGradientFrom: '#022173',
                                   backgroundGradientTo: '#1b3fa0',
                                   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                   propsForDots: {
                                       r: "6",
                                       strokeWidth: "2",
                                       stroke: "#ffa726"
                                   }
                               }}
                           />



                       <Text style={{fontSize:20, fontWeight:'bold', margin:10}}>Contribution Graph - Activity</Text>
                           <ContributionGraph
                               values={this.props.activityReport2.recordByDate}
                               endDate={new Date("2020-06-01")}
                               numDays={95}
                               width={Dimensions.get("window").width}
                               height={220}
                               chartConfig={{
                                   backgroundColor: '#e26a00',
                                   backgroundGradientFrom: '#fb8c00',
                                   backgroundGradientTo: '#ffa726',
                                   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                   style: {
                                       borderRadius: 16
                                   }
                               }}
                           />

                       <Text style={{fontSize:20, fontWeight:'bold', margin:10}}>Pie Chart - Vegie</Text>
                       <PieChart
                           data={this.props.vegieReport1.recordByVegie}
                           width={Dimensions.get("window").width}
                           height={220}
                           chartConfig={{
                               backgroundColor: "#e26a00",
                               backgroundGradientFrom: "#fb8c00",
                               backgroundGradientTo: "#ffa726",
                               decimalPlaces: 2, // optional, defaults to 2dp
                               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                               labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                               style: {
                                   borderRadius: 16
                               },
                               propsForDots: {
                                   r: "6",
                                   strokeWidth: "2",
                                   stroke: "#ffa726"
                               }
                           }}
                           accessor="totalbyVegie"
                           backgroundColor="transparent"
                           paddingLeft="15"
                       ></PieChart>
                       <Text style={{fontSize:20, fontWeight:'bold', margin:10}}>Bar Chart - Vegie</Text>
                       <BarChart
                           data={{
                               labels: dateVegie,
                               datasets: [
                                   {
                                       data: nums
                                   }
                               ]
                           }}
                           width={Dimensions.get("window").width} // from react-native
                           height={220}
                           chartConfig={{
                               backgroundColor: '#26872a',
                               backgroundGradientFrom: '#43a047',
                               backgroundGradientTo: '#66bb6a',
                               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                               style: {
                                   borderRadius: 16
                               },
                               propsForDots: {
                                   r: "6",
                                   strokeWidth: "2",
                                   stroke: "#ffa726"
                               }
                           }}
                       />

                       <Text style={{fontSize:20, fontWeight:'bold', margin:10}}>Contribution Graph - Vegie</Text>
                       <ContributionGraph
                           values={this.props.vegieReport2.recordByDate}
                           endDate={new Date("2020-06-01")}
                           numDays={95}
                           width={Dimensions.get("window").width}
                           height={220}
                           chartConfig={{
                               backgroundColor: '#b90602',
                               backgroundGradientFrom: '#e53935',
                               backgroundGradientTo: '#ef5350',
                               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                               style: {
                                   borderRadius: 16
                               }
                           }}
                       />

                   </View>
                   </ScrollView>
               );
           }
        }
        else{
            return  null;
        }
    }

    RenderHeader(){
        if(this.state.search){
            const {users: {userDetails}} = this.props;
            const email = userDetails? userDetails.email:"";
            return(
                <View colors={[, '#1da2c6', '#1695b7']}
                      style={{ backgroundColor: '#ccb5f4', padding: 10, paddingTop: 20, alignItems: 'center' }}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Start Date</Text>
                        <DatePicker
                            style={{flex: 2, marginRight: 20}}
                            date={this.state.startDate}
                            format='YYYY-MM-DD'
                            mode="date"
                            placeholder="start date"
                            minDate="2020-04-02"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => {this.setState({startDate: date,show:false})}}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>End Date</Text>
                        <DatePicker
                            style={{flex: 2, marginRight: 20}}
                            date={this.state.endDate}
                            format='YYYY-MM-DD'
                            mode="date"
                            placeholder="start date"
                            minDate="2020-04-02"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.setState({endDate: date, show:false})}}
                        />
                    </View>
                    <Button mode="outlined" style={{width:'60%'}} onPress={()=>{this.loadReportData(email);this.setState({search:!this.state.search})}}>Generate Report</Button>
                </View>
            );
        }else{
            return null
        }

    }
    render(){
        return(
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <SafeAreaView style={{flex: 1}}>
                    <TouchableOpacity
                        style={{alignItems: "flex-start", margin: 16}}
                        onPress={this.props.navigation.openDrawer}>
                        <FontAwesome5 name="bars" size={24} color="#161924"/>
                    </TouchableOpacity>
                    {this.RenderHeader()}
                    {this.RenderReport()}
                </SafeAreaView>
            </View>
        );
    }


    loadReportData(email) {
        const start = this.state.startDate;
        const end = this.state.endDate;
        if(start ==null ||end ==null || end<=start){
            Alert.alert(
                'Date Error!',
                'Please select date or wrong date!',
                [
                    {
                        text: 'Cancel',
                        onPress: () => {console.log('Cancel Pressed');this.setState({search:true})},
                        style: 'cancel',
                    },
                ]
            );
        }else{
            this.props.fetchActivityReportByActivity(email,start,end);
            this.props.fetchActivityReportByDate(email,start,end);
            this.props.fetchVegieReportByVegie(email,start,end);
            this.props.fetchVegieReportByDate(email,start,end);
            this.setState({show:true});
        }
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        padding: 25,
        marginBottom: 10
    },

    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 3,
        flexDirection: 'row',
        margin: 30
    },
    formLabel: {
        fontSize: 18,
        color: 'white',
        flex: 1
    },

});

export default connect(mapStateToProps,mapDispatchToProps)(ReportScreen);