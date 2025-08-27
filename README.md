# 🏛️ Church Management App

A modern church management application built with React Native and Expo, featuring a beautiful glassmorphism UI design and role-based access control.

## ✨ Features

- **Modern UI**: Glassmorphism design with soft shadows and rounded corners
- **Role-Based Access**: Different permission levels for different user types
- **Cross-Platform**: Works on both iOS and Android
- **Responsive Design**: Optimized for mobile devices
- **Mock Authentication**: Ready for Firebase integration

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd church
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your phone

## 🔐 User Profiles & Access Levels

The app includes 4 different user profiles with varying levels of access:

### 1. 👤 Guest Access
**Email**: `guest@church.com`  
**Password**: `guest123`  
**Access Level**: Basic Member

**Available Features:**
- ✅ Home Dashboard
- ✅ Give (Tithes & Offerings)
- ✅ Events Calendar
- ✅ Check-in System
- ✅ More Options Menu
- ✅ Daily Devotional (Read Only)
- ✅ Groups (View Only)
- ❌ Worship Schedule
- ❌ Kids Ministry

**Use Case**: Perfect for regular church members who need basic access to announcements, events, and giving.

---

### 2. 🏫 Kids Ministry Leader
**Email**: `kids@church.com`  
**Password**: `kids123`  
**Access Level**: Ministry Leader

**Available Features:**
- ✅ **Everything from Guest Access** +
- ✅ Kids Ministry Management
- ✅ Teaching Schedules
- ✅ Lesson Materials
- ✅ Kids Ministry Resources

**Use Case**: Ideal for Sunday school teachers, children's ministry coordinators, and anyone involved in kids ministry.

---

### 3. 🎵 Worship Ministry Leader
**Email**: `worship@church.com`  
**Password**: `worship123`  
**Access Level**: Ministry Leader

**Available Features:**
- ✅ **Everything from Guest Access** +
- ✅ Worship Schedule Management
- ✅ Song Library
- ✅ Sheet Music Access
- ✅ Audio Files for Practice
- ✅ Service Planning Tools

**Use Case**: Perfect for worship leaders, musicians, sound technicians, and anyone involved in worship ministry.

---

### 4. ⭐ Pastor Access
**Email**: `pastor@church.com`  
**Password**: `pastor123`  
**Access Level**: Administrator

**Available Features:**
- ✅ **Complete Access to Everything**
- ✅ All Guest Features
- ✅ All Kids Ministry Features
- ✅ All Worship Ministry Features
- ✅ Administrative Controls
- ✅ User Management (Future)
- ✅ Analytics & Reports (Future)
- ✅ Devotional Posting (Pastor Only)

**Use Case**: Designed for pastors, church administrators, and senior leadership who need full access to all features.

## 📱 App Navigation

### Main Tabs
1. **🏠 Home** - Dashboard with quick actions and announcements
2. **💳 Give** - Tithes and offerings management
3. **📅 Events** - Church calendar and RSVP system
4. **✅ Check-in** - Attendance tracking
5. **⋯ More** - Additional features menu

### More Options Menu
- **📖 Daily Devotional** - Spiritual messages (Pastor can post)
- **👥 Groups** - Small groups and ministries
- **🎵 Worship Schedule** - Songs and rehearsal materials (Worship ministry only)
- **🏫 Kids Ministry** - Teaching schedules and materials (Kids ministry only)

## 🎨 UI Design Features

- **Glassmorphism**: Translucent elements with soft shadows
- **Gradient Backgrounds**: Beautiful color transitions
- **Blur Effects**: Modern iOS-style blur overlays
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Enhanced user experience
- **Dark Theme**: Easy on the eyes

## 🔧 Technical Stack

- **Frontend**: React Native + Expo
- **Navigation**: React Navigation v7
- **State Management**: React Context API
- **UI Components**: Custom glassmorphism components
- **Icons**: Expo Vector Icons
- **Storage**: AsyncStorage (mock data)
- **Authentication**: Mock system (ready for Firebase)

## 🚧 Future Implementations

- **Firebase Integration**: Real authentication and database
- **Push Notifications**: Event reminders and announcements
- **Offline Support**: Work without internet connection
- **Multi-language**: Support for different languages
- **Advanced Analytics**: Detailed usage reports
- **User Management**: Admin panel for managing users

## 📱 Screenshots

*Screenshots will be added here showing the different user interfaces*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Made with ❤️ for the Church Community**
