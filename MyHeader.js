import * as React from 'react';
import {Header} from 'react-native-elements';

const MyHeader = props => {
    return (
        <Header 
            centerComponent={{ 
                text: props.title, 
                style: { color: 'white', fontSize:20, fontWeight:"bold"} 
            }}
            backgroundColor = "darkblue"
      />
    )
}

export default MyHeader;