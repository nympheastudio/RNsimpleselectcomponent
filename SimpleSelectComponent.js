import React, { useState, memo, useCallback, useEffect } from 'react';
import { Pressable, View, Text, TouchableOpacity, Button, Modal, StyleSheet, FlatList } from 'react-native';
import ListCountries from './ListsFestivalOff';
import { SelectList } from 'react-native-dropdown-select-list';
import { FlashList } from '@shopify/flash-list';
import TextTradLocal from '../services/TextTradLocal';
import { useSelector } from 'react-redux';

const SimpleSelectComponent = ({ onItemSelected, list, placeholder, selectedValue }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const state = useSelector((state) => state.user);
  const modifier = TextTradLocal('modifier', state.lang);
  const selectionner = TextTradLocal('selectionner', state.lang);
  const fermer = TextTradLocal('fermer', state.lang);
  const itemCount = list.length;
  const maxListHeight = itemCount < 10 ? itemCount * 40 : 400;

  useEffect(() => {
    setSelectedLabel(selectedValue ? selectedValue.label : '');
  }, [selectedValue]);

  const handleItemClick = useCallback((item) => {
    onItemSelected(item);
    setSelectedLabel(item.label);
    setShowModal(false);
  }, [onItemSelected]);

  const toggleModalVisibility = useCallback(() => {
    setShowModal((prevState) => !prevState);
  }, []);

  const renderListItem = useCallback(({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <Text style={styles.listItem}>{item.label}</Text>
    </TouchableOpacity>
  ), []);

  return (
    <View>
      <TouchableOpacity onPress={toggleModalVisibility}>
        {selectedLabel ? (
          <Text style={styles.selectedLabel}>{selectedLabel}</Text>
        ) : (
          <Text style={styles.modifierText}>{placeholder} ✎</Text>
        )}
      </TouchableOpacity>

      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Pressable onPress={toggleModalVisibility} style={styles.closeButton}>
            <Text>{fermer}</Text>
          </Pressable>
          <Text>{selectionner}</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={list}
              renderItem={renderListItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modifierText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  selectedLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  listContainer: {
    width: '100%',
    maxHeight: 400,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  listItem: {
    paddingVertical: 4,
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: 60,
    padding: 6,
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 10,
    marginRight: 10,
  },
});

export default memo(SimpleSelectComponent);
