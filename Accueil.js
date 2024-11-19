import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Accueil = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Connexion');
    }, 2000); 

    return () => clearTimeout(timer);
  }, []); 

  return (
    <View style={styles.container}>
      <Image source={require('./images/logo1.gif')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 400,
    height: 500,
    resizeMode: 'contain',
  },
});

export default Accueil;
