import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import moment from "moment/moment";
import { fireDB } from "../FirebaseConfig/firebaseConfig";

export const CreateBook = async (payload) => {
  try {
    const createdAt = moment().format("MMMM Do YYYY, h:mm:ss a");

    const response = await addDoc(collection(fireDB, "books"), {
      createdAt,
      ...payload,
    });

    const bookData = await GetOneBook(response.id);

    return {
      success: true,
      message: "The book is successfuly added",
      data: bookData,
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
    let applications = [];
    const qry = query(
      collection(fireDB, "books"),
      orderBy("createdAt", "desc")
    );
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

export const GetOneBook = async (bookId) => {
  try {
    let book = {};
    const qry = query(
      collection(fireDB, "books"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      if (doc.id === bookId) {
        book = { id: doc.id, ...doc.data() };
      }
    });
    return {
      success: true,
      message: "The books are fetched correctly",
      data: book,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const DeleteBook = async (bookId) => {
  try {
    await deleteDoc(doc(fireDB, "books", bookId));
    return {
      success: true,
      message: "Book delete successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Somthing went wrong",
    };
  }
};
