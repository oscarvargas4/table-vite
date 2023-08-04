import { useEffect, useRef, useState } from 'react';
import './App.css';
import { UsersList } from './components/UsersList/UsersList';
import { User } from './components/UsersList/User.interface';
import { ButtonOptions } from './components/ButtonOptions/ButtonOptions';

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [paintedRows, setPaintedRows] = useState<boolean>(false);
    const [sortByCountryEnabled, setSortByCountryEnabled] = useState<boolean>(false);
    const [filterByCountry, setFilterByCountry] = useState<string>('');
    const initialValues = useRef<User[]>([]);

    useEffect(() => {
        fetch('https://randomuser.me/api/?results=100')
            .then(async res => res.json())
            .then(res => {
                setUsers(res.results);
                initialValues.current = res.results;
            })
            .catch(e => console.log(e));
    }, []);

    const restoreUsers = () => {
        setUsers(initialValues.current);
    };

    const usersFilteredByCountry = filterByCountry
    ? users.filter(u => u.location.country.toLocaleLowerCase().includes(filterByCountry.toLocaleLowerCase()))
    : users;

    const sortedUsers = sortByCountryEnabled 
        ?  [...usersFilteredByCountry].sort((a, b) => {
            const userA = a.location.country;
            const userB = b.location.country;
            return userA.localeCompare(userB);
        })
        : usersFilteredByCountry;

    return (
        <div className='App' style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h1>Table with candidates</h1>
            <ButtonOptions paintedRows={paintedRows} setPaintedRows={setPaintedRows} restoreUsers={restoreUsers} sortByCountryEnabled={sortByCountryEnabled} setSortByCountryEnabled={setSortByCountryEnabled} setFilterByCountry={setFilterByCountry} />
            <UsersList users={sortedUsers} setUsers={setUsers} paintedRows={paintedRows} />
        </div>
    )
}

export default App;

