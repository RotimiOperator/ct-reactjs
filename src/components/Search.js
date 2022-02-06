import React, { useEffect, useState } from 'react';
import { filenames } from "../data/filenames";

export default function Search() {
      const [searchKeyword, setSearchKeyword] = useState('');
      const [filename, setFileName] = useState([]);

      const handleChange = (e) => {
        setSearchKeyword(e.target.value);
      };

      useEffect(() => {
        setFileName(filenames);
      }, []);

      let files = filename;
      let search = searchKeyword.trim().toLowerCase();
  
      if (search.length > 0) {
        var searchWord = files.filter(function(files) {
          return files.filename.toLowerCase().match(search);
        });

        var searchchars = search.split("");
        const searchCharFile = [];
        
        searchchars.forEach(element => {
          const searchCharFiles = files.filter(function(files) {
            return files.filename.toLowerCase().match(element)
          });
          searchCharFile.push(searchCharFiles);
        });

        var searchChar = Object.entries(
          Object.fromEntries(
            searchCharFile.flat(1)
            .map(v => [v.filename, v.description])))
            .map(([filename, description]) => ({filename, description}));

        var searchOther = searchChar.filter(a => !searchWord.map(b=>b.filename).includes(a.filename));
      }
  
      return (
        <div>
          <h1>Search Box!</h1>
          <div>
            <input
              type="text"
              maxLength={10}
              value={searchKeyword}
              onChange={handleChange}
              placeholder="Search for a File"
            />
            {search.length && files.length ? 
            (<div>
              {searchWord.length ? (<div className="card purple-card">
                {searchWord.length} Perfect Match Found!
              </div>) : (<></>)}
                    {searchWord.map((file, index) => {
                        return (
                          <div key={index}>
                            <div className="card">
                                <span className="icon">📂</span>
                                <span className="name">{file.filename}</span> <span className="name-info">(Perfect Match: contains exact string "{search}")</span>
                                <span className="desc">{file.description}</span>
                            </div>
                          </div>
                        );
                    })}
                    {searchOther.length ? (<div className="card purple-card">
                      {searchOther.length} Occurrences Found!
                    </div>) : (<></>)}
                    {searchOther.map((file, index) => {
                        return (
                          <div key={index}>
                            <div className="card red-card">
                                <span className="icon">📂</span>
                                <span className="name">{file.filename}</span> <span className="name-info">(Other Matches: contains any character in "{searchchars}")</span>
                                <span className="desc">{file.description}</span>
                            </div>
                          </div>
                        );
                    })}
            </div>)
            : search.length && !files.length ? ('No Match Found!')
            :(
                <div className="card purple-card">
                  Assuming you stored your files using each day of the week as the file name i.e Monday, Tuesday, and so on.
                  Search for a file using a certain day of the week.
                </div>
            )}
          </div>
        </div>
      );
  };