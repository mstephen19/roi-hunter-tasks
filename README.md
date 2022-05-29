# ROI Hunter Tasks

My solutions for all three tasks are within the folders. Each task's code has comments, and any important info not covered in comments is covered within the notes of each task's README file.

Each task is it's own "app" from the CRA TS template. Each can be run locally.

Thanks!

## Last note:

Since these assignments were very small, I decided to not follow a scalable and testable architecture (since they're all 1-3 components). Usually, I separate a single component into two parts - the "container" and the dumb "view layer" component which just takes in props and renders them. The "container" component is what handles all the state management, perhaps some filtering and mapping, etc. while the "view layer" takes the data from the container and paints it on the page. If you're interested in seeing this logic in action, I'd be more than happy to quickly walk you through one of my recent projects.
