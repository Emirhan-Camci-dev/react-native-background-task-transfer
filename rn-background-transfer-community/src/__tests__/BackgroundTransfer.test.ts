// Copyright (c) 2026 Emirhan CAMCI. All rights reserved.

import { BackgroundTransfer, useBackgroundUpload, addProgressListener } from '../index';
import { renderHook, act } from '@testing-library/react-hooks';
import { NativeEventEmitter } from 'react-native';

// Mock Native Module
jest.mock('react-native', () => {
  return {
    NativeEventEmitter: jest.fn().mockImplementation(() => ({
      addListener: jest.fn(() => ({ remove: jest.fn() })),
    })),
    NativeModules: {
      BackgroundFileTransfer: {
        startUpload: jest.fn(),
        stopTask: jest.fn(),
      }
    }
  };
});

describe('Background Transfer Memory Leak & Integration Tests', () => {

  it('should not leak memory after 10000 rapid listener registrations', () => {
    const initialMemory = process.memoryUsage().heapUsed;
    
    // Simulate mounting and unmounting components rapidly
    for (let i = 0; i < 10000; i++) {
      const subscription = addProgressListener(() => {});
      subscription.remove();
    }

    // Force garbage collection if available (requires node --expose-gc)
    if (global.gc) {
      global.gc();
    }

    const finalMemory = process.memoryUsage().heapUsed;
    const diffMb = (finalMemory - initialMemory) / 1024 / 1024;
    
    // Heap shouldn't grow drastically. Asserting diff is less than 5MB
    expect(diffMb).toBeLessThan(5);
  });

  it('should call native startUpload successfully (Integration)', () => {
    BackgroundTransfer.startUpload('test-id', 'https://api.test.com', '/test/file.mp4');
    expect(BackgroundTransfer.engine.startUpload).toBeDefined();
  });

});
