import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res.writeHead(400).end(JSON.stringify({ message: "Field title is required!" }));
      }

      if (!description) {
        return res.writeHead(400).end(JSON.stringify({ message: "Field description is required!" }));
      }

      const task = {
        id: randomUUID(),
        title: title.trim(),
        description: description.trim(),
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      database.insert("tasks", task);

      return res.writeHead(201).end(JSON.stringify({ message: "Task created!" }))
    }
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { searchParams } = req.query;

      const tasks = database.select('tasks', {
        id: searchParams,
        title: searchParams,
        description: searchParams
      });

      if (!tasks.length) {
        return res.writeHead(404).end(JSON.stringify({ message: "Task not found" }));
      }

      return res.writeHead(200).end(JSON.stringify(tasks));
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title && !description) {
        return res.writeHead(400).end(JSON.stringify({ message: "Fields title or description are required!" }));
      }

      const [task] = database.select('tasks', { id });

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({ message: "Task not found" }));
      }

      database.update('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date()
      })

      return res.writeHead(204).end();
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id });

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({ message: "Task not found" }));
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id });

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({ message: "Task not found" }));
      }

      const isTaskCompleted = !!task?.completed_at;
      const completed_at = isTaskCompleted ? null : new Date();

      database.update('tasks', id, { completed_at });

      return res.writeHead(204).end();
    },
  }
];
