/* eslint-disable prettier/prettier */
import { Alert } from 'react-native';

export const showAlert = (title, mensagem) => {
    Alert.alert(
      title,
      mensagem,
      [
        {text: 'OK'},
      ]
  );
};
