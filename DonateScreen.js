import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class DonateScreen extends Component{
  constructor(){
    super()
    this.state = {
      requestedItemsList : []
    }
  this.requestRef= null
  }

  getRequestedItemList =()=>{
    this.requestRef = db.collection("requested_items")
    .onSnapshot((snapshot)=>{
      var requestedItemList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedItemsList : requestedItemList
      });
    })
  }

  componentDidMount(){
    this.getRequestedItemList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}
        subtitleStyle={{ color: 'black', fontSize: 15 }}
        rightElement={
            <TouchableOpacity style={styles.button}
            onPress={()=>{
              this.props.navigation.navigate("ReceiverDetails",{"details":item});
            }}>
              <Text style={{color:'#ffff', fontWeight: "bold"}}>VIEW  </Text>
            </TouchableOpacity>
          }
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="DONATE AN ITEM"/>
        <View style={{flex:1, backgroundColor: "lightblue"}}>
          {
            this.state.requestedItemsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Items</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedItemsList}
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
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "lightblue"
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"blue",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})