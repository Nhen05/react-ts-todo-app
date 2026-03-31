import { useState, useEffect } from "react";
import type { Todo } from "../Types/Todo";
export const useTodo = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {

            const data = localStorage.getItem("todos")
            return data ? JSON.parse(data) : []
        }
        catch {
            return [];
        }
    });
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])
    const addTodo = (text: string) => {
        if(!text.trim()) return;
        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false

        }
        setTodos((prev) => [...prev, newTodo])

    }
    const deleteTodo = (id: number) => {
        setTodos((prev) =>
            prev.filter((todo) => todo.id !== id)
        )
    }
    const toogleTodo = (id: number) => {
        setTodos((prev) => prev.map((todo) => todo.id === id ?
            { ...todo, completed: !todo.completed } :
            todo
        )
        )
    }
    const getTodoById = (id: number): Todo | undefined => {
        return todos.find(todo => todo.id === id)
    }
    const updateTodo = (id: number, newText: string) => {
        if (!newText.trim()) return;
        setTodos((prev) => prev.map((todo) => todo.id === id ? {
            ...todo, text: newText
        } : todo
        ))
    }
    return {
        todos,
        addTodo,
        deleteTodo,
        toogleTodo,
        getTodoById,
        updateTodo,



    }
}