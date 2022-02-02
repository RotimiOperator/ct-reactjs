import React, { useState } from 'react';

export default function Form() {
    //const [anumber, setAnumber] = useState("");
    //const [selectedFile, setSelectedFile] = useState(null);
    const [anumberMsg, setAnumberMsg] = useState('');
    const [fileMsg, setFileMsg] = useState('');

    const handleNumberInput = (e) => {
        const anumberValue = e.target.value;
        if (anumberValue.length < 1) {
          setAnumberMsg("");
        } else if (!isNaN(anumberValue) && !isNaN(parseInt(anumberValue, 10))) {
          setAnumberMsg("Good: Correct! Your input is a number!");
        } else {
          setAnumberMsg("Bad: Your input is not a number, your input must be a number!");
        };
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        const maxsize = 1024 * 1024 * 2;
        const filetype = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        
        if (file.size > maxsize) {
            setFileMsg("Bad: File size cannot exceed more than 2MB!");
        } else if (filetype.indexOf(file.type) < 0) {
            setFileMsg("Bad: File type is not an image or PDF! Supported file type: JPG, PNG, GIF or PDF!");
        } else {
            //setSelectedFile(file);
            setFileMsg("Good: File size is 2MB or less and File type is supported!");
        };
    };

    return (
        <form>
            <label>This input accepts only numbers</label>
            <input type="text" /* value={anumber} */ onChange={handleNumberInput} />
            {anumberMsg ? <span className={anumberMsg[0] === 'G' ? 'good' : 'bad'}>{anumberMsg}</span> : ''}

            <br /><br /><br /><br />

            <label>This input accepts not more than 2MB</label>
            <input type="file" /*value={selectedFile}*/ onChange={handleFileInput} />
            {fileMsg ? <span className={fileMsg[0] === 'G' ? 'good' : 'bad'}>{fileMsg}</span> : ''}
        </form>
    );
};