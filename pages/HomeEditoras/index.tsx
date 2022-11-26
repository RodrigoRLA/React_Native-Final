/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AxiosInstance from '../../api/AxiosIntance';
import { showLoading } from '../../components/Loading/ShowLoading';
import { DataContext } from '../../context/DataContext';
import { DadosEditoraType } from '../../models/DadosEditoraType';

const Item = ({ item, pressBotao, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={pressBotao} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.nomeEditora}</Text>
    </TouchableOpacity>
  );

const HomeEditoras = ({navigation}) => {

  const {dadosUsuario} = useContext(DataContext);
  const [carregar, setCarregar] = useState(false);
  const [dadosEditora, setDadosEditora] = useState<DadosEditoraType[]>([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() =>{
    setCarregar(true);
    setTimeout(() => {
        setCarregar(false);
    }, 1500);
    },[]);

    useEffect(() => {

        const stackNavigator = navigation.getParent();
        if (stackNavigator){
          stackNavigator.setOptions({ title: `Bem-vindo, ${dadosUsuario.nome}`});
        }
        getAllEditoras();
      },[]);

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

      const renderItem = ({ item }) => {
        const backgroundColor = item.codigoEditora === selectedId ? '#30413a' : '#9defcd';
        const color = item.codigoEditora === selectedId ? 'white' : 'black';

        const navigateToEditoraHome = (id:any) => {
            setSelectedId(id);
            navigation.navigate('HomeEditora', {id:id});
          };

        return (
          <Item
            item={item}
            pressBotao={() => navigateToEditoraHome(item.codigoEditora)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }}
          />
        );
      };

      if (carregar === true) {
        return (
          showLoading()
        );
      }
          return (
             <View style={styles.container2}>
               <FlatList
              data={dadosEditora}
              renderItem={renderItem}
              keyExtractor={(item) => item.codigoEditora}
              extraData={selectedId}
            />
            </View>
          );
        };

        const styles = StyleSheet.create({
          container: {
            flex: 1,
            justifyContent: 'center',
            marginTop: StatusBar.currentHeight || 0,
          },
          horizontal: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          },
          container2: {
            flex: 1,
            marginTop: StatusBar.currentHeight || 0,
            alignItems: 'center',
          },
          item: {
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 10,
            width: 320,
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          },
          title: {
            fontSize: 30,
            textAlign: 'center',
          },
        });

export default HomeEditoras;
