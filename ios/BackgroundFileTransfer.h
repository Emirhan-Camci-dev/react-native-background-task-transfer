#import <BackgroundFileTransferSpec/BackgroundFileTransferSpec.h>
#import <React/RCTEventEmitter.h>

@interface BackgroundFileTransfer : RCTEventEmitter <NativeBackgroundFileTransferSpec, NSURLSessionDownloadDelegate, NSURLSessionDataDelegate>

@property (nonatomic, strong) NSURLSession *session;

@end
