interface FaqData {
  title: string;
  description: string;
}

export const data: FaqData[] = [
  {
    title: 'User Registration',
    description:
      'To complete the registration, you need to fill out the registration form, complete all necessary fields, and accept our terms and conditions. In case of errors, follow the instructions displayed on the screen. After completing the registration, the user will receive an email with an activation link. Clicking on the link will activate the account.',
  },
  {
    title: 'User Login',
    description:
      'To log in to the service, you need to provide your email address and password. If you have trouble logging in, make sure your account has been confirmed through the activation link sent after registration.',
  },
  {
    title: 'Forgot Password',
    description:
      'If you forget your password, click on the "Forgot Password" button on the login page. Then provide your email address, and a link to reset the password will be sent to your email. Clicking on the link will redirect the user to a page where they can set a new password. After completing the entire process, the user will be able to log in with the new password.',
  },
  {
    title: 'How to Add a Meeting',
    description:
      'To add a meeting, choose the "Create meeting" option, and then fill out the meeting addition form. Also, select the meeting location by clicking the "Set Location" button, which will display a map allowing you to add a location pin by clicking on the map. There is also an option to create a private meeting; to do this, check the "Private Meeting" option and provide a password for the meeting twice. After completing the form, click the "Add meeting" button to add the meeting.',
  },
  {
    title: 'How to Check Available Meetings',
    description:
      'To check available meetings, select the "View Meetings" option in the main menu. A list of available meetings will be displayed. To see meeting details, click on the chosen meeting. Additionally, you can view meetings on a map displayed next to the list of available meetings. Above the map is a search option for meetings based on location, which will display the selected location and all available meetings.',
  },
  {
    title: 'How to Join a Meeting',
    description:
      'To join a meeting, select the meeting of interest and click the "Join Meeting" button. After completing the joining process, the user will be redirected to the meeting page.',
  },
  {
    title: 'How to Join a Private Meeting',
    description:
      'To join a private meeting, you need to have a link to such a meeting, which can only be obtained from the meeting organizer. After receiving the link, click on it, and then enter the password for the meeting. The password will be required each time unless the user is already on the list of participants for that meeting. After completing the joining process, the user will be redirected to the meeting page.',
  },
  {
    title: 'How to View My Meetings',
    description:
      'To view your meetings, select the "My Meetings" option in the main menu. Then choose the option for meetings organized or attended by the user, and after selecting the appropriate option, a list of meetings will be displayed. To see meeting details, click on the chosen meeting.',
  },
  {
    title: 'How to Delete a Meeting I Organize',
    description:
      'To delete a meeting, select the "My Meetings" option in the main menu. Then choose the "Organizing" option. After displaying the list of meetings organized by the user, you can choose the option to delete a meeting by clicking on the trash icon located on the right side of the list of meetings.',
  },
  {
    title: 'How to Edit a Meeting I Organize',
    description:
      'To edit a meeting, select the "My Meetings" option in the main menu. Then choose the "Organizing" option. After displaying the list of meetings organized by the user, you can choose the option to edit a meeting by clicking on the pencil icon located on the right side of the list of meetings. This will display the meeting editing form. After completing the editing, click the "Save Changes" button to save the changes.',
  },
];
