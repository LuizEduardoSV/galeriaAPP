import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface AddType {
  onPress: () => {}
}
const AddButton = ({onPress} : AddType) => {
  return (
      <TouchableOpacity style={style.button} onPress={onPress}>
            <Text style={style.text}>Add</Text>
     </TouchableOpacity>
  );
}

const style = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius:30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#6581ffff"
      },
    text:{
        color: "#ffffffff",
        fontSize:30,        
    }
});

export default AddButton;