import React from 'react';

interface TopNavBarProperties {
  onFilterChange: (filter: string) => void;
}

function TopNavBar({ onFilterChange }: TopNavBarProperties) {
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter = event.target.value;
        onFilterChange(selectedFilter);
    };

    return (
        <>
            <div >
                <div className='bg-warning p-3' style={{ position: 'fixed', top: 0, width: 500}}>
                    <div className="m-2" style={{display:'flex', justifyContent: "space-between"}}>
                        <h3><b>Daily Checks</b></h3>
                        <select className="form-select form-select-lg w-50" name="filter" title="filter" onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="incomplete">Incomplete</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopNavBar