
import { useState } from "react";
import {useEffect} from 'react';
import ReactMarkdown from "react-markdown";
function MarkDown() {
  
  const [markdown, setMarkdown] = useState('# Enter title here\n');
  const [notes, setNotes] = useState(['']); // Initial note
  const [isWriting, setIsWriting] = useState(true);
  const [titles, setTitles] = useState(['# Enter title here']);

  const handleAddNote = () => {
    setNotes((prevNotes) => [...prevNotes, '']);
  };

  const handleNoteInputChange = (e, index) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = e.target.value;
    setNotes(updatedNotes);
  };

  const handleAddTitle = () => {
    setTitles((prevTitles) => {
      const newTitles = [...prevTitles];
      newTitles.push('# Enter title here');
      return newTitles;
    });
  };

  const handleDeleteTitle = (index) => {
    const updatedTitles = [...titles];
    updatedTitles.splice(index, 1);
    setTitles(updatedTitles);
  };

  const handleSwitchView = (view) => {
    setIsWriting(view === 'write');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'markdown') {
      setMarkdown(value);
      const lines = value.split('\n');
      if (lines.length > 0 && lines[0].startsWith('# ')) {
        setTitles([lines[0]]);
      } else {
        setTitles(['# Enter title here']);
      }
    } else if (name.startsWith('note_')) {
      const index = parseInt(name.split('_')[1], 10);
      const updatedNotes = [...notes];
      updatedNotes[index] = value;
      setNotes(updatedNotes);
    }
  };

  return (
    <div className="markdown-editor">
      <div className="notes-panel">
        <div className="titles">
          <span className='text'>NOTES</span>
          <button className='leftButton' onClick={handleAddTitle}>+</button>
        </div>
        {titles.map((title, index) => (
          <div key={index} className="title" style={{ backgroundColor: 'purple', padding: '5px', margin:'8px', color:'white ', fontSize:'18px'}}>
            {title}
            <button className='trash' onClick={() => handleDeleteTitle(index)}> <i className="fas fa-trash-alt"></i></button>
          </div>
        ))}
      </div>
      <div className="main-panel">
        <div className="navbar">
          <button onClick={() => handleSwitchView('write')}>
            Write
          </button>
          <button onClick={() => handleSwitchView('preview')}>
            Preview
          </button>
        </div>
        {isWriting ? (
          <div className="editor">
            <textarea
              value={markdown}
              name="markdown"
              onChange={handleInputChange}
              placeholder="Enter Markdown here..."
              rows='10'
              cols='50'
            />
            {notes.map((note, index) => (
              <div key={index} style={{ display: index === notes.length - 1 ? 'block' : 'none' }}>
                <textarea
                  value={note}
                  name={`note_${index}`}
                  onChange={(e) => handleNoteInputChange(e, index)}
                  placeholder="Enter Note here..."
                  rows='10'
                  cols='50'
                />
              </div>
            ))}
            <button onClick={handleAddNote}>Add Note</button>
          </div>
        ) : (
          <div className="preview">
            <ReactMarkdown children={markdown} />
          </div>
        )}
      </div>
    </div>
  );
  
 }
export default MarkDown;