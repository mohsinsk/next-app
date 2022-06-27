import Head from 'next/head';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import { userService } from '../../services/user.service';

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, [])

    return (
        <>
            <div className='text-center'>
                <h1 className="text-primary">Users Page</h1>

                <div className="card mt-4">
                    <h4 className="card-header">You are logged in User!!</h4>
                    <div className="card-body">
                        {users &&
                            <ul>
                                {users.map(user =>
                                    <li className='list-group-item' key={user.id}>{user.firstName} {user.lastName}</li>
                                )}
                            </ul>
                        }
                        {!users && <div className="spinner-border spinner-border-sm"></div>}
                    </div>
                </div>
            </div>
        </>
    )
}