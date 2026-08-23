package com.backgroundfiletransfer

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import androidx.work.Data
import androidx.work.OneTimeWorkRequest
import androidx.work.WorkManager
import androidx.work.Constraints
import androidx.work.NetworkType

class BackgroundFileTransferModule(private val reactContext: ReactApplicationContext) :
  NativeBackgroundFileTransferSpec(reactContext) {

  override fun startUpload(id: String, url: String, filePath: String, headers: ReadableMap) {
    val data = Data.Builder()
        .putString("url", url)
        .putString("filePath", filePath)
        .putString("id", id)
        .build()

    val constraints = Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .build()

    val request = OneTimeWorkRequest.Builder(UploadWorker::class.java)
        .setInputData(data)
        .setConstraints(constraints)
        .addTag(id)
        .build()

    WorkManager.getInstance(reactContext).enqueue(request)
  }

  override fun startDownload(id: String, url: String, destinationPath: String, headers: ReadableMap) {
    val data = Data.Builder()
        .putString("url", url)
        .putString("destPath", destinationPath)
        .putString("id", id)
        .build()

    val constraints = Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .build()

    val request = OneTimeWorkRequest.Builder(DownloadWorker::class.java)
        .setInputData(data)
        .setConstraints(constraints)
        .addTag(id)
        .build()

    WorkManager.getInstance(reactContext).enqueue(request)
  }

  override fun stopTask(id: String) {
    WorkManager.getInstance(reactContext).cancelAllWorkByTag(id)
  }
  
  override fun addListener(eventType: String) {
  }

  override fun removeListeners(count: Double) {
  }

  companion object {
    const val NAME = NativeBackgroundFileTransferSpec.NAME
  }
}
