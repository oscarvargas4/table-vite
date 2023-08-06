import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { SortBy, User } from './User.interface.ts';
import '../ButtonOptions/ButtonOptions.css';
import './UsersList.css';

type UserListProps = {
  users: User[],
  paintedRows: boolean,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  changeSorting: (sort: SortBy) => void,
};

export default function UsersList(props: UserListProps) {
  const {
    users, paintedRows, setUsers, changeSorting,
  } = props;
  const paintedRowsEnabled = paintedRows ? 'coloured' : 'transparent';

  const headers = [
    {
      id: '1',
      name: 'Picture',
      sorterIcon: false,
      sorting: SortBy.NONE,
    },
    {
      id: '2',
      name: 'First Name',
      sorterIcon: true,
      sorting: SortBy.NAME,
    },
    {
      id: '3',
      name: 'Last Name',
      sorterIcon: true,
      sorting: SortBy.LAST,
    },
    {
      id: '4',
      name: 'Country',
      sorterIcon: true,
      sorting: SortBy.COUNTRY,
    },
    {
      id: '5',
      name: 'Actions',
      sorterIcon: false,
      sorting: SortBy.NONE,
    },
  ];

  const deleteUser = (id: string) => {
    setUsers(users.filter((u) => u.login.uuid !== id));
  };

  const headWithSorter = headers.map((h) => (
    <th key={h.id} onClick={() => changeSorting(h.sorting)}>
      {h.name}
      {h.sorterIcon && <FontAwesomeIcon icon={faSort} beat />}
    </th>
  ));

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          {headWithSorter}
        </tr>
      </thead>
      <tbody className={paintedRowsEnabled}>
        {users.map((u) => (
          <tr key={u.login.uuid}>
            <td><img src={u.picture.thumbnail} alt="" /></td>
            <td>{u.name.first}</td>
            <td>{u.name.last}</td>
            <td>{u.location.country}</td>
            <td><button type="button" onClick={() => deleteUser(u.login.uuid)}>Borrar</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
