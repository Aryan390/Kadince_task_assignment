import React, { useState, useMemo } from "react";
import {
  Trash2,
  Edit3,
  Check,
  X,
  Plus,
  ListTodo,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Card, CardContent } from "./UI/Card";
import Button from "./UI/Button";
import Badge from "./UI/Badge";
import Input from "./UI/Input";

const TodoApp = () => {
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTodos((prev) => [todo, ...prev]);
      setNewTodo("");
    }
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "pending":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-2xl shadow-medium">
              <ListTodo className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Todo Master
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Organize your tasks with style and efficiency
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slide-in">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">24</div>
              <div className="text-sm text-muted-foreground">Total Tasks</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-warning mb-1">2</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success mb-1">1</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Add Todo */}
        <Card className="mb-8 bg-gradient-card border-0 shadow-medium animate-slide-in">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 border-border/50 focus:border-primary"
                onKeyPress={(e) => handleKeyPress(e, addTodo)}
              />
              <Button onClick={addTodo} className="px-6">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 animate-fade-in">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All ({32})
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
            size="sm"
          >
            Pending ({32})
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
            size="sm"
          >
            Completed ({32})
          </Button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <Card className="bg-gradient-card border-0 shadow-soft animate-fade-in">
              <CardContent className="p-12 text-center">
                <Circle className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No tasks found
                </h3>
                <p className="text-muted-foreground">
                  {filter === "all"
                    ? "Add your first task to get started!"
                    : `No ${filter} tasks at the moment.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredTodos.map((todo, index) => (
              <Card
                key={todo.id}
                className={cn(
                  "bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-200 animate-slide-in",
                  todo.completed && "opacity-75"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {/* Complete Toggle */}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => toggleComplete(todo.id)}
                      className={cn(
                        "shrink-0",
                        todo.completed
                          ? "text-success hover:text-success/80"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </Button>

                    {/* Todo Text */}
                    <div className="flex-1">
                      {editingId === todo.id ? (
                        <Input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                          className="border-border/50 focus:border-primary"
                          autoFocus
                        />
                      ) : (
                        <span
                          className={cn(
                            "block text-sm",
                            todo.completed &&
                              "line-through text-muted-foreground"
                          )}
                        >
                          {todo.text}
                        </span>
                      )}
                    </div>

                    {/* Status Badge */}
                    <Badge
                      variant={todo.completed ? "default" : "secondary"}
                      className={cn(
                        "shrink-0",
                        todo.completed
                          ? "bg-success text-success-foreground"
                          : "bg-warning text-warning-foreground"
                      )}
                    >
                      {todo.completed ? "Completed" : "Pending"}
                    </Badge>

                    {/* Actions */}
                    <div className="flex gap-1 shrink-0">
                      {editingId === todo.id ? (
                        <>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={saveEdit}
                            className="text-success hover:text-success/80"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={cancelEdit}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => startEdit(todo.id, todo.text)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => deleteTodo(todo.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
