# [RocketSeat] - Ignite Challenge 01: HTTP Server

This project is a Node.js HTTP server developed as part of the RocketSeat Ignite Challenge. The server provides endpoints to manage tasks, allowing you to create, retrieve, update, delete, and mark tasks as completed.

## Features

- **Create a Task**: Add a new task with a title and description.
- **Get Tasks**: Fetch all tasks or search by `id`, `title`, or `description`.
- **Update a Task**: Update an existing task's fields.
- **Delete a Task**: Remove a task by its `id`.
- **Mark Task as Completed**: Update a task's status to completed.

## Routes

| Method  | Description                                  |
|---------|----------------------------------------------| 
| `POST`  | Create a new task.                           |
| `GET`   | Get all tasks or a task matching the search. |
| `PUT`   | Update a task.                               |
| `DELETE`| Delete a task by `id`.                       |
| `PATCH` | Mark a task as completed.                    |

## Technologies

- **Node.js**: Server runtime.
- **HTTP Module**: For handling HTTP requests and responses.

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm run dev
   ```

## Usage

- Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the endpoints.
- Example requests:

  - **Create a task**:
    ```bash
    POST /tasks
    ```

    ```json
    {
      "title": "Sample Task",
      "description": "This is a test task."
    }
    ```

  - **Get all tasks**:
    ```bash
    GET /tasks
    ```

  - **Get tasks with search**:
    ```bash
    GET /tasks?searchParams=Sample
    ```

  - **Update a task**:
  ```bash
    PUT /tasks/12345
    ```  
    
    ```json
    {
      "title": "Updated Task",
      "description": "Updated description."
    }
    ```

  - **Delete a task**:
    ```bash
    DELETE /tasks/12345
    ```

  - **Mark a task as completed**:
    ```bash
    PATCH /tasks/12345
    ```

## License

This project is for educational purposes and follows the RocketSeat guidelines.
