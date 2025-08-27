export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  role: UserRole;
  ministries: string[];
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  MEMBER = 'member',
  MINISTRY_LEADER = 'ministry_leader',
  PASTOR = 'pastor',
  ADMIN = 'admin'
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  members: string[];
  type: MinistryType;
  createdAt: Date;
  updatedAt: Date;
}

export enum MinistryType {
  WORSHIP = 'worship',
  KIDS = 'kids',
  YOUTH = 'youth',
  OUTREACH = 'outreach',
  ADMINISTRATION = 'administration'
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  type: EventType;
  attendees: string[];
  rsvpRequired: boolean;
  maxAttendees?: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum EventType {
  SERVICE = 'service',
  BIBLE_STUDY = 'bible_study',
  FELLOWSHIP = 'fellowship',
  OUTREACH = 'outreach',
  SPECIAL = 'special'
}

export interface Group {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  members: string[];
  type: GroupType;
  meetingDay?: string;
  meetingTime?: string;
  location?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum GroupType {
  SMALL_GROUP = 'small_group',
  BIBLE_STUDY = 'bible_study',
  PRAYER = 'prayer',
  FELLOWSHIP = 'fellowship'
}

export interface Message {
  id: string;
  groupId: string;
  senderId: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  readBy: string[];
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  DOCUMENT = 'document'
}

export interface CheckIn {
  id: string;
  userId: string;
  eventId: string;
  timestamp: Date;
  location?: string;
}

export interface WorshipSong {
  id: string;
  title: string;
  artist: string;
  key: string;
  tempo: number;
  lyrics: string;
  sheetMusic?: string;
  audioFile?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorshipService {
  id: string;
  date: Date;
  time: string;
  songs: WorshipSong[];
  leaderId: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface KidsLesson {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  materials: string[];
  activities: string[];
  bibleVerse: string;
  lessonDate: Date;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Devotional {
  id: string;
  title: string;
  content: string;
  authorId: string;
  date: Date;
  tags: string[];
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Donation {
  id: string;
  userId: string;
  amount: number;
  type: DonationType;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum DonationType {
  TITHE = 'tithe',
  OFFERING = 'offering',
  SPECIAL = 'special'
}

export enum PaymentMethod {
  CARD = 'card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash'
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  priority: Priority;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}
