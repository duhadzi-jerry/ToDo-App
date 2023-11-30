import { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaCheck, FaRedo } from 'react-icons/fa';
import ButtomNavBar from './buttomNav';
import TopNavBar from './topNav';

interface TodoItem {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

function ListView() {
    const [items, setItems] = useState<TodoItem[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    
    useEffect(() => {
        const storedItemsString = localStorage.getItem('items');
        if (storedItemsString) {
            const storedItems = JSON.parse(storedItemsString);
            setItems(storedItems);
        }
    }, []);

    const updateItems = (newItems: TodoItem[]) => {
        setItems(newItems);
    };

    const toggleCompletion = (id: number) => {
        const updatedItems = items.map(item =>item.id === id ? { ...item, completed: !item.completed } : item);
        localStorage.setItem('items', JSON.stringify(updatedItems));
        updateItems(updatedItems);
    };

    const startEditing = (id: number) => {
        const itemToEdit = items.find(item => item.id === id);
        if (itemToEdit) {
            setEditingItemId(id);
            setEditedTitle(itemToEdit.title);
            setEditedDescription(itemToEdit.description);
        }
    };

    const cancelEditing = () => {
        setEditingItemId(null);
        setEditedTitle('');
        setEditedDescription('');
    };

    const saveEditing = () => {
        if (editingItemId !== null) {
            const updatedItems = items.map(item =>
                item.id === editingItemId
                    ? { ...item, title: editedTitle, description: editedDescription }
                    : item
            );
            localStorage.setItem('items', JSON.stringify(updatedItems));
            updateItems(updatedItems);
            setEditingItemId(null);
            setEditedTitle('');
            setEditedDescription('');
        }
    };

    const deleteItem = (id: number) => {
        const updatedItems = items.filter(item => item.id !== id);
        localStorage.setItem('items', JSON.stringify(updatedItems));
        updateItems(updatedItems);
    };

    const handleFilterChange = (selectedFilter: string) => {
        setFilter(selectedFilter);
    };

    const filteredItems = filter === 'all' ? items : items.filter(item =>
        filter === 'completed' ? item.completed : !item.completed
    );

    return (
        <>
            <TopNavBar onFilterChange={handleFilterChange} />
            <div className="p-2" style={{width:500, marginTop: 80, marginBottom: 195, overflowY: "scroll" }}>
                {[...filteredItems].sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1).map((item, index) => (
                    <div key={index} style={{ backgroundColor: item.completed ? '#c8e6c9' : '#ffcdd2' }} className="mt-3 p-3 shadow-lg rounded w-100">
                        {editingItemId === item.id ? (
                            <>
                                <input className="form-control m-1" type="text" title="Title" placeholder="Title" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                                <textarea className="form-control m-1" title="Description" placeholder="Description" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                    <button className="w-100 m-1 btn btn-danger" onClick={cancelEditing}>Cancel</button>
                                    <button className="w-100 m-1 btn btn-primary" onClick={saveEditing}>Update</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                    <div>
                                        <h5><b>{item.title}</b></h5>
                                        <small>{item.description}</small>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: "space-around" }}>
                                        <button className="btn btn-danger m-1" title='Delete' style={{ fontSize: 10, height:30,width:50}} onClick={() => deleteItem(item.id)}>
                                            <FaTrash />
                                        </button>
                                        <button className="btn btn-primary m-1" title='Edit' style={{ fontSize: 10, height:30,width:50}} onClick={() => startEditing(item.id)}>
                                            <FaEdit /> 
                                        </button>
                                        <button className="btn btn-success m-1" title='Complete/Redo' style={{ fontSize: 10, height:30,width:50}} onClick={() => toggleCompletion(item.id)}>
                                            {item.completed ? <FaRedo /> : <FaCheck />} 
                                        </button>
                                    </div>

                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <ButtomNavBar updateItems={updateItems} toggleCompletion={toggleCompletion} />
        </>

    )
}

export default ListView