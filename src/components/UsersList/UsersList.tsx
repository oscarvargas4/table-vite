import { User } from "./User.interface"
import "../ButtonOptions/ButtonOptions"

type UserListProps = {
    users: User[],
    paintedRows: boolean,
    setUsers: React.Dispatch<React.SetStateAction<User[]>>,
}


export const UsersList = (props: UserListProps) => {
    const users = props.users;
    const paintedRowsEnabled = props.paintedRows ? 'coloured' : 'transparent';
    const setUsers = props.setUsers;

    const deleteUser = (id: string) => {
        setUsers(users.filter(u => u.login.uuid !== id));
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
                {users.map(u => {
                    return (
                        <tr key={u.login.uuid}>
                            <td><img src={u.picture.thumbnail} alt="" /></td>
                            <td>{u.name.first}</td>
                            <td>{u.name.last}</td>
                            <td>{u.location.country}</td>
                            <td><button onClick={() => deleteUser(u.login.uuid)}>Borrar</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}