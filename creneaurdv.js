import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'; // Importez Image
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const CreneauRdv = ({ route }) => {
  const { centreId, userId } = route.params;
  const [creneaux, setCreneaux] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); 
  const navigation = useNavigation();

  useEffect(() => {
    fetchCreneaux();
  }, []);

  const fetchCreneaux = async () => {
    try {
      const response = await axios.get(`https://13da-105-191-154-20.ngrok-free.app/creneau/creneau/${centreId}`);
      setCreneaux(response.data);
    } catch (error) {
      console.error('Error fetching available slots:', error);
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
      if (!selectedDate || !selectedSlot) { 
        Alert.alert('Veuillez sélectionner une date et un créneau');
        return;
      }
      setErrorMessage(null);

      const selectedSlotData = creneaux.find(slot => slot.id === selectedSlot);

      if (selectedSlotData) {
        await axios.post('https://13da-105-191-154-20.ngrok-free.app/rdv', {
          centre_id: centreId,
          user_id: userId,
          creneau_id: selectedSlot,
          date: selectedDate.toISOString().substring(0, 10),
          heure_debut: selectedSlotData.heure_debut,
          heure_fin: selectedSlotData.heure_fin,
        });

        console.log('Rendez-vous enregistré avec succès !');

        navigation.navigate('Listerdv', { userId, centreId });

      } else {
       
        Alert.alert('Une erreur s\'est produite. Veuillez réessayer.');
      }
    } catch (error) {
      
      Alert.alert('Erreur','Vous avez déjà un rendez-vous pour cette date. Veuillez choisir une autre date.');
    }
  };

  const handleLogout = () => {
    navigation.navigate('Connexion');
  };

  return (
    
    <View style={styles.container}>
  <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
    <Icon name="sign-out" size={24} color="#333" />
  </TouchableOpacity>
  <Image source={require('./images/img2.png')} style={styles.topImage} /> 
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
      minimumDate={new Date()}
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
  
  {errorMessage && (
  <View>
    <Text style={styles.errorText}>{errorMessage}</Text>
    <View style={styles.separator}></View>
  </View>
)}

  <TouchableOpacity
    style={[styles.button, (!selectedDate || !selectedSlot) && styles.buttonDisabled]}
    onPress={handleFormSubmit}
    disabled={!selectedDate || !selectedSlot}
  >
    <Text style={styles.buttonText}>Valider</Text>
    <Icon name="check" size={20} color="#fff" style={styles.buttonIcon} />
  </TouchableOpacity>
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 160,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  topImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    marginBottom: 40,
    marginTop:-40
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
   paddingTop:30,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  }
});

export default CreneauRdv;
