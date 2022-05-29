import { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { AnyItem } from '../types';
import { DEFAULT_PARENT_ID } from '../constants';

interface EntityListProps {
    /**
     * The ID of the parent item
     * Ex. User -> Post -> Comment
     */
    parentId?: number;
    /**
     * The function to fetch the array of data
     */
    fetchData: () => Promise<AnyItem[]>;
    /**
     * A function which takes an item in and renders a list item
     */
    renderComponent: (item: AnyItem) => JSX.Element;
    /**
     * Handle when an item is clicked
     */
    handleSelect?: (id: number) => void;
}

interface FetchedDataState {
    [key: string | number]: AnyItem[];
}

const EntityList: FC<EntityListProps> = ({ parentId = DEFAULT_PARENT_ID, fetchData, renderComponent, handleSelect }) => {
    // We aren't using "loading"/"pending" state as to avoid unnecessary rerenders
    const [fetchedData, setFetchedData] = useState<FetchedDataState>({});

    useEffect(() => {
        (async () => {
            // If the data for that ID is already saved in
            // the component's state, don't fetch it again
            if (fetchedData[parentId]) return;

            // Make the request
            const data = await fetchData();

            // Save the results to the state
            setFetchedData((prev) => ({ ...prev, [parentId]: data }));
        })();
    }, [parentId]);

    return (
        <>
            {!fetchedData[parentId] && <p>Loading...</p>}
            {fetchedData[parentId] &&
                fetchedData[parentId].map((item) => (
                    <div key={item.id} onClick={handleSelect ? () => handleSelect(item.id) : undefined}>
                        {renderComponent(item)}
                    </div>
                ))}
        </>
    );
};

export default EntityList