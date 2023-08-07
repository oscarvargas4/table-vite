import {
  useEffect, useRef, useState, useMemo,
} from 'react';
import './App.css';
import UsersList from './components/UsersList/UsersList.tsx';
import { User, SortBy } from './components/UsersList/User.interface.ts';
import ButtonOptions from './components/ButtonOptions/ButtonOptions.tsx';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [paintedRows, setPaintedRows] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterByCountry, setFilterByCountry] = useState<string>('');
  const initialValues = useRef<User[]>([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async (res) => res.json())
      .then((res) => {
        setUsers(res.results);
        initialValues.current = res.results;
      })
      .catch((e) => console.log(e));
  }, []);

  const restoreUsers = () => {
    setUsers(initialValues.current);
  };

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleChangeSort = (sort: SortBy) => {
    console.log(sort);
    setSorting(sort);
  };

  const filteredUsers = useMemo(() => {
    console.log('filtered');

    return filterByCountry
      ? users
        .filter((u) => u.location.country.toLocaleLowerCase().includes(filterByCountry.toLocaleLowerCase()))
      : users;
  }, [users, filterByCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
      [SortBy.COUNTRY]: user => user.location.country,
    };

    return [...filteredUsers].sort((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h1>Table with candidates</h1>
      <ButtonOptions
        paintedRows={paintedRows}
        setPaintedRows={setPaintedRows}
        restoreUsers={restoreUsers}
        sorting={sorting}
        toggleSortByCountry={toggleSortByCountry}
        setFilterByCountry={setFilterByCountry}
      />
      <UsersList users={sortedUsers} setUsers={setUsers} paintedRows={paintedRows} changeSorting={handleChangeSort} />
    </div>
  );
}

export default App;
