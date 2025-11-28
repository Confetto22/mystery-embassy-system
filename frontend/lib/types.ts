export interface Member {
  id: string;
  firstname: string;
  lastname: string;
  other_names: string;
  department_id: string | null;
  memberType: string;
  isHead: boolean;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
  gender: string;
  department: Department;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  endDate: string;
  startTime: string;
  endTime: string;
  created_at: string;
  updated_at: string;
  attendances: Attendance[];
}
export interface Service {
  id: string;
  name: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  attendances: Attendance[];
}
export interface GenderCount {
  _count: {
    id: number;
  };
  gender: string;
  color: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  _count: {
    members: number;
  };
  members: Member[];
  color: string;
}

export interface AnalyticsData {
  totalMembers: Member[];
  firstTimers: Member[];
  upcomingEvts: Event[];
  presentToday: Member[];
  genders: GenderCount[];
  deptPopulation: Department[];
  absentToday: Member[];
  todayEvent: Event[];
  todayService: Service[];
}

export interface Attendance {
  id: string;
  member_id: string;
  member_phone: string;
  service_id: string;
  event_id: string;
  address: string;
  firstname: string;
  lastname: string;
  phone: string;
  memberType: string;
  attendance_status: string;
  date: string;
  time: string;
  created_at: string;
  member: Member;
  service: Event;
  event: Event;
}
