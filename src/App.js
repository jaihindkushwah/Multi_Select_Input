import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pill from "./components/Pill";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersSets, setSelectedUsersSets] = useState(new Set([]));
  const inputRef=useRef();
  // https://dummyjson.com/users/search?q=John

  useEffect(() => {
    const fetchUsers = () => {
      if (searchTerm.trim() === "") {
        setSuggestion([]);
        return;
      }

      // fetch users
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => setSuggestion(data))
        .catch((error) => console.log(error));
    };
    fetchUsers();
  }, [searchTerm]);
  // console.log(suggestion);

  const handleSelectedUser = (user) => {
    if (selectedUsersSets.has(user.email)) {
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUsersSets(new Set([...selectedUsersSets, user.email]));
    setSuggestion([]);
    setSearchTerm("");
    inputRef.current.focus();
    
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u.email !== user.email));
    selectedUsersSets.delete(user.email);
    setSelectedUsersSets(new Set(selectedUsersSets));
    inputRef.current.focus();
  };
  
  const handleBackspaceDelete=(e)=>{
    if(searchTerm==="" && e.key==='Backspace' && selectedUsers.length!==0){
      // console.log("backspace");
      const lastUser=selectedUsers[selectedUsers.length-1];
      handleRemoveUser(lastUser);
    }
  }

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {/* pills */}
        {
          selectedUsers?.map((user) => (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          ))
        }
        {/* input field with search suggestion */}
        <div>
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            ref={inputRef}
            onKeyDown={handleBackspaceDelete}
            placeholder="Search for a User..."
          />
          {/* Search Suggestion */}
          {suggestion.users ? (
            <ul className="suggestions-list">
              {suggestion.users?.map((user) =>
                selectedUsersSets.has(user.email) ? null : (
                  <li key={user.email} onClick={() => handleSelectedUser(user)}>
                    <img
                      src={user.image}
                      width={25}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                )
              )}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
