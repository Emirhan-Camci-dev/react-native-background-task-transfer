// Copyright (c) 2026 Emirhan CAMCI. All rights reserved.

import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface Spec extends TurboModule {
  startUpload(id: string, url: string, filePath: string, headers: Object): void;
  startDownload(id: string, url: string, destinationPath: string, headers: Object): void;
  stopTask(id: string): void;

  // Event emitter requirements
  addListener(eventType: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BackgroundFileTransfer');
