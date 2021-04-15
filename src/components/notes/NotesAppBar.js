import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active:note} = useSelector(state => state.notes);

    const handleSave = () => {
        dispatch(startSaveNote(note));
    };

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    };

    const handleFileChange = (e) => {
       
        const file = e.target.files[0];
        if(file){
            dispatch(startUploading(file));
            document.querySelector('#fileSelector').value = "";
        }
    };

    const noteDate = moment(note.date);

    return (
        <div className="notes__appbar">
            <span>{noteDate.format('MMMM Do YYYY, h:mm:ss a')}</span>

            <input
                id="fileSelector" 
                type="file"
                name="file"
                style= {{display: 'none'}}
                onChange= {handleFileChange}
            />

            <div>
                <button
                    className="btn"
                    onClick={handlePictureClick}
                >
                    Picture
                </button>
                <button
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
