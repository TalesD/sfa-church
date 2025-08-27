# Church Management App

A modern, cross-platform church management application built with React Native and Expo, featuring a beautiful glassmorphism UI design and comprehensive church management features.

## 🎯 Features

### Core Features
- **Home Dashboard** - Church highlights, announcements, and quick access to key features
- **Give** - Offerings & tithes with support for multiple payment methods (Card, PayPal, Bank Transfer)
- **Events** - Church calendar with RSVP functionality and event management
- **Groups** - Small groups/ministries with simple chat functionality
- **Check-in** - Attendance tracking for services and events with QR code support

### Restricted Access Features
- **Worship Schedule** - Visible only to worship ministry members
  - Song management (add, edit, remove)
  - Service planning
  - Sheet music and audio file access
- **Kids Ministry** - Visible only to kids ministry team members
  - Lesson management
  - Teaching schedules
  - Study materials
- **Devotional** - Daily devotionals where only pastors can post, but everyone can read

### User Management
- **Profile Management** - Edit personal information, view ministry memberships
- **Role-Based Access Control** - Different permissions based on user roles and ministry memberships
- **Ministry Management** - View and manage ministry affiliations

## 🎨 Design

The app features a modern **glassmorphism/graphic morphism** design with:
- Translucent elements with backdrop blur effects
- Soft shadows and rounded corners
- Gradient backgrounds
- Clean, intuitive interface
- Modern iconography using Lucide React Native

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **State Management**: React Context API
- **UI Components**: React Native Paper
- **Icons**: Lucide React Native
- **Styling**: Glassmorphism effects with expo-blur and expo-linear-gradient
- **Backend**: Firebase/Supabase (planned)
- **Authentication**: Role-based access control system

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- Cross-platform development with Expo

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd church-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## 📁 Project Structure

```
church-management/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── GlassCard.tsx   # Glassmorphism card component
│   │   └── CustomTabBar.tsx # Custom bottom tab bar
│   ├── features/           # Feature-specific screens
│   │   ├── home/          # Home dashboard
│   │   ├── give/          # Giving functionality
│   │   ├── events/        # Events and calendar
│   │   ├── groups/        # Small groups and chat
│   │   ├── checkin/       # Attendance tracking
│   │   ├── worship/       # Worship ministry (restricted)
│   │   ├── kids/          # Kids ministry (restricted)
│   │   ├── devotional/    # Daily devotionals
│   │   └── profile/       # User profile management
│   ├── store/             # State management
│   │   └── AuthContext.tsx # Authentication context
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # All app types and interfaces
│   ├── constants/         # App constants
│   │   └── theme.ts       # Design system and theme
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── navigation/        # Navigation configuration
├── assets/                # Images, fonts, and other assets
├── App.tsx               # Main app component
├── package.json          # Dependencies and scripts
├── app.json             # Expo configuration
└── tsconfig.json        # TypeScript configuration
```

## 🔐 Authentication & Permissions

The app implements a role-based access control system:

### User Roles
- **Member** - Basic access to public features
- **Leader** - Enhanced access to ministry-specific features
- **Pastor** - Full access including devotional posting

### Ministry Types
- **Worship** - Access to worship schedule and song management
- **Kids** - Access to kids ministry tools
- **Youth** - Youth ministry specific features
- **Outreach** - Community outreach tools

### Permission System
- `hasPermission(permission)` - Check if user has specific permission
- `isInMinistry(ministryType)` - Check if user belongs to specific ministry

## 🎨 Design System

### Colors
- **Primary**: Deep blue (#4F46E5)
- **Secondary**: Purple (#7C3AED)
- **Accent**: Teal (#14B8A6)
- **Background**: Light gray (#F8FAFC)
- **Text**: Dark gray (#1E293B)

### Typography
- **Fonts**: System fonts with fallbacks
- **Sizes**: Consistent scale (xs, sm, md, lg, xl, xxl)
- **Weights**: Regular, Medium, Semibold, Bold

### Spacing
- **Grid System**: 8px base unit
- **Margins/Padding**: Consistent spacing scale
- **Component Spacing**: Standardized gaps between elements

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_FIREBASE_CONFIG=your_firebase_config
```

### Theme Customization
Modify `src/constants/theme.ts` to customize:
- Colors
- Typography
- Spacing
- Shadows
- Gradients

## 📱 Screenshots

*Screenshots will be added here once the app is running*

## 🚧 Development Status

### ✅ Completed
- Project structure and setup
- Navigation system
- Authentication context
- Glassmorphism UI components
- All main screens with mock data
- Role-based access control
- TypeScript types and interfaces

### 🚧 In Progress
- Firebase/Supabase integration
- Real authentication system
- Data persistence

### 📋 Planned
- Push notifications
- Offline support
- Advanced analytics
- Multi-language support
- Dark mode
- Accessibility improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native community
- Expo team for the amazing development platform
- Lucide for the beautiful icon set
- All contributors and supporters

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for the church community**
