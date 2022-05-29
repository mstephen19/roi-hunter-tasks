# Task

Rewrite class components into functional components

## Notes

- I decided to not implement the `isPending` state for the `EntityList` component to avoid unnecessary rerenders. Rather, we am going by whether or not the data has been saved in the component's state. Even if the API returns an empty array, it will not always say `Loading...`. It will only say that if the item is undefined.
- Decided to keep the `entityRender` prop and the workflow around it, just changed the name to `renderComponent`.
- Modularized some things to make everything easier to understand, wrote types, and also added comments.
- In general, tried to change as little as possible, just migrating the class components over to functional ones.