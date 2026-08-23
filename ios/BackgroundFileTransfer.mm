// Copyright (c) 2026 Emirhan CAMCI. All rights reserved.

#import "BackgroundFileTransfer.h"

@implementation BackgroundFileTransfer

RCT_EXPORT_MODULE()

- (instancetype)init {
    self = [super init];
    if (self) {
        NSURLSessionConfiguration *config = [NSURLSessionConfiguration backgroundSessionConfigurationWithIdentifier:@"com.backgroundfiletransfer.session"];
        self.session = [NSURLSession sessionWithConfiguration:config delegate:self delegateQueue:nil];
    }
    return self;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"onProgress", @"onComplete", @"onError"];
}

- (void)startUpload:(NSString *)id url:(NSString *)url filePath:(NSString *)filePath headers:(NSDictionary *)headers {
    NSURL *requestUrl = [NSURL URLWithString:url];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:requestUrl];
    request.HTTPMethod = @"POST";
    
    for (NSString *key in headers) {
        [request setValue:headers[key] forHTTPHeaderField:key];
    }
    
    NSURL *fileUrl = [NSURL fileURLWithPath:filePath];
    NSURLSessionUploadTask *task = [self.session uploadTaskWithRequest:request fromFile:fileUrl];
    task.taskDescription = id;
    [task resume];
}

- (void)startDownload:(NSString *)id url:(NSString *)url destinationPath:(NSString *)destinationPath headers:(NSDictionary *)headers {
    NSURL *requestUrl = [NSURL URLWithString:url];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:requestUrl];
    
    for (NSString *key in headers) {
        [request setValue:headers[key] forHTTPHeaderField:key];
    }
    
    NSURLSessionDownloadTask *task = [self.session downloadTaskWithRequest:request];
    task.taskDescription = id;
    [task resume];
}

- (void)stopTask:(NSString *)id {
    [self.session getTasksWithCompletionHandler:^(NSArray<NSURLSessionDataTask *> *dataTasks, NSArray<NSURLSessionUploadTask *> *uploadTasks, NSArray<NSURLSessionDownloadTask *> *downloadTasks) {
        for (NSURLSessionTask *task in uploadTasks) {
            if ([task.taskDescription isEqualToString:id]) {
                [task cancel];
            }
        }
        for (NSURLSessionTask *task in downloadTasks) {
            if ([task.taskDescription isEqualToString:id]) {
                [task cancel];
            }
        }
    }];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeBackgroundFileTransferSpecJSI>(params);
}

+ (NSString *)moduleName
{
  return @"BackgroundFileTransfer";
}

// NSURLSession Delegates
- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didSendBodyData:(int64_t)bytesSent totalBytesSent:(int64_t)totalBytesSent totalBytesExpectedToSend:(int64_t)totalBytesExpectedToSend {
    double progress = (double)totalBytesSent / (double)totalBytesExpectedToSend;
    [self sendEventWithName:@"onProgress" body:@{@"id": task.taskDescription ?: @"", @"progress": @(progress)}];
}

- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didWriteData:(int64_t)bytesWritten totalBytesWritten:(int64_t)totalBytesWritten totalBytesExpectedToWrite:(int64_t)totalBytesExpectedToWrite {
    double progress = (double)totalBytesWritten / (double)totalBytesExpectedToWrite;
    [self sendEventWithName:@"onProgress" body:@{@"id": downloadTask.taskDescription ?: @"", @"progress": @(progress)}];
}

- (void)URLSession:(NSURLSession *)session downloadTask:(NSURLSessionDownloadTask *)downloadTask didFinishDownloadingToURL:(NSURL *)location {
    [self sendEventWithName:@"onComplete" body:@{@"id": downloadTask.taskDescription ?: @""}];
}

- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(NSError *)error {
    if (error) {
        [self sendEventWithName:@"onError" body:@{@"id": task.taskDescription ?: @"", @"error": error.localizedDescription}];
    } else {
        [self sendEventWithName:@"onComplete" body:@{@"id": task.taskDescription ?: @""}];
    }
}

@end
