import { Text, View, StyleSheet, Button } from 'react-native';
import { BackgroundTransfer, useBackgroundUpload } from '@rn-background-transfer/core';
// import { BackgroundTransferPro } from '@rn-background-transfer/pro';

// Uncomment below to test PRO engine initialization
// BackgroundTransferPro.initialize('valid-key-here');

export default function App() {
  const uploadState = useBackgroundUpload('test-upload-1');
  const downloadState = useBackgroundUpload('test-download-1');

  const onUpload = () => {
    BackgroundTransfer.startUpload('test-upload-1', 'https://httpbin.org/post', '/path/to/dummy.file');
  };

  const onDownload = () => {
    BackgroundTransfer.startDownload('test-download-1', 'https://httpbin.org/get', '/path/to/download.file');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Background File Transfer Test</Text>

      <View style={styles.box}>
        <Button title="Start Upload" onPress={onUpload} />
        <Text>Progress: {uploadState.progress}</Text>
        <Text>Completed: {uploadState.completed ? 'Yes' : 'No'}</Text>
        <Text>Error: {uploadState.error}</Text>
      </View>

      <View style={styles.box}>
        <Button title="Start Download" onPress={onDownload} />
        <Text>Progress: {downloadState.progress}</Text>
        <Text>Completed: {downloadState.completed ? 'Yes' : 'No'}</Text>
        <Text>Error: {downloadState.error}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  box: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8
  }
});
