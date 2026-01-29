import { theme } from "src/config/theme";
import moment from "moment";
export const onboardingTenses = [
' Honesty',
'Integrity',
'Courage',
'Compassion',
'Respect',
'Responsibility',
'Perseverance',
'Humility',
'Kindness',
'Grateful',
'Patience',
'Discipline',
'Generosity',
'Forgivness', 
'Joyfulness',
'Loyalty',
'Wisdom',
'Empathy',
'Diligence',
'Dedication',
];

export const secondaryGradientColorList = [
  {offset: '0%', color: theme.colors.gradientBackgroundTopSecondary, opacity: '1'},
  {offset: '87%', color: theme.colors.background, opacity: '1'},
  {offset: '100%', color: theme.colors.background, opacity: '1'},
];

export const tertiaryGradientColorList = [
  {offset: '0%', color: theme.colors.gradientBackgroundTopTertiary, opacity: '1'},
  {offset: '80%', color: theme.colors.background, opacity: '1'},
  {offset: '100%', color: theme.colors.background, opacity: '1'},
];
export const tasksListMock = [
  {
    id: '1',
    title: 'Meeting with Pete',
    description: 'Brief for the Podcast',
    isCompleted: true,
    creationDate: +moment().subtract(1, 'days'), // Ayer
    scheduledDate: +moment().subtract(1, 'days'), // Ayer
  },
  {
    id: '2',
    title: 'Buy Protein',
    description: '5kg box from Aldi',
    isCompleted: false,
    creationDate: +moment().subtract(1, 'days'), // Ayer
    scheduledDate: +moment().subtract(1, 'days'), // Ayer
  },
  {
    id: '3',
    title: 'Send message back to Andrew',
    description: 'Send the invoice for next week',
    isCompleted: true,
    creationDate: +moment().subtract(5, 'days'), // Hace 5 días
    scheduledDate: +moment().subtract(5, 'days'), // Hace 5 días
  },
  {
    id: '4',
    title: 'Cricket Match',
    description: '@Joondalup',
    isCompleted: true,
    creationDate: +moment().subtract(5, 'days'), // Hace 5 días
    scheduledDate: +moment().subtract(5, 'days'), // Hace 5 días
  },
  {
    id: '5',
    title: 'Finish off work from yesterday',
    description: 'Get complete by Sunday',
    isCompleted: true,
    creationDate: +moment(), // Hace 7 días
    scheduledDate: +moment(), // Hace 7 días
  },
  {
    id: '6',
    title: 'Project Brainstorm',
    description: 'Discuss new ideas with the team',
    isCompleted: true,
    creationDate: +moment().subtract(7, 'days'), // Hace 10 días
    scheduledDate: +moment().subtract(7, 'days'), // Hace 10 días
  },
  {
    id: '7',
    title: 'Doctor Appointment',
    description: 'Routine check-up',
    isCompleted: true,
    creationDate: +moment().subtract(3, 'days'), // Hace 20 días
    scheduledDate: +moment().subtract(5, 'days'), // Hace 20 días
  },
  {
    id: '8',
    title: 'Grocery Shopping',
    description: 'Buy ingredients for meal prep',
    isCompleted: false,
    creationDate: +moment(), // Hoy
    scheduledDate: +moment(), // Hoy
  },
  {
    id: '9',
    title: 'Prepare Presentation',
    description: 'For the upcoming meeting',
    isCompleted: true,
    creationDate: +moment(), // Hoy
    scheduledDate: +moment(), // Hoy
  },
  {
    id: '10',
    title: 'Team Lunch',
    description: 'Catch up with the team',
    isCompleted: false,
    creationDate: +moment().add(1, 'days'), // Mañana
    scheduledDate: +moment().add(1, 'days'), // Mañana
  },
  {
    id: '12',
    title: 'Weekend Getaway',
    description: 'Plan a small trip',
    isCompleted: false,
    creationDate: +moment().add(7, 'days'), // En 7 días
    scheduledDate: +moment().add(7, 'days'), // En 7 días
  },
];