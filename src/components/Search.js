import React, { useEffect, useState } from 'react';
import { JatodianSEs } from "../data/jatado-se-team";

export default function Search() {
  
      const [searchKeyword, setSearchKeyword] = useState('');
      const [team, setTeam] = useState([]);

      const handleChange = (e) => {
        setSearchKeyword(e.target.value);
      };

      useEffect(() => {
        setTeam(JatodianSEs);
      }, []);

      let JSEteam = team;
      let search = searchKeyword.trim().toLowerCase();
  
      if (search.length > 0) {
        JSEteam = JSEteam.filter(function(team) {
          return team.name.toLowerCase().match(search);
        });
      }
  
      return (
        <div>
          <h1>Search For The Position of A Jatodian Software Engineer!</h1>
          <div>
            <input
              type="text"
              value={searchKeyword}
              onChange={handleChange}
              placeholder="Search for a Jatado Engineer"
            />
            {search.length && JSEteam.length ? 
            (<div>
                    {JSEteam.map((engineer, index) => {
                        return (
                          <div key={index}>
                            <div className="card">
                                <span className="mood">{engineer.mood}</span>
                                <span className="name">{engineer.name}</span>
                                <span className="position">{engineer.position}</span>
                            </div>
                          </div>
                        );
                    })}
            </div>)
            : search.length && !JSEteam.length ? ('No Match Found!')
            :(
                'Are you a Jatado Engineer ? Yes! Search for your Position using your name.'
            )}
          </div>
        </div>
      );
  };