import { User } from "./User.interface"

type UserListProps = {
    users: User[]
}


export const UsersList = (props: UserListProps) => {
    const users = props.users;
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
            <tbody>
                {users.map(u => {
                    return (
                        <tr key={u.id.value}>
                            <td><img src={u.picture.thumbnail} alt="" /></td>
                            <td>{u.name.first}</td>
                            <td>{u.name.last}</td>
                            <td>{u.location.country}</td>
                            <td><button>Borrar</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}