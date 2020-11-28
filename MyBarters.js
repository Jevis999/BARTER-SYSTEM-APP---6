import React, { Component } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert} from 'react-native';
import {Card,ListItem,Icon} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class MyBarters extends React.Component {
    static navigationOptions = {header: null}

    constructor(){
        super();
        this.state = {
            donorId: firebase.auth().currentUser.email,
            allDonations: [],
            donorName: "",
        }
        this.requestRef = null;
    }

    getAllDonations=()=>{
        this.requestRef = db.collection("all_donations")
        .where("donor_id","==",this.state.donorId)
        .onSnapshot((snapshot)=>{
            var allDonations = snapshot.docs.map(document=>document.data());
            this.setState({allDonations: allDonations});
        })
    }

    componentDidMount(){
        this.getAllDonations();
    }

    keyExtractor =(item,index)=> index.toString();

    renderItem=({item,i})=>(
        <ListItem 
        key={i}
        title={item.item_name}
        subtitle = {"Requested by: " + item.requested_by + "\nStatus:" + item.request_status}
        leftElement={<Icon icon name="list" color="#696969"
        titleStyle={{color: "black", fontWeight: "bold"}}/>}
        rightElement={
        <TouchableOpacity 
        style={[styles.button, 
                {backgroundColor: item.request_status==="item Sent" ? "green" : "#ff5722"}]}>
            <Text style={{color: "white"}}>
                {item.request_status === "item Sent" ? "item Sent" : "Send item"}
            </Text>
        </TouchableOpacity>}
        bottomDivider />
    )

    componentWillUnmount(){
        this.requestRef();
    }

    render(){
        return(
          <View style={{flex:1}}>
            <MyHeader navigation={this.props.navigation} title="My Donations"/>
            <View style={{flex:1}}>
              {
                this.state.allDonations.length === 0
                ?(
                  <View style={styles.subtitle}>
                    <Text style={{ fontSize: 20}}>List of all item Donations</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allDonations}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }   
}

const styles = StyleSheet.create({
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
      elevation : 16
    },
    subtitle :{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }
  })
  