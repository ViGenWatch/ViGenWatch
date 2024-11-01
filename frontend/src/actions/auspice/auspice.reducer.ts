export interface AuspiceGeneralState {
  language?: string;
}

export function auspiceGeneralReducer(state: AuspiceGeneralState = { language: 'vi' }) {
  return state;
}

export function auspiceQueryReducer() {
  return {};
}
