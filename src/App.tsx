import { useEffect, useRef, useState } from 'react';
import './App.css';
import { UsersList } from './components/UsersList/UsersList';
import { User } from './components/UsersList/User.interface';
import { ButtonOptions } from './components/ButtonOptions/ButtonOptions';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [paintedRows, setPaintedRows] = useState<boolean>(false);
  const initialValues = useRef<User[]>([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
    .then(async res => res.json())    
    .then(res => {
      setUsers(res.results);
      initialValues.current = res.results;
    })
    .catch( e => console.log(e));
  },[]);

  const restoreUsers = () => {
    setUsers(initialValues.current);
  };

  return (
    <div className='App' style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h1>Table with candidates</h1>
      <ButtonOptions paintedRows={paintedRows} setPaintedRows={setPaintedRows} restoreUsers={restoreUsers}/>
      <UsersList users={users} setUsers={setUsers} paintedRows={paintedRows}/>
    </div>
  )
}

export default App;

