import type { FC } from 'react';
import type { User, Post, Comment } from '../types';

export const UserItem: FC<{ item: User; selectedUserId: number | null }> = ({ item, selectedUserId }) => {
    return <div className={'item' + (item?.id === selectedUserId ? ' active' : '')}>{item?.name}</div>;
};

export const PostItem: FC<{ item: Post; selectedPostId: number | null }> = ({ item, selectedPostId }) => {
    return <div className={'item' + (item?.id === selectedPostId ? ' active' : '')}>{item?.title}</div>;
};

export const CommentItem: FC<{ item: Comment }> = ({ item }) => {
    return <div className='active'>{item?.name}</div>;
};
