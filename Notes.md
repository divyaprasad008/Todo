### Functionality


# 3 users - Super Admin, Project manager, Members
# Projects -> tasks

# signup
# Login
# Resetpassword 

# Adding Organization
# Deactivating Organization

# Adding/Edit/Delete  users
# Adding/Edit/Delete projects
# Adding/Edit/Delete tasks
# Adding comments to the task

# Create Tasks
# Update Tasks
# Delete Tasks

# Super Admin able to create user
# Super Admin able to project
# Project Manager able to edit project



## Tables

# Organization
- id
- name - unique
- about
- url
- logo url
- is_active
- created_at
- updated_at

# users
- id
- organization_id
- firstname
- lastname
- about
- email - unique
- password
- photo_url
- is_active
- created_at
- updated_at

# project
- id
- organization_id
- name
- details
- status (Pending | In progress | Completed)
- start_date
- end_date
- priority
- created_by
- created_at 
- updated_at

# project_assign
- id
- project_id
- user_id
- assigned_by
- created_at 
- updated_at

# task
- id
- project_id
- title
- details
- start_date
- end_date
- priority
- created_by
- status(Pending | In Progress | Done)
- is_active
- created_at
- updated_at

# task_assigned
- id 
- task_id
- user_id
- assigned_by
- created_at
- updated_at

# comments
- id
- task_id
- user_id
- comment_text
- created_at
- updated_at


# Plans
- id
- plan name
- details
- pricing 
- create_at
- updated_at
