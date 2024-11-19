import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Alert } from 'react-native';
import axios from 'axios';

const Listerdv = ({ route }) => {
  const { userId, centreId } = route.params;
  const [rendezVous, setRendezVous] = useState([]);
  const navigation = useNavigation();

  const fetchRendezVousUtilisateur = async () => {
    try {
      const response = await axios.get(`https://13da-105-191-154-20.ngrok-free.app/rdv/rdvuser/${userId}`);
      setRendezVous(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous de l\'utilisateur:', error);
    }
  };

  useEffect(() => {
    fetchRendezVousUtilisateur();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchRendezVousUtilisateur();
    }, [])
  );

  const handleDeleteRendezVous = async (id) => {
    try {
      await axios.delete(`https://13da-105-191-154-20.ngrok-free.app/rdv/deleterdv/${id}`);
      fetchRendezVousUtilisateur();
      Alert.alert('Confirmer la suppression de rendez-vous');
    } catch (error) {
      console.error('Erreur lors de la suppression du rendez-vous:', error);
    }
  };

  const handleEditRendezVous = (id) => {
    navigation.navigate('ModifierRdv', { id, userId ,centreId });
  };

  const handleViewDetails = (rendezVous) => {
    navigation.navigate('InfoRdv', { rendezVous , userId, centreId});
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleLogout = () => {
    navigation.navigate('Connexion');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="#333" />
      </TouchableOpacity>
        
      <Text style={styles.title}> Mes rendez-vous</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Date</Text>
          <Text style={styles.tableHeaderText}>Heure début</Text>
          <Text style={styles.tableHeaderText}>Heure fin</Text>
          <Text style={styles.tableHeaderText}>État</Text>
          <Text style={styles.tableHeaderText}>Actions</Text>
        </View>
        <FlatList
          data={rendezVous}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableData}>{formatDate(item.date)}</Text>
              <Text style={styles.tableData}>{item.heure_debut}</Text>
              <Text style={styles.tableData}>{item.heure_fin}</Text>
              <Text style={styles.tableData}>{item.etat_rdv}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleDeleteRendezVous(item.id)}>
                  <Text style={[styles.button, styles.deleteButton]}>Supprimer</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacer}></View>
                <TouchableOpacity onPress={() => handleEditRendezVous(item.id)}> 
                  <Text style={[styles.button, styles.modifyButton]}>Modifier</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacer}></View>
                <TouchableOpacity onPress={() => handleViewDetails(item)}>
                  <Text style={[styles.button, styles.detailsButton]}>Voir les détails</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#d48c8c'
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d8d7d7',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingVertical: 20,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#050303',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableData: {
    fontSize: 12,
  },
  actions: {
    flexDirection: 'column',
  },
  button: {
    fontSize: 12,
    marginHorizontal: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: '#faf7f7',
    backgroundColor: '#be2c2c',
  },
  modifyButton: {
    color: '#faf7f7',
    backgroundColor: '#d48c8c',
  },
  detailsButton: {
    color: '#faf7f7',
    backgroundColor: '#6c757d',
  },
  buttonSpacer: {
    paddingTop:10 
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

export default Listerdv;
