import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'

const ModalCom = () => {
  return (
   <View style={styles.centeredView} >
    <Modal style={styles.modalView}>
        <Text>hello</Text>

    </Modal>
   </View>
  )
}

export default ModalCom

const styles = StyleSheet.create({
     centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
   
  },
  modalView: {
    margin: 20,
    backgroundColor: "red",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    
  },
})