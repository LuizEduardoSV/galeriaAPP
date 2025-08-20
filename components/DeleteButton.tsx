// SaveButton.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SaveType{
  onPress: () => {}
}
const SaveButton = ({onPress} : SaveType) => {
  return (
      <TouchableOpacity style={style.button} onPress={onPress}>
            <Text style={style.text}>Salvar</Text>
     </TouchableOpacity>
  );
}

const style = StyleSheet.create({
    button: {
        width: 100,
        height: 50,
        borderRadius:10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#f35151ff"
      },
    text:{
        color: "#ffffffff",
        fontSize:20,        
    }
});

export default SaveButton;