import { LogDetail } from './LogDetail';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function LogDetailVideoExample() {
  const logData = {
    title: 'Live Coding: Building a Chat App with Firebase',
    abstract: 'Watch as I build a real-time chat application from scratch using Flutter and Firebase, covering authentication, real-time messaging, and push notifications.',
    date: '2024.01.20',
    readTime: '45 MIN WATCH',
    category: 'VIDEO' as const,
    videoUrl: 'https://youtube.com/@knwar',
    content: [
      {
        type: 'paragraph' as const,
        text: 'In this live coding session, I build a complete real-time chat application using Flutter and Firebase. We start from an empty project and work through authentication, message syncing, and push notifications.'
      },
      {
        type: 'paragraph' as const,
        text: 'This video is perfect for developers who want to understand how Firebase integrates with Flutter for real-time applications. I cover best practices for structuring your code, handling edge cases, and optimizing for performance.'
      },
      {
        type: 'blockquote' as const,
        text: 'The best way to learn is by building real projects that solve real problems.'
      },
      {
        type: 'paragraph' as const,
        text: 'Key topics covered in this session include Firebase Authentication setup, Cloud Firestore data modeling for chat messages, real-time listeners with StreamBuilder, and implementing Firebase Cloud Messaging for push notifications.'
      },
      {
        type: 'image' as const,
        caption: 'Final chat app UI showing real-time message sync'
      },
      {
        type: 'paragraph' as const,
        text: 'By the end of this session, you\'ll have a fully functional chat application that you can customize and extend for your own projects. The complete source code is available on GitHub.'
      }
    ],
    keywords: [
      'flutter',
      'firebase',
      'chat-app',
      'real-time',
      'live-coding',
      'firebase-auth',
      'cloud-firestore',
      'push-notifications',
      'video-tutorial'
    ],
    relatedLogs: [
      {
        title: 'Building a Performant Flutter Animation System',
        date: '2024.01.15'
      },
      {
        title: 'State Management Patterns in Flutter',
        date: '2024.01.08'
      },
      {
        title: 'Advanced Bloc Patterns for Complex UIs',
        date: '2023.12.15'
      }
    ]
  };

  return (
    <>
      <Navigation />
      <LogDetail {...logData} />
      <Footer />
    </>
  );
}
