import { useState } from 'react';
import type { FC } from 'react';
import type { User, Post, Comment } from './types';
import { getUsers, getPosts, getComments } from './utils';
import EntityList from './components/EntityList';
import { UserItem, PostItem, CommentItem } from './components/Items';
import './App.css';

interface SelectedItemsState {
    userId: number | null;
    postId: number | null;
}

const App: FC = () => {
    const [selected, setSelected] = useState<SelectedItemsState>({
        userId: null,
        postId: null,
    });

    const handleUserSelect = (id: number) => {
        // Don't change the state if they're selecting
        // what's already selected
        if (id === selected.userId) return;
        setSelected({ userId: id, postId: null });
    };

    const handlePostSelect = (id: number) => {
        if (id === selected.postId) return;
        setSelected((prev) => ({ ...prev, postId: id }));
    };

    return (
        <div className='entities'>
            <div className='entity-block'>
                <h2>Users</h2>
                <EntityList
                    fetchData={() => getUsers()}
                    renderComponent={(item) => <UserItem item={item as User} selectedUserId={selected.userId} />}
                    handleSelect={handleUserSelect}
                />
            </div>
            <div className='entity-block'>
                <h2>Posts</h2>
                {selected?.userId && (
                    <EntityList
                        parentId={selected.userId}
                        fetchData={() => getPosts(selected.userId)}
                        renderComponent={(item) => <PostItem item={item as Post} selectedPostId={selected.postId} />}
                        handleSelect={handlePostSelect}
                    />
                )}
            </div>
            <div className='entity-block'>
                <h2>Comments</h2>
                {selected?.postId && (
                    <EntityList
                        parentId={selected.postId}
                        fetchData={() => getComments(selected.postId)}
                        renderComponent={(item) => <CommentItem item={item as Comment} />}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
