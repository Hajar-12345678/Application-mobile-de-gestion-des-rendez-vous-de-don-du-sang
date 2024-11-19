import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const InfoRdv = ({ navigation, route }) => {
  const { rendezVous, userId } = route.params;
  const [userInfo, setUserInfo] = useState(null);
  

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`https://13da-105-191-154-20.ngrok-free.app/user/info/${userId}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [userId]);


  


  const handleLogout = () => {
    navigation.navigate('Connexion');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('./images/logo.png')}
          resizeMode="contain"
        />
      </View>

      <View style={styles.userInfo}>
        {userInfo && (
          <>
            <Text style={styles.userInfoText}>Nom : {userInfo.nom}</Text>
            <Text style={styles.userInfoText}>Prénom : {userInfo.prenom}</Text>
            <Text style={styles.userInfoText}>Téléphone : {userInfo.telephone}</Text>
            <Text style={styles.userInfoText}>Email : {userInfo.email}</Text>
          </>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>Détails du rendez-vous</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date :</Text>
          <Text style={styles.value}>{rendezVous.date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Heure de début :</Text>
          <Text style={styles.value}>{rendezVous.heure_debut}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Heure de fin :</Text>
          <Text style={styles.value}>{rendezVous.heure_fin}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>État du rendez-vous :</Text>
          <Text style={styles.value}>{rendezVous.etat_rdv}</Text>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 75, 
    overflow: 'hidden', 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2, 
    borderColor: '#d48c8c', 
},
  userInfo: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
    paddingHorizontal: 30,
    paddingVertical: 200,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 5,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d48c8c',
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 50,
    paddingVertical: 170,
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
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

export default InfoRdv;
