import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEdit, FaRegCheckSquare } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Tasks = () => {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [newTask, setTask] = useState('');
    const [newDesc, setDesc] = useState('');
    const [alltasks, setAlltasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());

    const handleAdd = () => {
        // Create a new task object
        let newlist = {
            id: Date.now(),
            Taskitem: newTask,
            Desc: newDesc,
            Date: startDate,
            Time: startTime,
            Completed: false
        };

        // Use the spread operator to add the new task to the list
        setAlltasks([...alltasks, newlist]);

        // Clear input fields after adding the task
        setTask('');
        setDesc('');
    };

    const handleEdit = (index) => {
        const taskToEdit = alltasks[index];
        setTask(taskToEdit.Taskitem);
        setDesc(taskToEdit.Desc);
        setStartDate(taskToEdit.Date);
        setStartTime(taskToEdit.Time);
        setEditIndex(index);
    };

    const handleUpdate = () => {
        let updatedTask = {
            Taskitem: newTask,
            Desc: newDesc,
            Date: startDate,
            Time: startTime,
            Completed: alltasks[editIndex].Completed
        };

        const updatedTasks = alltasks.map((task, index) =>
            index === editIndex ? updatedTask : task
        );

        setAlltasks(updatedTasks);
        setTask('');
        setDesc('');
        setEditIndex(null);
    };

    const handleDelete = (idToDelete) => {
        const updatedTasks = alltasks.filter(task => task.id !== idToDelete);
        setAlltasks(updatedTasks);
    }

    const handleToggleComplete = (id) => {
        const updatedTasks = alltasks.map(task =>
            task.id === id ? { ...task, Completed: !task.Completed } : task
        );
        setAlltasks(updatedTasks);
    };

    return (
        <>
            <div className="p-6 h-screen bg-slate-900 flex flex-col flex-grow overflow-hidden">

                {/* Tasks Write */}
                <div className="mx-6 text-white border-black bg-gray-800 rounded-lg">
                    <div className='p-6 flex gap-5 items-center py-4 border-white-4 '>
                        <label htmlFor="" className=''>Task </label>
                        <input
                            type="text"
                            className='border border-gray-300 px-4 py-2 w-full rounded-lg bg-transparent'
                            placeholder='Write Tasks'
                            value={newTask}
                            onChange={(e) => setTask(e.target.value)}
                        />

                        <label htmlFor="" className=''>Description </label>
                        <input
                            type='text'
                            className='border border-gray-300 px-4 py-2 w-full rounded-lg bg-transparent'
                            placeholder='About the task'
                            value={newDesc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>

                    <div className='p-6 mb-4 flex gap-10 justify-center items-center'>
                        <label htmlFor="">Date</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className='bg-transparent text-white cursor-pointer border border-white rounded-lg p-2'
                            dateFormat="yyyy/MM/dd"
                        />

                        <label htmlFor="">Time</label>
                        <DatePicker
                            selected={startTime}
                            onChange={(date) => setStartTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            className='bg-transparent text-white cursor-pointer border border-white rounded-lg p-2'
                        />
                    </div>

                    {editIndex !== null ? (
                        <button
                            type='submit'
                            className='text-black font-bold bg-gray-300 hover:bg-black hover:text-white transition duration-300 py-2 rounded w-full hover:border-black'
                            onClick={handleUpdate}
                        >
                            Update Task
                        </button>
                    ) : (
                        <button
                            type='submit'
                            className='text-black font-bold bg-gray-300 hover:bg-black hover:text-white transition duration-300 py-2 rounded w-full hover:border-black'
                            onClick={handleAdd}
                        >
                            Add Task
                        </button>
                    )}
                </div>

                <div className='m-6 flex gap-4 justify-center flex-shrink-0'>
                    <button
                        className='bg-gray-300 transform-transition duration-300 hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded'
                        onClick={() => setIsCompleteScreen(false)}
                    >
                        Tasks remaining
                    </button>

                    <button
                        className='bg-gray-300 transform-transition duration-300 hover:bg-black text-black hover:text-white font-bold py-2 px-4 rounded'
                        onClick={() => setIsCompleteScreen(true)}
                    >
                        Completed
                    </button>
                </div>

                {/* Tasks List */}
                <div className="mx-6 bg-gray-800 flex flex-col h-fit rounded-lg overflow-y-auto">
                    {alltasks
                        .filter(task => task.Completed === isCompleteScreen)
                        .map((task, index) => (
                            // Task list items
                            <div key={task.id} className={`m-6 bg-gray-300 border-black rounded-lg shadow-2xl flex justify-between ${task.Completed ? 'opacity-50 line-through' : ''}`}>
                                <h3 className='p-4 text-xl font-bold'>{task.Taskitem}</h3>
                                <p className='p-4'>{task.Desc}</p>
                                <p className='p-4'>{task.Date.toLocaleDateString()}</p>
                                <p className='p-4'>{task.Time.toLocaleTimeString()}</p>

                                <div className="flex items-center">
                                    <button
                                        className='flex justify-center items-center transform transition duration-300 hover:bg-black hover:text-white h-full w-14 rounded-lg'
                                        onClick={() => handleEdit(index)}>
                                        <FaEdit className='h-7 w-7 cursor-pointer' />
                                    </button>
                                    <button
                                        className='flex justify-center items-center transform transition duration-300 hover:bg-black hover:text-white h-full w-14 rounded-lg'
                                        onClick={() => handleToggleComplete(task.id)}
                                    >
                                        <FaRegCheckSquare className='h-7 w-7 cursor-pointer' />
                                    </button>
                                    <button
                                        className='flex justify-center items-center transform transition duration-300 hover:bg-black hover:text-white h-full w-14 rounded-lg'
                                        onClick={() => handleDelete(task.id)}>
                                        <MdDelete className='h-7 w-7 cursor-pointer' />
                                    </button>
                                </div>
                            </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Tasks;
