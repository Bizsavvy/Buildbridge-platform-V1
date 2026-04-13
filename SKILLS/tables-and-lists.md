# Tables and Lists

Tables are primarily used in the Admin/Moderation dashboards, while List Feeds are used for Browse and Impact views.


## 1. List Feed Behavior (Discovery)
* **Card-Based Hierarchy**: All public-facing feeds (Browse Needs, Impact Wall) must use a strong card system with generous spacing.
* **Filtering & Sorting**: Users must be able to filter by Trade, Location, and Badge level, and sort by Urgency or Funding Progress.
* **Empty States**: Every list must have a dignified empty state if no results are found.
    
## 2. Table Behavior (Admin/Moderation)
* **Pagination**: All admin tables must support pagination to maintain performance.
* **Status Badges**: Use tokenized badges for moderation states (e.g., `PENDING`, `APPROVED`, `FLAGGED`).
* **Search/Sort**: Support searching and sorting for datasets exceeding 50 rows to assist moderators in fraud prevention.
* **Overflow Protection**: Columns must not overflow; use responsive horizontal scrolling for mobile-viewing of admin tables.