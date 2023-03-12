import { StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Header from '../Components/Header'
import Footer from '../Components/Footer'

export default function Home({ navigation, GlobalState }) {
    const { toDoList, setToDoList, task, setTask, setChosenTask } = GlobalState

    useEffect(() => {
        //setToDoList(prevState => [...prevState, { id: 2, task: 'task nr 2' }])
    }, [])
    const handleSaveTask = () => {
        const index = toDoList.length + 1
        setToDoList(prevState => [...prevState, { id: index, task: task }])
        setTask('')
    }
    const handleChooseTask = (item) => {
        setChosenTask(item)
        navigation.navigate('ChosenTask')
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.body}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTask}
                        value={task}
                        placeholder='Add task!'
                    />
                    <Pressable
                        style={styles.button}
                        onPress={handleSaveTask}>
                        <Text>Save task</Text>
                    </Pressable>
                </View>

                <FlatList
                    data={toDoList}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.task}
                            onPress={() => handleChooseTask(item)}>
                            <Text>{item.task}</Text>
                        </Pressable>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
            <Footer navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 8,
        width: '100%',
        backgroundColor: '#14141410',

    },
    task: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        marginTop: 15,
        marginBottom: 15,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        width: 270,
    },
    button: {
        backgroundColor: '#14141450',
        color: 'white',
        padding: 15,
        marginTop: 15,
        marginBottom: 15,
        marginRight: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})