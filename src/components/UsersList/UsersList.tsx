import { User } from './User.interface.ts';
import '../ButtonOptions/ButtonOptions.css';

type UserListProps = {
  users: User[],
  paintedRows: boolean,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
};

export default function UsersList(props: UserListProps) {
  const { users, paintedRows, setUsers } = props;
  const paintedRowsEnabled = paintedRows ? 'coloured' : 'transparent';

  const deleteUser = (id: string) => {
    setUsers(users.filter((u) => u.login.uuid !== id));
  };

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Picture</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Country</th>
          <th>Actions</th>
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
