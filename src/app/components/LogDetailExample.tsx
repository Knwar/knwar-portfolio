import { LogDetail } from './LogDetail';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function LogDetailExample() {
  const logData = {
    title: 'Building a Performant Flutter Animation System',
    abstract: 'A deep dive into creating smooth, 60fps animations in Flutter while managing state complexity and avoiding common performance pitfalls.',
    date: '2024.01.15',
    readTime: '8 MIN READ',
    category: 'BLOG' as const,
    content: [
      {
        type: 'paragraph' as const,
        text: 'Animation performance in mobile applications can make or break user experience. When I started working on the FinFlow project, one of the biggest challenges was creating fluid transitions between screens while maintaining a consistent 60fps frame rate.'
      },
      {
        type: 'paragraph' as const,
        text: 'The Flutter framework provides excellent animation primitives, but using them effectively requires understanding how the rendering pipeline works under the hood. In this post, I\'ll share the techniques I used to build a performant animation system that handles complex state transitions.'
      },
      {
        type: 'blockquote' as const,
        text: 'Performance is not just about speed—it\'s about creating experiences that feel natural and responsive.'
      },
      {
        type: 'paragraph' as const,
        text: 'The first step was profiling the existing implementation. Using Flutter DevTools, I discovered that our widget tree was rebuilding far more often than necessary. Each animation frame was triggering a full rebuild of the entire screen, even for widgets that hadn\'t changed.'
      },
      {
        type: 'code' as const,
        text: '// Before optimization\nAnimatedBuilder(\n  animation: controller,\n  builder: (context, child) {\n    return ExpensiveWidget(); // Rebuilds every frame!\n  },\n)'
      },
      {
        type: 'paragraph' as const,
        text: 'The solution was to leverage const constructors and separate animated widgets from static content. By restructuring the widget tree and using the child parameter of AnimatedBuilder, we reduced unnecessary rebuilds by over 70%.'
      },
      {
        type: 'code' as const,
        text: '// After optimization\nAnimatedBuilder(\n  animation: controller,\n  child: const ExpensiveWidget(), // Built once!\n  builder: (context, child) {\n    return Transform.translate(\n      offset: animation.value,\n      child: child,\n    );\n  },\n)'
      },
      {
        type: 'image' as const,
        caption: 'Performance comparison: Before and after optimization'
      },
      {
        type: 'paragraph' as const,
        text: 'Another critical optimization was implementing a custom implicit animation for our card transitions. Instead of relying on built-in animations, I created a lightweight AnimatedPositioned wrapper that only updates when necessary and uses RepaintBoundary to isolate repaints.'
      },
      {
        type: 'paragraph' as const,
        text: 'The results were dramatic. Frame rendering time dropped from an average of 28ms to under 8ms, ensuring smooth 60fps performance even on mid-range Android devices. User engagement metrics improved by 35% within the first week of deployment.'
      }
    ],
    keywords: [
      'flutter',
      'performance',
      'animations',
      'mobile-development',
      'optimization',
      'ui-ux',
      'dart',
      'rendering'
    ],
    relatedLogs: [
      {
        title: 'State Management Patterns in Flutter',
        date: '2024.01.08'
      },
      {
        title: 'Debugging Memory Leaks in Mobile Apps',
        date: '2023.12.22'
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
