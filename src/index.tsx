// Copyright (c) 2026 Emirhan CAMCI. All rights reserved.

import { NativeEventEmitter } from 'react-native';
import NativeBackgroundFileTransfer from './NativeBackgroundFileTransfer';
import { useState, useEffect } from 'react';

const emitter = new NativeEventEmitter(NativeBackgroundFileTransfer as any);

export interface TransferEngine {
  startUpload(id: string, url: string, filePath: string, headers: Record<string, string>): void;
  startDownload(id: string, url: string, destinationPath: string, headers: Record<string, string>): void;
  stopTask(id: string): void;
}

// Default open-source engine using basic Native Module
class CoreTransferEngine implements TransferEngine {
  startUpload(id: string, url: string, filePath: string, headers: Record<string, string> = {}) {
    NativeBackgroundFileTransfer.startUpload(id, url, filePath, headers);
  }

  startDownload(id: string, url: string, destinationPath: string, headers: Record<string, string> = {}) {
    NativeBackgroundFileTransfer.startDownload(id, url, destinationPath, headers);
  }

  stopTask(id: string) {
    NativeBackgroundFileTransfer.stopTask(id);
  }
}

export const BackgroundTransfer = {
  engine: new CoreTransferEngine() as TransferEngine,
  
  setEngine(customEngine: TransferEngine) {
    this.engine = customEngine;
  },

  startUpload(id: string, url: string, filePath: string, headers: Record<string, string> = {}) {
    this.engine.startUpload(id, url, filePath, headers);
  },

  startDownload(id: string, url: string, destinationPath: string, headers: Record<string, string> = {}) {
    this.engine.startDownload(id, url, destinationPath, headers);
  },

  stopTask(id: string) {
    this.engine.stopTask(id);
  }
};

export function addProgressListener(callback: (event: { id: string; progress: number }) => void) {
  return emitter.addListener('onProgress', callback);
}

export function addCompleteListener(callback: (event: { id: string }) => void) {
  return emitter.addListener('onComplete', callback);
}

export function addErrorListener(callback: (event: { id: string; error: string }) => void) {
  return emitter.addListener('onError', callback);
}

export function useBackgroundUpload(id: string) {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const progSub = addProgressListener((e) => {
      if (e.id === id) setProgress(e.progress);
    });
    const compSub = addCompleteListener((e) => {
      if (e.id === id) setCompleted(true);
    });
    const errSub = addErrorListener((e) => {
      if (e.id === id) setError(e.error);
    });
    return () => {
      progSub.remove();
      compSub.remove();
      errSub.remove();
    };
  }, [id]);

  return { progress, completed, error };
}
