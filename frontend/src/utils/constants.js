export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const messages = {
  fieldRequired: 'To pole jest wymagane',
  invalidEmail: 'Wprowadź poprawny e-mail',
  passwordsDontMatch: 'Podane hasła nie są takie same',
  acceptTerms: 'Proszę zaakceptować regulamin',
  createMeetingError: 'Nie udało się stworzyć spotkania',
  createMeeting: 'Spotkanie stworzone',
  max50: 'Maksymalnie 50 znaków',
  resetPasswordEmail:
    'Link do resetu hasła został wysłany na podany adres e-mail',
  resetPasswordEmailError: 'Nie udało się wysłać linku do resetu hasła',
  resetPasswordSuccess: 'Hasło zostało zresetowane',
  resetPasswordError: 'Nie udało się zresetować hasła',
};

export const MAX_MEETING_DURATION = 24 * 60 * 60 * 1000;
export const MAX_MEETINGS_NUMBER_PER_PAGE = 10;
