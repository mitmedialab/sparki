import { initializeApp } from "@firebase/app";
import { getStorage, ref, uploadString } from "@firebase/storage";
import { getAuth, signInAnonymously } from "@firebase/auth";

// Storage manages all the functions related to keeping track of the message log and interfacing with Firebase Storage
class Storage {
  static startTime;
  static endTime;
  static logStorageRef;
  static proposalStorageRef;
  static msgLog;

  static init = async (accountName) => {
    Storage.startTime = Date.now();
    Storage.msgLog = [];

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
      const logStoragePath =
        accountName +
        "/sparkilog-" +
        Storage.dateString(Storage.startTime) +
        ".json";
      Storage.logStorageRef = ref(storage, logStoragePath);

      const proposalStoragePath =
        accountName +
        "/proposal-" +
        Storage.dateString(Storage.startTime) +
        ".json";
      Storage.proposalStorageRef = ref(storage, proposalStoragePath);
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
    if (Storage.msgLog) {
      Storage.msgLog.push({
        author,
        message,
        context,
        timestamp,
      });
    }
  };

  static uploadLog = () => {
    // record the completed session
    Storage.endTime = Date.now();
    let sessionObj = {
      start: Storage.startTime,
      end: Storage.endTime,
      log: Storage.msgLog,
    };

    const sessionLog = JSON.stringify(sessionObj);
    localStorage.setItem("Sparki_log", sessionLog);

    try {
      console.log("uploading session log to storage: ");
      console.log(sessionLog);
      uploadString(Storage.logStorageRef, sessionLog);
    } catch (err) {
      console.error("Error uploading Sparki log to firebase");
      console.error(err);
    }
  };

  static storeProposal = (proposal) => {
    // record the completed session
    Storage.endTime = Date.now();
    let proposalObj = {
      start: Storage.startTime,
      end: Storage.endTime,
    };

    // copy the proposal into the object that will be uploaded
    for (const section in proposal) {
      if (proposal.hasOwnProperty(section)) {
        proposalObj[section] = proposal[section];
      }
    }

    const finalProposal = JSON.stringify(proposalObj);
    localStorage.setItem("Sparki_proposal", proposal);

    try {
      console.log("uploading proposal to storage: ");
      console.log(finalProposal);
      uploadString(Storage.proposalStorageRef, finalProposal);
    } catch (err) {
      console.error("Error uploading proposal to firebase");
      console.error(err);
    }
  };
}

export default Storage;
