import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';


export default function List({ handleToogle, handleDelete, filterToDoTask }) {

    return (
        <ul className='list'>
            {filterToDoTask.map((listItem) => {

                return <li key={listItem.id} className={listItem.done ? "done" : ""}>
                    <div>{listItem.task}</div>
                    <div className='actions'>{listItem.done ? (<CheckCircleIcon className='check-icon' onClick={() => handleToogle(listItem.id)} />) : (<CheckBoxOutlineBlankIcon className='check-icon' onClick={() => handleToogle(listItem.id)} />)}</div>
                    <DeleteIcon className='delete-icon' onClick={() => handleDelete(listItem.id)} />
                </li>
            })}
            
        </ul>
    );
}
