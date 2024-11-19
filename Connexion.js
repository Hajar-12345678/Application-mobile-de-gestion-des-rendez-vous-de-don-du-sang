import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Alert } from 'react-native';
import axios from 'axios';

const Connexion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
    axios.post('https://13da-105-191-154-20.ngrok-free.app/user/login', { email, motdepasse: password })
      .then(response => {
        const userId = response.data.user_id;
        console.log('userId ET récupéré avec succès :', userId);
        const token = response.data.token;
        console.log('Token JWT récupéré avec succès :', token);
        navigation.navigate('Home', { userId, token});
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          Alert.alert('Email ou mot de passe incorrect');
        } else {
          Alert.alert('Une erreur s\'est produite. Veuillez réessayer.');
        }
      });
  };

  const handleSignUp = () => {
    navigation.navigate('Inscription');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={{ width: 150, height: 150, borderRadius: 75, overflow: 'hidden', backgroundColor: '#525151', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 40 }}>
  <Image source={require('./images/logo.png')} style={{ width: 150, height: 150, resizeMode: 'cover' }} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Mot de passe"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!showPassword} 
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordIcon}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#2e2727" />
          </TouchableOpacity>
        </View>
       
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.link}>Pas encore de compte ? Inscrivez-vous</Text>
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
    backgroundColor: '#de9494', 
  },
  formContainer: {
    backgroundColor: 'white', 
    borderRadius: 40,
    width: '90%',
    height: '70%',
    justifyContent: 'center', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 14,
    marginBottom: 10,
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 10,
    backgroundColor: '#e8e8e6',
  
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 4,
    marginBottom: 10,
    borderRadius: 40,
    paddingHorizontal: 25,
    marginBottom: 10,
    backgroundColor: '#e8e8e6',
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  passwordIcon: {
    padding: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#bd3b3b',
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
    width: 200, 
    marginLeft:80
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#2e2727',
    textDecorationLine: 'underline',
    marginBottom: 10,
    textAlign: 'center', 
  },
  logo: {
    width: 150,
  height: 150,
  resizeMode: 'cover',
  alignSelf: 'center',
  marginBottom: 40,
  borderRadius: 75, 
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  },
});

export default Connexion;
