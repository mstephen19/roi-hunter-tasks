# Task

Fix rendering and logic issues

## Notes

- First thing I did was split the thing into multiple files so that it's not confusing. One component per file rule (unless the components are teeny tiny)
- Along with adding types, fixing logic, etc. I also added better namings
- The select in the SignIn component is weird. These should be rendered based on the API, not hardcoded
- Made the `getUsers` function throw an error instead of returning one so that it can be caught
- I made the decision to move the User data fetching logic into the `SignIn` component. It could have just as easily been done in the parent of both the `SignIn` and `UserProfile` components, in this case the `App` component.
- Added lots of comments explaining most decisions