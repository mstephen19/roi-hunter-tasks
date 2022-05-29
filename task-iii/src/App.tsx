import { useState } from 'react';
import { SignIn, UserProfile } from './components';
import { User } from './types';

function App() {
    // Instead of just the User ID, this is now the entire User object
    const [signedInUser, setSignedInUser] = useState<User | null>(null);

    return (
        <div>
            {/* Define sign out function while passing the prop */}
            <SignIn onSignOut={() => setSignedInUser(null)} onSignIn={setSignedInUser} />
            {/* Pass whole user object into userprofile */}
            <UserProfile user={signedInUser} />
        </div>
    );
}

export default App;
