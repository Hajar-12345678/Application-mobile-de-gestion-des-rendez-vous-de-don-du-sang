import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import axios from 'axios';

const Home = ({ route }) => {
  const navigation = useNavigation();
  const { userId } = route.params;
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`https://13da-105-191-154-20.ngrok-free.app/user/name1/${userId}`);
        setUserName(response.data.nom);
      } catch (error) {
        console.error('Erreur lors de la récupération du nom de l\'utilisateur :', error);
      }
    };

    fetchUserName();
  }, [userId]); 

  const handleGoToCentres = () => {
    navigation.navigate('Listecentres', { userId });
  };

  const handleGoToCreneaux = () => {
    navigation.navigate('Listerdv', { userId });
  };
  const handleLogout = () => {
    navigation.navigate('Connexion');
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="#333" />
      </TouchableOpacity>
      
      <Text style={styles.title}>
        Bienvenue, {userName}
        {"\n"}
        <Text style={styles.subtitle}>sur Give Life!</Text>
      </Text>
      <Image source={require('./images/img1.png')} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGoToCentres}>
          <Text style={[styles.buttonText, { fontSize: 20 }]}>Prendre un rendez-vous</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGoToCreneaux}>
          <Text style={[styles.buttonText, { fontSize: 20 }]}>Consulter mes rendez-vous</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#de9494',
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  logo: {
    width: 350,  
    height: 200, 
    resizeMode: 'cover',
    marginBottom: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
   paddingTop:30,
    borderRadius: 10,
  },
});

export default Home;
