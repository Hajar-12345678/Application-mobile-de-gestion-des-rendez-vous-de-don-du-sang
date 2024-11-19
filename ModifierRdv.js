import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModifierRdv = ({ route }) => {
  const { id , userId } = route.params;
  const [rendezVous, setRendezVous] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [creneaux, setCreneaux] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchRendezVous();
    fetchCreneaux();
  }, []);

  const fetchRendezVous = async () => {
    try {
      const response = await axios.get(`https://13da-105-191-154-20.ngrok-free.app/rdv/rdvid/${id}`);
      setRendezVous(response.data);
    } catch (error) {
      
      setErrorMessage('Erreur lors de la récupération du rendez-vous. Veuillez réessayer.');
    }
  };

  const fetchCreneaux = async () => {
    try {
      const response = await axios.get(`https://13da-105-191-154-20.ngrok-free.app/creneau/creneau/rdv/${id}`);
      setCreneaux(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des créneaux:', error);
      setErrorMessage('Erreur lors de la récupération des créneaux. Veuillez réessayer.');
    }
  };

  const handleSlotSelection = (slotId) => {
    setSelectedSlot(slotId);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleFormSubmit = async () => {
    try {
      const selectedSlotData = creneaux.find(slot => slot.id === selectedSlot);

      if (selectedSlotData) {
        await axios.put(`https://13da-105-191-154-20.ngrok-free.app/rdv/putrdv/${id}`, {
          date: selectedDate.toISOString().substring(0, 10),
          heure_debut: selectedSlotData.heure_debut,
          heure_fin: selectedSlotData.heure_fin,
          centre_id: selectedSlotData.centre_id,
        });

        Alert.alert(
          'Succès',
          'Le rendez-vous a été modifié avec succès !',
          [
            { text: 'OK', onPress: () => navigation.navigate('Listerdv', { userId }) }
          ],
          { cancelable: false }
        );
  
      } else {
        console.error('Selected slot data not found');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  if (!id || !creneaux) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  const handleLogout = () => {
    navigation.navigate('Connexion');
  };


  return (
    <View style={styles.container}>
         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={24} color="#333" />
      </TouchableOpacity>
<Image source={require('./images/img3.png')} style={styles.topImage} /> 
      {errorMessage && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Sélectionnez une date :</Text>
        <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
          <Icon name="calendar" size={20} color="#333" style={styles.calendarIcon} />
          <Text style={styles.datePickerText}>{selectedDate ? selectedDate.toISOString().split('T')[0] : 'Sélectionnez une date'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Sélectionnez un créneau :</Text>
        <FlatList
          data={creneaux}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.slot, selectedSlot === item.id && styles.selectedSlot]} onPress={() => handleSlotSelection(item.id)}>
              <Text style={styles.slotText}>{`${item.heure_debut} - ${item.heure_fin}`}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      
      <TouchableOpacity style={[styles.button, (!selectedDate || !selectedSlot) && styles.buttonDisabled]} onPress={handleFormSubmit} disabled={!selectedDate || !selectedSlot}>
        <Text style={styles.buttonText}>Modifier</Text>
        <Icon name="edit" size={20} color="#fff" style={styles.buttonIcon} />
      </TouchableOpacity>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 100,
    
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#d48c8c',
    fontWeight: 'bold',
  },
  datePickerButton: {
    backgroundColor: '#e8e8e6',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
    marginRight: 110,
  },
  slot: {
    backgroundColor: '#e8e8e6',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10,
  },
  selectedSlot: {
    backgroundColor: '#efdada',
  },
  slotText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#bd3b3b',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc', 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center'
  },
  topImage: {
    width: '98%',
    height: 170,
    resizeMode: 'cover',
    marginBottom: 40,
    marginTop: -20,
    marginLeft: 'auto',
  },
  logoutButton: {
    position: 'absolute',
    top: 14,
    right: 20,
    padding: 10,
   paddingTop:30,
    borderRadius: 10,
  },
});

export default ModifierRdv;
