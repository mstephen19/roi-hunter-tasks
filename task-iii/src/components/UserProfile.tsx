import type { FC } from 'react';
import type { User } from '../types';

interface UserProfileProps {
    user: User | null;
}

// This component is now highly simplified. We have the fetched user from the SignIn
// component, so here we just display that data. The fetching could have also been
// done within the App component instead.
const UserProfile: FC<UserProfileProps> = ({ user }) => {
    return (
        <>
            {/* User could be null */}
            {user && (
                <div>
                    <p>Name: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                </div>
            )}
        </>
    );
};

export default UserProfile;
