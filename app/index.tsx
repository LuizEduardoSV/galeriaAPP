import AddButton from "@/components/AddButton";
import DeleteButton from "@/components/DeleteButton";
import SaveButton from "@/components/SaveButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const STORAGE_NAME = 'galeria';
  const [image, setImage] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | undefined>(undefined);
  const [listaFotos, setListaFotos] = useState<Array<string>>([]);

  const storeImage = async (value : string) => {
    try {
      const fotos =[...listaFotos, value];
      setListaFotos(fotos);
      await AsyncStorage.setItem(STORAGE_NAME,  JSON.stringify(fotos));
      setImage(null);
      Alert.alert("Imagem Salva");
    } catch (error) {
      console.error("Erro ao salvar a imagem");
    }
  };

  const getImage = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_NAME);
      if (value !== null) {
        setListaFotos(JSON.parse(value));
      }
    } catch (error) {
      console.error("Erro ao carregar imagens");
    }
  };

  const removeImage = async ( indice : number) => {
    try {
      const lista = [...listaFotos];
      lista.splice(indice, 1);
      if(lista.length > 0){
        await AsyncStorage.setItem(STORAGE_NAME, JSON.stringify(lista));
        setListaFotos(lista);
      } else {
        await AsyncStorage.removeItem(STORAGE_NAME);
        setListaFotos([]);
      }
    } catch (e) {
      console.error('Erro ao excluir a imagem');
    }
  }

  const addFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFileSize(result.assets[0]?.fileSize)
    }
  }

  const convertBytesToHuman = (size: number | undefined) => {
    if (size == undefined) {
      return "";
    }
    const kb = size / 1024;
    const mb = kb / 1024;
    if (mb > 1) {
      return `${mb.toFixed(2)} Mb`;
    }
    return `${kb.toFixed(2)} Kb`;
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📸 Galeria</Text>
      <Text style={styles.subtitle}>Gerencie suas imagens com facilidade</Text>

      {/* Botão Add centralizado */}
      <View style={styles.addButtonWrapper}>
        <AddButton onPress={addFoto} />
      </View>

      {image && (
        <View style={styles.previewCard}>
          <Image source={{ uri: image }} style={styles.previewImage} />
          <Text style={styles.fileInfo}>{convertBytesToHuman(fileSize)}</Text>
          <SaveButton onPress={() => storeImage(image)} />
        </View>
      )}

      {listaFotos.length > 0 && (
        <Text style={styles.sectionTitle}>Suas Imagens</Text>
      )}

      <ScrollView contentContainerStyle={styles.gallery}>
        {listaFotos.map((foto, indice) => (
          <View style={styles.imageCard} key={indice}>
            <Image source={{ uri: foto }} style={styles.image} />
            <DeleteButton onPress={() => removeImage(indice)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // fundo clean
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 20,
  },
  addButtonWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  previewCard: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  previewImage: {
    width: 240,
    height: 240,
    borderRadius: 12,
    marginBottom: 10,
  },
  fileInfo: {
    fontSize: 13,
    color: "#475569",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
    marginVertical: 15,
  },
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingBottom: 30,
  },
  imageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 10,
    margin: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 5,
  },
});
