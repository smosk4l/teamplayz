export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const messages = {
  fieldRequired: 'To pole jest wymagane',
  invalidEmail: 'Wprowadź poprawny e-mail',
  passwordsDontMatch: 'Podane hasła nie są takie same',
  acceptTerms: 'Proszę zaakceptować regulamin',
  createMeetingError: 'Nie udało się stworzyć spotkania',
  createMeeting: 'Spotkanie stworzone',
  max50: 'Maksymalnie 50 znaków',
};

const MAX_MEETING_DURATION = 24 * 60 * 60 * 1000;
