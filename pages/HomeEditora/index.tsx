/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AxiosInstance from '../../api/AxiosIntance';
import { showLoading } from '../../components/Loading/ShowLoading';
import { DataContext } from '../../context/DataContext';
import { DadosLivroType } from '../../models/DadosLivroType';
import { incrementLocalData, removeLocalData, retrieveLocalData, storeLocalData } from '../../services/LocalStorageService';


const addFavorite = (dadosLivro:DadosLivroType) => {
  incrementLocalData('favoritos', dadosLivro);
};

const HomeEditora = ({route, navigation}) => {
    const {id} = route.params;

    const {dadosUsuario} = useContext(DataContext);
    const [selectedLivro, setSelectedLivro] = useState(null);
    const [dadosLivro, setDadosLivro] = useState<DadosLivroType[]>([]);
    const [carregar, setCarregar] = useState(false);

    useEffect(() => {
        getLivroByEditora();
    },[]);

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

    console.log(`Editora Id: ${id}`);

    const CardLivro = ({ item }) => {
        return (
        <Card style={styles.cardLivro}>
          <Card.Title title={item.nomeLivro} />
          <TouchableOpacity onPress={() => navigateToHomeLivro(item.codigoLivro)}>
          <Card.Cover source={{uri: item.urlImagem}} />
          </TouchableOpacity>
          <Card.Actions style={{justifyContent:'center'}}>
          <Button onPress={() => addFavorite(item)}><Ionicons name="heart-circle" color="#000" size={36} /></Button>
            <Button onPress={() => addCart(item.codigoLivro)}><Ionicons name="cart" color="#000" size={36} /></Button>
          </Card.Actions>
        </Card>
        );
      };

    const getLivroByEditora = async () => {
        AxiosInstance.get(
            `/livros/por-editora/${id}`,
            {headers: {'Authorization' : `Bearer ${dadosUsuario?.token}`}}
            ).then( resultado => {
              console.log('Dados das livro: ' + JSON.stringify(resultado.data));
              setDadosLivro(resultado.data);
            }).catch((error) => {
              console.log('Ocorreu um erro ' + JSON.stringify(error));
            });
          };

          const navigateToHomeLivro = (id: any) => {
            setSelectedLivro(id);
            navigation.navigate('HomeLivro', { id: id });
          };

    return (

        <FlatList
            data={dadosLivro}
            renderItem={CardLivro}
            keyExtractor={(item, indice) => indice}
            extraData={setSelectedLivro}
        />

    );
};

    const styles = StyleSheet.create({
        cardLivro:{
            marginHorizontal:8,
            padding:10,
            justifyContent: 'center',
        },
    });

export default HomeEditora;
