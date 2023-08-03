import { useEffect, useState } from 'react';
import './App.css';
import { UsersList } from './components/UsersList';
import { User } from './components/User.interface';
import { ButtonOptions } from './components/ButtonOptions';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
    .then(async res => res.json())    
    .then(res => {
      setUsers(res.results);
    })
    .catch( e => console.log(e));
  },[]);

  return (
    <div className='App'>
      <h1>Table with candidates</h1>
      <ButtonOptions />
      <UsersList users={users} />
    </div>
  )
}

export default App;
