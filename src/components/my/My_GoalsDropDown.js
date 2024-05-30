import React, { useState } from 'react';
import './My_GoalsDropDown.css';

function Dropdown({ options, selected, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownToggle = () => setIsOpen(!isOpen);
    const handleSelectOption = (option) => {
        onSelect(option.id.toString());
        setIsOpen(false);
    };
    const selectedCycleName = options.find(cycle => cycle.id.toString() === selected)?.name || "사이클 선택";
    return (
        <div className="dropdown">
            <h1 className="dropdown-trigger" onClick={handleDropdownToggle}>
                {selectedCycleName} <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
            </h1>
        {isOpen && (
            <ul className="dropdown-list">
                {options.map((option) => (
                    <li key={option.id} onClick={() => handleSelectOption(option)}>
                        {option.name}
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
}
export default Dropdown;