/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AxiosInstance from '../../api/AxiosIntance';
import { showLoading } from '../../components/Loading/ShowLoading';
import { DataContext } from '../../context/DataContext';
import { DadosEditoraType } from '../../models/DadosEditoraType';
import { DadosLivroType } from '../../models/DadosLivroType';
import { incrementLocalData, removeLocalData, retrieveLocalData, storeLocalData } from '../../services/LocalStorageService';

const Item = ({ item, eventoPressionarBotao }) => (
  <TouchableOpacity onPress={eventoPressionarBotao}
      style={styles.btnItem}
  >
    <Image source={{uri: item.urlImagem}} resizeMode="contain" style={styles.imgItem} />
    <Text style={[styles.title]}>{item.nomeEditora}</Text>
  </TouchableOpacity>
);

const addFavorite = (dadosLivro:DadosLivroType) => {
  incrementLocalData('favoritos', dadosLivro);
};

function Home({navigation}) {

  const {dadosUsuario} = useContext(DataContext);
  const [carregar, setCarregar] = useState(false);
  const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedLivro, setSelectedLivro] = useState(null);
  const [dadosLivro, setDadosLivro] = useState<DadosLivroType[]>([]);

useEffect(() =>{
    setCarregar(true);
    setTimeout(() => {
        setCarregar(false);
    }, 500);
},[]);

useEffect(() => {

  const stackNavigator = navigation.getParent();
  if (stackNavigator){
    stackNavigator.setOptions({ title: `Bem-vindo, ${dadosUsuario.nome}`});
  }
  getAllEditoras();
  getAllLivros();
},[]);

const CardLivro = ({ item }) => {
  return (
  <Card style={styles.cardLivro} >
    <Card.Title title={item.nomeLivro} subtitle={item.editoraDTO.nomeEditora} />
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

const getAllEditoras = async () => {
  AxiosInstance.get(
  '/editoras',
  {headers: {'Authorization' : `Bearer ${dadosUsuario.token}`}}
  ).then( resultado => {
    // console.log('Dados das Editoras: ' + JSON.stringify(resultado.data));
    setDadosEditora(resultado.data);
  }).catch((error) => {
    // console.log('Ocorreu um erro ' + JSON.stringify(error));
  });
};

const getAllLivros = async () => {
  AxiosInstance.get(
    '/livros',
    {headers: {'Authorization' : `Bearer ${dadosUsuario?.token}`}}
  ).then( resultado => {

    setDadosLivro([]);
    let arrayLivros = resultado.data;
    arrayLivros.map(key => (
      setDadosLivro(current => [...current, {
        codigoLivro: key.codigoLivro,
        nomeLivro: key.nomeLivro,
        dataLancamento: key.dataLancamento,
        codigoIsbn: key.codigoIsbn,
        nomeImagem: key.nomeImagem,
        nomeArquivoImagem: key.nomeArquivoImagem,
        urlImagem: key.urlImagem,
        editoraDTO: {
          codigoEditora: key.editoraDTO.codigoEditora,
          nomeEditora: key.editoraDTO.nomeEditora,
        },
        autorDTO: {
          codigoAutor: key.autorDTO.codigoAutor,
          nomeAutor: key.autorDTO.nomeAutor,
        },
      }])
    ));
  }).catch((error) => {
    console.log('Ocorreu um erro ao recuperar os dados dos Livros: ' + JSON.stringify(error));
  });
};

const navigateToEditoraHome = (id:any) => {
  setSelectedId(id);
  navigation.navigate('HomeEditora', {id:id});
};

const navigateToHomeLivro = (id: any) => {
  setSelectedLivro(id);
  navigation.navigate('HomeLivro', { id: id });
};

const renderItem = ({ item }) => {

  return (
    <Item
      item={item}
      eventoPressionarBotao={() => navigateToEditoraHome(item.codigoEditora)}
    />
  );
};

if (carregar === true) {
  return (
    showLoading()
  );
}
return (

  <ScrollView style={styles.container}>
    <Text style={styles.sectionTitle}>Editoras</Text>
    <FlatList
      data={dadosEditora}
      renderItem={renderItem}
      keyExtractor={(item) => item.codigoEditora}
      extraData={selectedId}
      horizontal={true}
    />
    <Text style={styles.sectionTitle}>Livros</Text>
    <FlatList
      data={dadosLivro}
      renderItem={CardLivro}
      keyExtractor={(item, indice) => indice}
      extraData={setSelectedLivro}
      horizontal={true}
    />
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    marginHorizontal: 8,
    marginBottom:20,
    padding:10,
    width:200,
    height:200,
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center',
  },
  cardLivro: {
    marginHorizontal: 8,
    padding:10,
    justifyContent:'center',
    width:240,
    height:340,
  },
  sectionTitle: {
    fontSize: 24,
    // marginLeft: 10,
    marginBottom:20,
    fontWeight: 'bold',
    color: '#000',
    textAlign:'center',
  },
  title: {
    fontSize: 16,
    flex:0.8,
    padding:10,
  },
  btnItem:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    width:200,
    height:200,
    marginBottom: 15,
  },
  imgItem:{
    flex:3,
    width:140,
    height:140,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#38936D',
  },
});

export default Home;
