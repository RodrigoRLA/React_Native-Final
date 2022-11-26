/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AxiosInstance from '../../api/AxiosIntance';
import { showLoading } from '../../components/Loading/ShowLoading';
import { DataContext } from '../../context/DataContext';
import { DadosLivroType } from '../../models/DadosLivroType';
import { incrementLocalData, removeLocalData, retrieveLocalData, storeLocalData } from '../../services/LocalStorageService';

const HomeLivro = ({route, navigation}) => {
    const {id} = route.params;

    console.log(`Livro: ${id}`);

    const {dadosUsuario} = useContext(DataContext);
    const [selectedLivro, setSelectedLivro] = useState(0);
    const [dadosLivro, setDadosLivro] = useState<DadosLivroType>();
    const [carregar, setCarregar] = useState(false);

    const addFavorite = (dadosLivro:DadosLivroType) => {
      incrementLocalData('favoritos', dadosLivro);
    };

    useEffect(() => {
        getLivroById();
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

      const getLivroById = async () => {
        AxiosInstance.get(
            `/livros/${id}`,
            {headers: {'Authorization' : `Bearer ${dadosUsuario?.token}`}}
            ).then( resultado => {
              console.log('Dados das livro: ' + JSON.stringify(resultado.data));
              setDadosLivro(resultado.data);
            }).catch((error) => {
              console.log('Ocorreu um erro ' + JSON.stringify(error));
            });
          };

    return (
        <View style={styles.container}>
                    <View style={styles.cabecalho}>
                        <Image style={{width: 300,height: 350 }}
                            source={{ uri: dadosLivro?.urlImagem }}/>
                    </View>
                    <View style={styles.conteudo}>
                        <Title style={styles.titulo}> {dadosLivro?.nomeLivro}</Title>
                        <Text style={styles.sub}>{dadosLivro?.autorDTO.nomeAutor}</Text>
                        <Text style={styles.sub}>{dadosLivro?.editoraDTO.nomeEditora}</Text>
                    </View>
        <View style={styles.rodape}>
            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <Button onPress={() => addFavorite(dadosLivro)}><Ionicons name="heart-circle" color="#000" size={50} /></Button>
                <Button onPress={() => addCart(dadosLivro?.codigoLivro)}><Ionicons name="cart" color="#000" size={50} /></Button>
            </View>
        </View>
    </View>
    );
};
export const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    cabecalho:{
      flex: 2,
      marginTop:50,
      justifyContent: 'flex-end',
      alignItems: 'center',

    },
    conteudo:{
      flex: 0.5,
      padding: 20,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    titulo:{
      fontWeight: 'bold',
      fontSize: 23,
    },
    sub:{
      fontWeight: 'bold',
      fontSize: 15,
    },
    rodape:{
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',

    },

  });

export default HomeLivro;
