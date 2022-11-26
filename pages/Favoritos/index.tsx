/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showLoading } from '../../components/Loading/ShowLoading';
import { DadosLivroType } from '../../models/DadosLivroType';
import { clearStorage, incrementLocalData, removeFromFavoritosByKeyAndValue, removeLocalData, retrieveLocalData, storeLocalData } from '../../services/LocalStorageService';

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item}</Text>
    </View>
  );

  const CardLivro = ({ item }) => {

    return (
    <Card style={styles.cardLivro}>
      <Card.Title title={item.nomeLivro} />
      <Card.Cover source={{uri: item.urlImagem}} />
      <Card.Actions style={{justifyContent:'center'}}>
      <Button onPress={() => removeFromFavoritosByKeyAndValue('favoritos', item.codigoLivro)}>  <Ionicons name="close-circle-outline" color="#363636" size={35} /></Button>
      </Card.Actions>
    </Card>
    );
  };

  const Favoritos = () => {

    const [favoritos, setFavoritos] = useState<DadosLivroType[]>([]);
    const [carregar, setCarregar] = useState(false);

    const ListarFavoritos = async () => {
      const data = await retrieveLocalData('favoritos');
      console.log('data',data);
      if (data){
      let temp = JSON.parse(data);
      setFavoritos(temp);
      }
    };

    useEffect(() => {
      ListarFavoritos();
    },[favoritos]);

    useEffect(() =>{
      setCarregar(true);
      setTimeout(() => {
          setCarregar(false);
      }, 500);
  },[]);

  if (carregar === true) {
    return (
      showLoading()
    );
  }

    return (
      <SafeAreaView style={styles.container}>
          <FlatList
            data={favoritos}
            renderItem={CardLivro}
            keyExtractor={(item, indice) => indice}
            />
        </SafeAreaView>

    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    cardLivro: {
      marginHorizontal: 8,
      padding:10,
      justifyContent:'center',
    },
    scrollView: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default Favoritos;
