# Loading States

To support users on limited data and low-bandwidth connections, loading states must be informative and prevent the UI from appearing "broken".



## 1. General Rules
* **No Freezing**: Async data loading must always include visual indicators to prevent UI freezing.
* **Skeleton Loaders**: Use skeleton screens for page transitions and card feeds (e.g., Browse Needs, Impact Feed) to provide an immediate sense of layout.

* **Progress Indicators**: Long-running actions, such as "Proof-of-Use" media uploads, must show explicit progress bars.

## 2. Low-Bandwidth Optimization
* **Optimistic UI**: For actions like "Vouching" or "Pledge Confirmation," the UI should reflect success immediately while the server-side sync completes in the background.
* **Low-Data Spinners**: Avoid heavy GIF loaders. Use lightweight CSS-based spinners or tokenized brand icons.
* **Meaningful Feedback**: If a load takes longer than 5 seconds, provide a reassuring message: "Connecting to the network... thank you for your patience".