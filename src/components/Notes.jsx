import React from "react";
import { useState, useEffect } from "react";

const Note = (props) => {
    const [inputValue, setInputValue] = useState("");
    const [notes, setNotes] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editedNote, setEditedNote] = useState("");

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
        setNotes((prevNotes) => {
            const updatedNotes = [...prevNotes, newNote];
            localStorage.setItem("Notes", JSON.stringify(updatedNotes)); // Save to localStorage immediately
            return updatedNotes;
        });
        setInputValue("");
    }

    function deleteNote(id) {
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.filter((note) => note.id !== id);
            localStorage.setItem("Notes", JSON.stringify(updatedNotes)); // Save to localStorage immediately
            return updatedNotes;
        });
    }

    function editNote(id, text) {
        setEditId(id);
        setEditedNote(text);
    }

    function handleEdit(event, id) {
        event.preventDefault();
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((note) => {
                if (note.id === id) {
                    return { ...note, text: editedNote };
                }
                return note;
            });
            localStorage.setItem("Notes", JSON.stringify(updatedNotes)); // Save to localStorage immediately
            return updatedNotes;
        });
        setEditId(null);
        setEditedNote("");
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
                                <button className="button" id="editBtn"
                                    onClick={() => editNote(note.id)}>Edit</button>
                                <button className="button" id="deleteBtn"
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

