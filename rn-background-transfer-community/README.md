# React Native Background File Transfer (Community Edition)

🚀 **The ultimate background file upload/download engine for React Native.** 
Engineered with C/Rust/C++ under the hood for true native performance.

## Quickstart

Get started with blazing fast background uploads in just 3 lines of code (sub-5ms main-thread overhead):

```typescript
import { BackgroundTransfer } from 'rn-background-transfer';

// 🚀 Sub-5ms execution - fully offloaded to a background isolate/worker
const task = await BackgroundTransfer.upload({
  url: 'https://api.example.com/upload',
  file: 'file:///path/to/video.mp4',
});
```

## License

Copyright (c) 2026 Emirhan CAMCI. All rights reserved.

Licensed under the **AGPLv3**. Free for open-source projects. See the [LICENSE](./LICENSE) file for the full AGPLv3 terms.

*Note: For commercial use without copyleft restrictions and advanced offline validation features, check out the Pro/Enterprise version.*
