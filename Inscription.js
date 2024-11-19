import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Alert } from 'react-native';
import axios from 'axios';

const Inscription = ({ navigation }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Veuillez saisir une adresse e-mail valide.');
      return;
    }

    
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(motdepasse)) {
      Alert.alert('Erreur', `Le mot de passe doit contenir au moins une lettre, un chiffre et un symbole et doit avoir au moins 8 caractères.`);
      return;
    }

    try {
      const response = await axios.post('https://13da-105-191-154-20.ngrok-free.app/user/post', {
        nom,
        prenom,
        email,
        motdepasse,
        telephone
      });
      console.log('Utilisateur créé avec succès:', response.data);
      Alert.alert('Utilisateur créé avec succès');
      navigation.navigate('Connexion');
    } catch (error) {
      Alert.alert('Cette adresse e-mail est déjà utilisée.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}>
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./images/logo.png')}
            style={styles.logo}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          onChangeText={setNom}
          value={nom}
        />
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          onChangeText={setPrenom}
          value={prenom}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          onChangeText={setMotdepasse}
          value={motdepasse}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          onChangeText={setTelephone}
          value={telephone}
        />
        
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 75,
    overflow: 'hidden',
    backgroundColor: '#464746' 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    width: '80%',
    backgroundColor: '#e8e8e6',
    color: '#080807',
    width: 300,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#bd3b3b',
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Inscription;
