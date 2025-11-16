---
title: Python Class Tutorial
estimatedTime: 8 minutes
difficulty: beginner
mode: unified
---

```python
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self.is_active = True
    
    def deactivate(self):
        self.is_active = False
    
    def send_email(self, message):
        if self.is_active:
            print(f"Sending to {self.email}: {message}")
        else:
            print("User is inactive")
```

## Define the class

highlight: 1

We start by defining a User class. Classes in Python use the `class` keyword followed by the class name.

## Initialize with constructor

highlight: 2-5

The `__init__` method is Python's constructor. It runs when you create a new User instance. We set up three attributes: name, email, and a default active status.

## Add a deactivate method

highlight: 7-8

This method changes the user's active status to False. Simple methods like this modify the object's state.

## Implement email functionality

highlight: 10-14

The send_email method checks if the user is active before sending. This demonstrates conditional logic within a class method.

## Create and use an instance

Now you can create users and call these methods:

```python
user = User("Alice", "alice@example.com")
user.send_email("Welcome!")
user.deactivate()
user.send_email("This won't send")
```