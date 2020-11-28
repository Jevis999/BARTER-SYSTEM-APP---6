import * as React from 'react';
import {Text, View, StyleSheet, TextInput, 
TouchableOpacity,KeyboardAvoidingView, Alert} from 'react-native';
import db from '../config';
import {Header,Icon,Card} from 'react-native-elements';
import firebase from 'firebase';

export default class ReceiverDetailsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            receiverId: this.props.navigation.getParam("details")["user_id"],
            requestId: this.props.navigation.getParam("details")["request_id"],
            itemName: this.props.navigation.getParam("details")["item_name"],
            reason_for_requesting: this.props.navigation.getParam("details")["reason_to_request"],
            receiverName: "",
            receiverContact: "",
            receiverAddress: "",
            receiverRequestDocId: "",
            userName: this.props.navigation.getParam("details")["firstName"]
        }
    }

    getReceiverDetails=()=>{
        db.collection("users").where("emailId","==",this.state.userId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    receiverName: doc.data().firstName,
                    receiverContact: doc.data().contact,
                    receiverAddress: doc.data().address,
                })
            })
        })
        db.collection("requested_items").where("request_id","==",this.state.requestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({receiverRequestDocId: doc.id});
            })
        })
    }

    componentDidMount(){
        this.getReceiverDetails();
    }

    updateItemStatus=()=>{
        db.collection("all_donations").add({
            item_name: this.state.itemName,
            request_id: this.state.requestId,
            requested_by: this.state.receiverName,
            donor_id: this.state.userId,
            request_status: "Donor Interested"
        })
    }

    addNotification=()=>{
        var message = this.state.receiverName + " has shown interest in donating the item";
        db.collection("all_notifications").add({
            "donor_id": this.state.userId,
            "request_id": this.state.requestId,
            "item_name": this.state.itemName,
            "date": firebase.firestore.FieldValue.serverTimestamp(),
            "notification_status": "unread",
            "message": message
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={{flex: 0.1}}>
                    <Header 
                    leftComponent={<Icon name="arrow-left" type="feather"
                                    color="#696969" 
                                    onPress={()=>this.props.navigation.goBack()}/>}
                    centerComponent={{text: "DONATE ITEMS",
                                    style: {color: "white", fontSize: 20, fontWeight: "bold"}}}
                    backgroundColor = "darkblue"/>
                </View>

                <View style={{flex: 0.8, 
                                marginTop: 80, 
                                backgroundColor: "lightblue", 
                                borderWidth: 3,
                                margin: 10,
                                borderRadius: 10}}>
                    <Text style={{fontWeight: "bold", fontSize: 18, textAlign: "center"}}>
                        ITEM DESCRIPTION
                    </Text>
                    <Card>
                        <Text style={{fontWeight: "bold"}}>NAME: {this.state.itemName}</Text>
                    </Card>
                    <Card>
                        <Text style={{fontWeight: "bold"}}>REASON: {this.state.reason_for_requesting}</Text>
                    </Card>
                </View>

                <View 
                style={styles.box}>
                    <Text 
                    style={{fontWeight: "bold", fontSize: 18, textAlign: "center"}}>
                        RECEIVER INFORMATION
                    </Text>
                    <Card>
                            <Text style={{fontWeight: "bold"}}>NAME: {this.state.receiverName}</Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight: "bold"}}>CONTACT: {this.state.receiverContact}</Text>
                        </Card>
                        <Card>
                            <Text style={{fontWeight: "bold"}}>ADDRESS: {this.state.address}</Text>
                        </Card>
                </View>

                <View style={styles.buttonContainer}>
                    {
                        this.state.receiverId !== this.state.userId
                        ? (
                            <TouchableOpacity style={styles.button}
                            onPress={()=>{
                            this.updateItemStatus();
                            this.addNotification();
                            //this.props.navigation.navigate("MyDonations");
                            }}>
                                <Text style={{fontWeight: "bold", color: "white", textAlign: "center"}}>
                                    I WANT TO DONATE THIS
                                </Text>
                            </TouchableOpacity>
                        )
                        : null
                    }
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    buttonContainer : {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:200,
      height:50,
      marginTop: 5,
      justifyContent:'center',
      alignItems : 'center',
      borderRadius: 15,
      backgroundColor: 'darkblue',
    },
    box: {
        flex: 1, 
        marginTop: 40, 
        backgroundColor: "lightblue", 
        borderWidth: 3,
        margin: 10,
        borderRadius: 10}
  })