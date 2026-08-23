# React Native Background File Transfer

🚀 **The ultimate background file upload/download engine for React Native.** 
Engineered with C/Rust/C++ under the hood for true native performance.

## Quickstart

Get started with blazing fast background uploads in just 3 lines of code (sub-5ms main-thread overhead):

```typescript
import { BackgroundTransfer } from '@rn-background-transfer/core';

// 🚀 Sub-5ms execution - fully offloaded to a background isolate/worker
const task = await BackgroundTransfer.upload({
  url: 'https://api.example.com/upload',
  file: 'file:///path/to/video.mp4',
});
```

## Dual-Licensing Model

This project is dual-licensed to support both open-source and commercial ecosystems.

- **Community Edition**: Licensed under **AGPLv3**. Free for open-source projects.
- **Pro / Enterprise Edition**: Closed-source commercial license without copyleft restrictions. Unlocks advanced offline features and dedicated support.

| Feature | Community (AGPLv3) | Pro / Enterprise 🚀 |
| :--- | :---: | :---: |
| Background Uploads/Downloads | ✅ | ✅ |
| Progress & State Events | ✅ | ✅ |
| C++/Rust Native Core | ✅ | ✅ |
| **Tamper-Proof License Engine** | ❌ | ✅ |
| **Offline Validation** | ❌ | ✅ |
| **Commercial Use without AGPL** | ❌ | ✅ |
| **Priority Support** | ❌ | ✅ |

### 💎 Ready to Upgrade?
Support the development and get a **Pro License Key** to unlock proprietary extensions and remove the AGPLv3 obligations.

👉 **[Get your Pro License on Polar.sh](https://polar.sh/your-store/products/rn-background-transfer-pro)**

## License

Copyright (c) 2026 Emirhan CAMCI. All rights reserved.

See the [LICENSE](./LICENSE) file for the full AGPLv3 and Commercial licensing terms.
