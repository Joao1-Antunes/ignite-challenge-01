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
        
      const task = {
        id: randomUUID(),
        title: title,
        description: description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      database.insert("tasks", task);

      return res.writeHead(201).end("Task Criada!");
    }
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { searchParams } = req.query;

      const tasks = database.select('tasks', {
        title: searchParams,
        description: searchParams
      })

      return res.writeHead(200).end(JSON.stringify(tasks));
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      return res.writeHead(204).end("Task deletada!");
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id });
      
      if (!task) {
        return res.writeHead(404).end("Task não encontrada!");
      }
      
      database.delete("tasks", id);

      return res.writeHead(204).end("Task deletada!");
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id });
      
      if (!task) {
        return res.writeHead(404).end("Task não encontrada!");
      }
      
      database.delete("tasks", id);

      return res.writeHead(204).end("Task deletada!");
    }
  },
];
