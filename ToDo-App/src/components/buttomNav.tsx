import { useState } from 'react';

interface ButtomNavBarProperties {
  updateItems: (newItems: any) => void;
  toggleCompletion: (id: number) => void;
}

function ButtomNavBar({ updateItems }: ButtomNavBarProperties) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddClick = () => {
        if (title.trim() !== '' && description.trim() !== '') {
            const storedItemsString = localStorage.getItem('items');
            const existingItems = storedItemsString ? JSON.parse(storedItemsString) : [];
            const newItem = { id: Date.now(), title, description, completed: false };
            const updatedItems = [...existingItems, newItem];
            localStorage.setItem('items', JSON.stringify(updatedItems));
            updateItems(updatedItems);
            setTitle('');
            setDescription('');
        }
    };

    return (
        <>
            <div>
                <div className='bg-light' style={{ position: 'fixed', bottom: 0, width: 500}}>
                    <hr/>
                    <div className='row p-4'>
                        <div style={{ display: 'flex', justifyContent: "space-around" }}>
                            <input className="form-control m-1" title="Title" placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <textarea className="form-control m-1" title="Description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <button className="mt-2 btn btn-success" onClick={handleAddClick} >Add</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ButtomNavBar

