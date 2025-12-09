export type Screen =
  | 'HOME'
  | 'ADD_CHOICE'
  | 'TRIP_FORM'
  | 'TRIP_LIST'
  | 'GUIDE_FORM'
  | 'GUIDE_LIST'
  | 'PROFILE'
  | 'SEARCH';

export type Trip = {
  id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  country: string;
  activities: string[];
};

export type Guide = {
  id: string;
  userId: string;
  title: string;
  location: string;
  content: string;
  photoUrls: string[];
};

export type TripFormMode = 'create' | 'edit';

export type GuideFormMode = 'create' | 'edit';
