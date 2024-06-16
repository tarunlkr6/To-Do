import React, { useEffect, useState, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';
import List from './List';
uuidv4();

export default function TodoForm() {

    const [value, setValue] = useState("");
    const [todos, setToDos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState('');
    const [sort, setSort] = useState(true);

    useEffect(() => {
        const task = JSON.parse(localStorage.getItem('task'));
        if (task) {
            setToDos(task);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(todos));
    }, [todos]);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValue("");
    }

    const addTodo = () => {
        if (value.length < 5) {
            setError("Task must be at least 5 characters long");
            return;
        }
        const newTodo = {
            id: uuidv4(),
            task: value,
            done: false,
        };
        setToDos([...todos, newTodo]);
        setError('');
    }

    const handleToogle = (itemId) => {
        const newTodo = todos.map((listItem) => {
            if (listItem.id === itemId) {
                return { ...listItem, done: !listItem.done };
            }
            return listItem;
        });
        setToDos(newTodo);
    }

    const filterToDoTask = useMemo(() => {
        switch (filter) {
            case 'active':
                const uncompletedTodos = todos?.filter((todo) => !todo.done);
                return uncompletedTodos;
            case 'completed':
                const completedTodos = todos?.filter((todo) => todo.done);
                return completedTodos;
            default:
                return todos;
        }
    }, [filter, todos]);

    const sortedTasks = filterToDoTask.sort((a, b) => {
        if (sort) {
            return b.done - a.done;
        } else {
            return a.done - b.done;
        }
    });

    const handleSorting = (e) => {
        setSort(!sort);
    }

    const handleDelete = (itemId) => {
        const newTodo = todos.filter((listItem) => listItem.id !== itemId);
        setToDos(newTodo);
    }

    return (
        <div className="TodoForm">
            <form onSubmit={handleSubmit}>

                <input type="text" className="todo-input" name="task" placeholder="Add your new Task" onChange={handleChange} value={value} />
                <span><button className="todo-btn" type="submit" onClick={addTodo} disabled={!value} style={{ background: !value ? "#C7C8CC" : "#8758ff" }}>Add Task</button></span>
                {error && <p className="error">{error}</p>}
                <div>
                    <button className="todo-btn-filter" onClick={() => setFilter('all')}>All</button>
                    <button className="todo-btn-filter" onClick={() => setFilter('active')}>Active</button>
                    <button className="todo-btn-filter" onClick={() => setFilter('completed')}>completed</button>
                    <button className="todo-btn-filter" onClick={handleSorting}>Sort: {sort ? 'Completed First' : 'Not Completed First'}</button>
                </div>

            </form>

            {todos.length > 0 && <List todoList={todos} handleToogle={handleToogle} handleDelete={handleDelete} filterToDoTask={filterToDoTask} sortedTasks={sortedTasks} />}
        </div>
    );
}