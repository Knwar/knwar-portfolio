import { CaseStudy } from './CaseStudy';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function CaseStudyExample() {
  const projectData = {
    projectName: 'FinFlow',
    platform: 'iOS // Android',
    techStack: 'Flutter // Bloc // Firebase',
    duration: '6 Months',
    role: 'Lead Mobile Engineer',
    screenshots: ['screenshot1', 'screenshot2', 'screenshot3'],
    architecture: {
      frontend: ['Flutter 3.x', 'Material Design 3', 'Custom Animations'],
      stateManagement: ['Bloc Pattern', 'Equatable', 'Stream Controllers'],
      backend: ['Firebase Auth', 'Cloud Firestore', 'Cloud Functions', 'FCM']
    },
    challenge: {
      title: 'CRITICAL FRICTION POINT',
      description: 'The existing transaction history feature suffered from severe performance degradation when handling large datasets (10K+ records). Users experienced 3-5 second load times and janky scrolling, leading to a 40% drop-off rate on the transaction screen. The naive implementation fetched all records at once and rebuilt the entire widget tree on every state change.'
    },
    solution: {
      title: 'ENGINEERED SOLUTION',
      description: 'Implemented a sophisticated pagination system using Bloc with stream-based data fetching. Leveraged ListView.builder for lazy loading and introduced a custom caching layer that stored the last 500 records locally using Hive. Optimized widget rebuilds by using const constructors and Equatable for state comparison. Result: Load time reduced to <500ms, 60fps scroll performance, and drop-off rate decreased to 8%.'
    },
    tags: [
      'flutter',
      'bloc-pattern',
      'performance-optimization',
      'firebase',
      'state-management',
      'mobile-architecture',
      'pagination',
      'dart',
      'ios',
      'android'
    ]
  };

  return (
    <>
      <Navigation />
      <CaseStudy {...projectData} />
      <Footer />
    </>
  );
}
