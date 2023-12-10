# front-end-interview

## Requirement
A candidate is expected to implement a single-page React application responsible for user management. The application should have the following features:

- Display all existing users.

- Create a new user.

- Edit a current user.

- Delete a current user.

## API Endpoints

- Fetch all existing users: `GET /api/users`

- Create a new user: `POST /api/users`

- Edit a current user: `PUT /api/users/:id`

- Delete a current user: `DELETE /api/users/:id`

## Form Schema

id:
- type: string
- isEditable: false

name:
- type: string
- required: true
- isEditable: true

age:
- type: number
- required: true
- isEditable: true
- min: 1
- max: 120

career:
- type: dropdown
- required: true
- isEditable: true
- values: [`Student`, `Worker`, `Retired`]

job:
- type: dropdown
- required: true
- isEditable: true
- values:
  - `Student`: [`Elementary School`, `Middle School`, `High School`, `University`]
  - `Worker`: [`Accountant`, `Sales`, `Constructor`, `Banker`, `Engineer`, `Others`]
  - `Retired`: Do not display

## General Rules

- Please use MUI to develop UI components.

- We should display a loading icon while data is being loaded / request is being processed.

- All buttons are disabled while data is being loaded / request is being processed.

- Form inputs must be validated before submitting a request.

- We should display a successful message when a request is processed successfully.

- When we fail to load data / process a request, we should display a corresponding error message.

## Get Started

- Step 1: Clone the package

- Step 2: Run the server
  - `cd mock-server`
  - `yarn`
  - `yarn start`

- Step 3: Run the application
  - `cd ..`
  - `cd application`
  - `yarn`
  - `yarn dev`