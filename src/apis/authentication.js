import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../FirebaseConfig/firebaseConfig";
import CryptoJS from "crypto-js";

export const LoginUser = async (payload) => {
  try {
    // check if user exists

    const qry = query(
      collection(fireDB, "users"),
      where("email", "==", payload.email)
    );

    const querySnapshot = await getDocs(qry);

    if (querySnapshot.empty) {
      return {
        success: false,
        message: "Email not found",
      };
    } else {
      const snapshotData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const user = snapshotData[0];

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        "book-library"
      ).toString(CryptoJS.enc.Utf8);

      if (decryptedPassword === payload.password) {
        return {
          success: true,
          message: "Login successful",
          data: {
            ...user,
            password: "",
          },
        };
      } else {
        return {
          success: false,
          message: "Incorrect password",
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const RegisterUser = async (payload) => {
  try {
    //check if email exists

    const qry = query(
      collection(fireDB, "users"),
      where("email", "==", payload.email)
    );

    const querySnapshot = await getDocs(qry);

    if (querySnapshot.size > 0) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    //encrypt password

    const encryptedPassword = CryptoJS.AES.encrypt(
      payload.password,
      "book-library"
    ).toString();

    payload.password = encryptedPassword;

    const response = await addDoc(collection(fireDB, "users"), payload);

    return {
      success: true,
      message: "User Registered Successfully",
      data: {
        id: response.id,
        ...payload,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
