/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D22D13',
  },
  cabecalho: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    width: Dimensions.get('window').width * 0.9,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
  rodape: {
    flex: 1,
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#F67248',
    width: Dimensions.get('window').width * 0.9,
    padding: 20,
    borderRadius: 10,
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },

});
