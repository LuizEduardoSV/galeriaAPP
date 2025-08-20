import React from "react";
import { TouchableOpacity, Text, StyleSheet} from "react-native";
 
const SaveButton = ({onPress}) => {
  return (
      <TouchableOpacity style={style.button} onPress={onPress}>
            <Text style={style.text}>Salvar</Text>
      </TouchableOpacity>
  );
}
 
const style = StyleSheet.create({
    button: {
        width: 120,
        height: 30,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#85f778ff"
 
      },
    text:{
        color: "#ffffffff",
        fontSize:20,
    }
   
});
 
export default SaveButton;