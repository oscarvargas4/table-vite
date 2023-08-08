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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('https://randomuser.me/api/?results=10')
      .then((res) => {
        if (!res.ok) throw new Error('Error trying to fetch Users');
        return res.json();
      })
      .then((res) => {
        setUsers(res.results);
        initialValues.current = res.results;
      })
      .catch((e) => {
        setError(e);
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const restoreUsers = () => {
    setUsers(initialValues.current);
  };

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const filteredUsers = useMemo(() => (filterByCountry
    ? users
      .filter((u) => u.location.country.toLocaleLowerCase().includes(filterByCountry.toLocaleLowerCase()))
    : users), [users, filterByCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
      [SortBy.COUNTRY]: user => user.location.country,
    };

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <header style={{
        display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center', alignContent: 'center',
      }}
      >
        <ButtonOptions
          paintedRows={paintedRows}
          setPaintedRows={setPaintedRows}
          restoreUsers={restoreUsers}
          sorting={sorting}
          toggleSortByCountry={toggleSortByCountry}
          setFilterByCountry={setFilterByCountry}
        />
      </header>
      <main>
        {loading && <p>Loading...</p>}
        {!loading && error && <p>Cannot load users</p>}
        {!loading && !error && users.length === 0 && <p>There are no Users</p>}
        {!loading && !error && users.length > 0 && <UsersList users={sortedUsers} setUsers={setUsers} paintedRows={paintedRows} changeSorting={handleChangeSort} />}
      </main>
    </div>
  );
}

export default App;
