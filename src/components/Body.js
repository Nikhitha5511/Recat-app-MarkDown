import { useState } from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";

function Body() {
    // const [markdown, setMarkdown] = useState("# Enter title here\n");
    // const [notes, setNotes] = useState([""]);
    // const [isWriting, setIsWriting] = useState(true);
    // const [titles, setTitles] = useState(["# Enter title here"]);
    // const [activeNoteIndex, setActiveNoteIndex] = useState(0);
  
    // const handleAddNote = () => {
    //   setNotes([...notes, ""]);
    //   setActiveNoteIndex(notes.length);
    // };
  
    // const handleNoteInputChange = (e, index) => {
    //   const updatedNotes = [...notes];
    //   updatedNotes[index] = e.target.value;
    //   setNotes(updatedNotes);
    // };
  
    // const handleAddTitle = () => {
    //   setTitles([...titles, "# Enter title here"]);
    // };
  
    // const handleDeleteTitle = (index) => {
    //   const updatedTitles = titles.filter((_, idx) => idx !== index);
    //   setTitles(updatedTitles);
    // };
  
    // const handleSwitchView = (view) => {
    //   setIsWriting(view === "write");
    // };
  
    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
  
    //   if (name === "markdown") {
    //     setMarkdown(value);
    //     const lines = value.split("\n");
    //     setTitles(lines[0] && lines[0].startsWith("# ") ? [lines[0]] : ["# Enter title here"]);
    //   } else if (name.startsWith("note_")) {
    //     const index = parseInt(name.split("_")[1], 10);
    //     const updatedNotes = [...notes];
    //     updatedNotes[index] = value;
    //     setNotes(updatedNotes);
    //   }
    // };
  
    // return (
    //   <div className="markdown-editor">
    //     <div className="notes-panel">
    //       <div className="titles">
    //         <span className="text">NOTES</span>
    //         <button className="leftButton" onClick={handleAddTitle}>
    //           +
    //         </button>
    //         {titles.map((title, index) => (
    //           <button key={index} onClick={() => setActiveNoteIndex(index)}>
    //             {title}
    //           </button>
    //         ))}
    //         {titles.length > 1 && (
    //           <button className="trash" onClick={() => handleDeleteTitle(activeNoteIndex)}>
    //             <i className="fas fa-trash-alt"></i>
    //           </button>
    //         )}
    //       </div>
    //     </div>
    //     <div className="main-panel">
    //       <div className="navbar">
    //         <button onClick={() => handleSwitchView("write")}>Write</button>
    //         <button onClick={() => handleSwitchView("preview")}>Preview</button>
    //       </div>
    //       {isWriting ? (
    //         <div className="editor">
    //           <textarea value={markdown} name="markdown" onChange={handleInputChange} placeholder="Enter Markdown here..." rows="10" cols="50" />
    //           <textarea
    //             value={notes[activeNoteIndex]}
    //             name={`note_${activeNoteIndex}`}
    //             onChange={(e) => handleNoteInputChange(e, activeNoteIndex)}
    //             placeholder="Enter Note here..."
    //             rows="10"
    //             cols="50"
    //           />
    //           <button onClick={handleAddNote}>Add Note</button>
    //         </div>
    //       ) : (
    //         <div className="preview">
    //           <ReactMarkdown children={markdown} />
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // );
    const [markdown, setMarkdown] = useState("# Enter title here\n");
  const [isWriting, setIsWriting] = useState(true);
  const [titles, setTitles] = useState(["# Enter title here"]);
  const [currentTextarea, setCurrentTextarea] = useState(''); 
  // Track the content of the current textarea
  const [pages, setPages] = useState([{ title: "# Enter title here\n", content: "" }]);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeNoteIndex, setActiveNoteIndex] = useState(0);
  const [notes, setNotes] = useState([""]); // Initial note

  const handleAddNote = () => {
    setNotes((prevNotes) => [...prevNotes, ""]);
    setActiveNoteIndex(notes.length); // Set the active note to the newly added note
  };
 
  const handleAddPage = () => {
    setPages([...pages, { title: "# Enter title here\n", content: "" }]);
    setActivePageIndex(pages.length);
    setPages([...pages, '']);
    setTitles([...titles, '# Enter title here']);

  };

  const handleTitleChange = (e) => {
    const updatedPages = [...pages];
    updatedPages[activePageIndex].title = e.target.value;
    setPages(updatedPages);

    const lines = e.target.value.split("\n");
    setTitles([lines[0] && lines[0].startsWith("# ") ? lines[0] : "# Enter title here"]);
  };

  const handleContentChange = (e) => {
    const updatedPages = [...pages];
    updatedPages[activePageIndex].content = e.target.value;
    setPages(updatedPages);
  };

  const handleSwitchPage = (index) => {
    setActivePageIndex(index);
  };
  const handleAddTitle = () => {
    setTitles((prevTitles) => [...prevTitles, "# Enter title here"]);
  };
  const handleDeleteTitle = (index) => {
    const updatedTitles = titles.filter((_, idx) => idx !== index);
    setTitles(updatedTitles);
  };

  const handleSwitchView = (view) => {
    setIsWriting(view === "write");
  };

//   const handleInputChange = (e) => {
//     const { value } = e.target;
//     setMarkdown(value);
//     const lines = value.split("\n");
//     setTitles([lines[0] && lines[0].startsWith("# ") ? lines[0] : "# Enter title here"]);
    
//   };
  const handlePageChange = (e, index) => {
    const updatedPages = [...pages];
    updatedPages[index] = e.target.value;
    setPages(updatedPages);

    const lines = e.target.value.split('\n');
    const updatedTitles = [...titles];
    updatedTitles[index] = lines[0] && lines[0].startsWith('# ') ? lines[0] : '# Enter title here';
    setTitles(updatedTitles);
  };

  
  const handleTextareaChange = (e) => {
    setCurrentTextarea(e.target.value);
    const lines = e.target.value.split("\n");
    setTitles([lines[0] && lines[0].startsWith("# ") ? lines[0] : "# Enter title here"]);
  };

  return (
    <div className="markdown-editor">
      <div className="notes-panel">
        <div className="titles">
          <span className="text">NOTES</span>
          <button className="leftButton" onClick={handleAddTitle}>
            +
          </button>
        </div>
        {titles.map((title, index) => (
          <div
            key={index}
            // className="title"
            className={`title ${index === activePageIndex ? "active" : ""}`}
            onClick={() => handleSwitchPage(index)}
            style={{
              backgroundColor: "purple",
              padding: "5px",
              margin: "8px",
              color: "white",
              fontSize: "18px",
            }}
          >
            {title}
            <button className="trash" onClick={() => handleDeleteTitle(index)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>
      <div className="main-panel">
        <div className="navbar">
          <button onClick={() => handleSwitchView("write")}>Write</button>
          <button onClick={() => handleSwitchView("preview")}>Preview</button>
        </div>
        {isWriting ? (
          <div className="editor">
            <textarea
              value={markdown}
              onChange={handlePageChange}
              placeholder="Enter Markdown here..."
              rows="54"
              cols="190"
            />
            
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
  
  export default Body;
  
  
  
  
  
  
  