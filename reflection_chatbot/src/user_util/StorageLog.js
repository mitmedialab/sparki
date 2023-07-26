import { initializeApp } from "@firebase/app";
import { getStorage, ref, uploadString } from "@firebase/storage";
import { getAuth, signInAnonymously } from "@firebase/auth";

// StorageLog manages all the functions related to keeping track of the message log and interfacing with Firebase Storage
class StorageLog {
  static startTime;
  static endTime;
  static storageRef;
  static msgLog;

  static init = async (accountName) => {
    StorageLog.startTime = Date.now();
    StorageLog.msgLog = [];

    const firebaseConfig = {
      storageBucket: "gs://sparki-64d46.appspot.com",
      apiKey: "AIzaSyDbbVkpG1nPShBaZKgIkw30KCik4mR2DZg",
    };

    // initialize Firebase app
    const app = initializeApp(firebaseConfig);

    // initialize Firebase auth
    try {
      const auth = getAuth(app);
      await signInAnonymously(auth);

      const storage = getStorage(app);
      const storagePath =
        accountName +
        "/sparkilog-" +
        StorageLog.dateString(StorageLog.startTime) +
        ".json";
      StorageLog.storageRef = ref(storage, storagePath);
    } catch (error) {
      console.error("Error initializing Firebase");
      console.error(error);
    }
  };

  static dateString = (date) => {
    const dateObject = new Date(date);
    return (
      dateObject.getFullYear() +
      "-" +
      (dateObject.getMonth() + 1) +
      "-" +
      dateObject.getDate() +
      "-" +
      dateObject.getHours() +
      "-" +
      dateObject.getMinutes() +
      "-" +
      dateObject.getSeconds()
    );
  };

  static storeMessage = (timestamp, author, context, message) => {
    // TODO test to make sure messages don't get dropped
    if (StorageLog.msgLog) {
      StorageLog.msgLog.push({
        author,
        message,
        context,
        timestamp,
      });
    }
  };

  static uploadLog = () => {
    // record the completed session
    StorageLog.endTime = Date.now();
    let sessionObj = {
      start: StorageLog.startTime,
      end: StorageLog.endTime,
      log: StorageLog.msgLog,
    };

    const sessionLog = JSON.stringify(sessionObj);
    localStorage.setItem("Sparki_log", sessionLog);

    try {
      uploadString(StorageLog.storageRef, sessionLog);
    } catch (err) {
      console.error("Error uploading new content to firebase");
      console.error(err);
    }
  };
}

export default StorageLog;
