import { useState, useEffect } from 'react';
import type { FC, ChangeEvent } from 'react';
import type { User } from '../types';
import { getUsers } from '../utils';

interface SignInProps {
    onSignIn: (user: User) => void;
    onSignOut: () => void;
}

const SignIn: FC<SignInProps> = ({ onSignIn, onSignOut }) => {
    const [error, setError] = useState<Error | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [signedIn, setSignedIn] = useState<boolean>(false);

    // When the component first renders, make the API call
    useEffect(() => {
        (async () => {
            try {
                // If it succeeds, great. Set user list
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                // Otherwise, set error (not using alert, that's bad)
                setError(error as Error);
            }
        })();
    }, []);

    const onUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
        // If the user is at all changing the select, that
        // means they are trying to log into a new account
        // and should be auto-signed out. Inside a useEffect
        // this logic was problematic and signed them out
        // any time they made a selection.
        if (signedIn) {
            setSignedIn(false);
            onSignOut();
        }

        setSelectedId(+e.target.value);
    };

    const onSignInClick = () => {
        setSignedIn(true);
        // Only using .find here because we have a small array of
        // 10 items. If the array were larger, would handle things
        // differently. This prop function sets the signedInUser state
        // back in the App component.
        onSignIn(users.find((user) => user.id === selectedId) as User);
    };

    return (
        <>
            {/* Conditionally render error */}
            {error && <p style={{ color: 'red' }}>An error occurred fetching users!: {error?.message}</p>}
            {/* Based on signin, display a different message */}
            {signedIn ? <p>Signed in as user with ID: {selectedId}</p> : <p>Not signed in.</p>}
            {users.length && (
                <div>
                    {/* Using "defaultValue" instead of first option selected by default. This
                    input is uncontrolled. */}
                    <select onChange={onUserChange} defaultValue={users[0].id}>
                        {/* Use IDs from the API instead of randomly guessing. 666 hardcoded
                    would cause massive issues.*/}
                        {users.map(({ id }) => (
                            <option key={id}>{id}</option>
                        ))}
                    </select>
                    <button onClick={onSignInClick} disabled={!selectedId}>
                        Sign In
                    </button>
                </div>
            )}
        </>
    );
};

export default SignIn;
