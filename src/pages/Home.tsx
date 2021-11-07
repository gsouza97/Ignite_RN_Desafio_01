import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const isExisting = tasks.find((task) => task.title === newTaskTitle);
    if (isExisting) {
      Alert.alert("Tarefa já cadastrada.");
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };
      setTasks([...tasks, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const task = tasks.filter((task) => task.id === id);
    task[0].done = !task[0].done;
    setTasks([...tasks]);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    const newArray = tasks.filter((task) => task.id !== id);
    Alert.alert("Tem certeza que deseja remover a tarefa?", "", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Sim", onPress: () => setTasks(newArray) },
    ]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
