# uProjekt Project Calendar (Project 1)

## Project Description

Programmers require a responsive online planner for scheduling timeframes to complete their projects: uProjekt. The planner will be allocated based on a project's deadline, with "Typical", "Accelerated", and "Custom" options available. Currently these features are in a placeholder stage.

In order to showcase the functionality of the project planner, the right side of the uProjekt home page has a demo calendar (featuring the current week and any associated US national holidays through a third-party API) with interactive task entry panels. The left side of the home page hosts a connected interactive task bar where tasks can be assigned to different categories depending on whether they need to be completed, are pending, or are finished.

The nav bar features placeholder tabs where users can access and manage their projects and contact the uProjekt team. The sign-up tab at the top registers visitors by email address and verifies the validity of these addresses through a third-party API.

## User Story

```md
Users can sign up by entering a valid email address (using the button at the top of the page), which is verified by a third-party API.

Users can also demo the project management system by entering tasks into the calendar application on the right-hand side of the page (which is set to the current week and highlights related holidays, also through a third-party API).

Tasks that are entered into the calendar populate in the “To-do” section of the demo task management bar on the left-hand side of the page.

When a user starts or completes a task, it can be moved via drag-and-drop to the in-progress or completed task management sections.
```

## API's

1. Validator.pizza -- This application verifies email addresses for user contact and accounts: https://www.validator.pizza/

2. US national holidays -- This application incorporates all 16 US national holidays into scheduling: https://calendarific.com/ _(NOTE: The paid subscription for public hosting of this API is no longer valid as of Feb. 2021)_

## uProjekt screenshot

The following is a screenshot of uProjekt, highlighting the web page's appearance and functionality:

![This is a screenshot of the website. It includes: a header with a logo and nav bar, including a sign-up button for email notifications (verified by a third-party API); cards for the "Custom", "Typical", and "Accelerated" project planning options; a customizable demo "Tasks" bar with moveable list items to indicate progress; an interactive demo calender for the current week where tasks can be entered by day, and where a third-party API provides public US holidays; and a footer with contact info.](./assets/images/screenshot.png)

## uProjekt webpage

The final link to the deployed uProjekt page is here: https://l-buchholz.github.io/project-1/

## uProjekt development team members

- Aaron Farrell
- Collin Kerr
- Lauren Buchholz
- Moe Essmat
- Olivia Hall
