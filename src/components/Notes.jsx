import React from "react";
import { useState, useEffect } from "react";

const Note = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [notes, setNotes] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editedNote, setEditedNote] = useState("");
    
    //save data to local storage
    useEffect (() => {
        localStorage.setItem("Notes", JSON.stringify(notes))
    }, [notes]);

    //get the saved notes and add them to the array 
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
    if (data) {
        setNotes(data);
    }
    }, []);

    function handleChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (inputValue.trim() === "") {
            alert("Please add note");
            return;
        }
        const newNote = {
            id: new Date().getTime(),
            text: inputValue
        };
        setNotes([...notes, newNote]);
        setInputValue("");
    }

    function deleteNote(id) {
        setNotes(notes.filter((note) => note.id !== id));
    }

    function editNote(id, text) {
        setEditId(id);
        setEditedNote(text);
    }

    function handleEdit(event, id) {
        event.preventDefault();
        const updatedNotes = notes.map((note) => {
            if (note.id === id) {
                return { ...note, text: editedNote };
            }
            return note;
        });
        setNotes(updatedNotes);
        setEditId(null);
        setInputValue("");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="ui action input">
                    <input
                        type="text"
                        placeholder="New Note..."
                        value={inputValue}
                        onChange={handleChange} />
                    <button type="submit" className="ui button">Save</button>
                </div>
            </form>
            <div className="note">
                {notes.map((note) => (
                    <div key={note.id}>
                        {editId === note.id ? (
                            <form onSubmit={(event) => handleEdit(event, note.id)}>
                                <input
                                    type="text"
                                    placeholder="Edit note..."
                                    value={editedNote}
                                    onChange={(event) => setEditedNote(event.target.value)}
                                />
                                <button type="submit">Update</button>
                            </form>
                        ) : (
                            <>
                                {note.text}
                                <button
                                    onClick={() => editNote(note.id)}>Edit</button>
                                <button
                                    onClick={() => deleteNote(note.id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Note;

