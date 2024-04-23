
# Chatbot Flow Builder

The Chatbot Flow Builder is a tool for creating chatbot flows by connecting multiple text nodes to determine the sequence of interactions.

## Features

1. **Text Node**
   - Supports only text messages.
   - Multiple text nodes can be added to a single flow.
   - Nodes can be added to the flow by dragging and dropping from the Nodes Panel.

2. **Nodes Panel**
   - Contains all supported node types.
   - Currently supports only text nodes but can be extended for more node types in the future.

3. **Edge**
   - Connects two nodes to define the flow.

4. **Source Handle**
   - Originates from a source node.
   - Only one edge can originate from a source handle.

5. **Target Handle**
   - Connects to a target node.
   - Multiple edges can connect to a target handle.

6. **Settings Panel**
   - Appears when a node is selected.
   - Allows editing the text content of the selected text node.

7. **Save Button**
   - Saves the flow.
   - Shows an error if there are more than one nodes and more than one node has empty target handles.

## Bonus Features
- User can delete nodes
- Save changes button will only enable when some changes are made by user.

## Technologies Used

- ReactFlow: Building the flow builder interface.
- React: Building the UI components.
- TypeScript: Used for implementation.
- Antd: For components.

## Usage

1. Drag and drop text nodes to create a flow.
2. Connect nodes using edges to define the conversation flow.
3. Single click on nodes to edit their text content or delete node.
4. Click the Save button to save the flow. An error will be shown if there are any configuration issues.

## Development

1. Clone the repository.
2. Install dependencies with `npm install` or `yarn install`.
3. Run the development server with `npm run dev` or `yarn run dev`.
4. Deployed link - https://chatbot-flow.netlify.app