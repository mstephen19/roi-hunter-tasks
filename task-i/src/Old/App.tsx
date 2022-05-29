// @ts-nocheck
// This is the original file provided on CodePen

import React from 'react';
import './App.css';

const apiRequest = (...params) => fetch(...params).then((response) => response.json());
const apiGetUsers = () => apiRequest('https://jsonplaceholder.typicode.com/users');
const apiGetPosts = (userId) => apiRequest(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
const apiGetComments = (postId) => apiRequest(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

const DEFAULT_PARENT_ID = 'DEFAULT_PARENT_ID';

class EntityList extends React.Component {
    defaultProps = {
        parentId: DEFAULT_PARENT_ID,
    };

    state = {};

    componentDidMount() {
        this.loadEntities(this.props.parentId);
    }

    componentDidUpdate(prevProps) {
        console.log(render);
        const { parentId } = this.props;
        if (prevProps.parentId !== parentId && !this.state[parentId]) {
            this.loadEntities(parentId);
        }
    }

    loadEntities(parentId) {
        const { fetchData } = this.props;
        if (!fetchData) {
            return;
        }

        this.setState({ [parentId]: { ...this.state[parentId], isPending: true } });

        fetchData().then((response) => this.setState({ [parentId]: { response, isPending: false } }));
    }

    render() {
        const { parentId, entityRenderer, onSelect } = this.props;
        const entities = this.state[parentId];

        if (!entities) {
            return null;
        }
        if (entities.isPending) {
            return 'Loading...';
        }

        return (
            <div>
                {entities.response.map((entity) => (
                    <div key={entity.id} onClick={onSelect ? () => onSelect(entity.id) : undefined}>
                        {entityRenderer(entity)}
                    </div>
                ))}
            </div>
        );
    }
}

class App extends React.Component {
    state = {
        selectedUserId: null,
        selectedPostId: null,
    };

    render() {
        const { selectedUserId, selectedPostId } = this.state;

        return (
            <div className='entities'>
                <div className='entity-block'>
                    <h2>Users</h2>
                    <EntityList onSelect={this.handleUserSelect} fetchData={apiGetUsers} entityRenderer={this.renderUser} />
                </div>
                <div className='entity-block'>
                    <h2>Posts</h2>
                    <EntityList
                        onSelect={this.handlePostSelect}
                        parentId={selectedUserId}
                        fetchData={selectedUserId ? () => apiGetPosts(selectedUserId) : undefined}
                        entityRenderer={this.renderPost}
                    />
                </div>
                <div className='entity-block'>
                    <h2>Comments</h2>
                    <EntityList
                        parentId={selectedPostId}
                        fetchData={selectedPostId ? () => apiGetComments(selectedPostId) : undefined}
                        entityRenderer={this.renderComment}
                    />
                </div>
            </div>
        );
    }

    renderUser = (user) => <div className={'item' + (user.id === this.state.selectedUserId ? ' active' : '')}>{user.name}</div>;

    renderPost = (post) => <div className={'item' + (post.id === this.state.selectedPostId ? ' active' : '')}>{post.title}</div>;

    renderComment = (comment) => <div className='active'>{comment.name}</div>;

    handleUserSelect = (userId) => this.setState({ selectedUserId: userId, selectedPostId: null });

    handlePostSelect = (postId) => this.setState({ selectedPostId: postId });
}

export default App;
