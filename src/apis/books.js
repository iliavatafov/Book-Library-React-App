import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { fireDB } from "../FirebaseConfig/firebaseConfig";

export const CreateBook = async (payload) => {
  try {
    const response = await addDoc(collection(fireDB, "books"), payload);

    return {
      success: true,
      message: "The book is successfuly added",
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const GetAllBooks = async () => {
  try {
    const applications = [];
    const qry = query(collection(fireDB, "books"));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });

    return {
      success: true,
      message: "The books are fetched correctly",
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};
