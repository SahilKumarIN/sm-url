import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { databases } from "../db/appwrite.js";
import { ID, Query } from "appwrite";
// Create a context for database
const DbContext = createContext();

// Custom hook to use the DatabaseContext
export const useDb = () => {
  return useContext(DbContext);
};

export const DbProvider = ({ children }) => {
  const [database, setDataBase] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const createLink = async (userId, longUrl, shortUrl, customUrl = null) => {
    try {
      const linkCreated = await databases.createDocument(
        "short-links",
        "short-link",
        ID.unique(),
        {
          longUrl,
          userId,
          shortUrl,
          customUrl,
        }
      );
      //console.log(linkCreated);
      toast.success("Short link generated.");
    } catch (error) {
      setError(error);
      toast.error(error?.message);
    }
  };

  const getLinks = async (userId) => {
    setLoading(true);
    try {
      const links = await databases.listDocuments("short-links", "short-link", [
        Query.equal("userId", userId),
      ]);
      //console.log(links);
      return links;
    } catch (error) {
      setError(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const validateLink = async (shortUrl) => {
    setLoading(true);
    try {
      // Assuming you have a method to fetch documents by a query
      const links = await databases.listDocuments("short-links", "short-link", [
        Query.equal("shortUrl", shortUrl),
      ]);
      const customLinks = await databases.listDocuments(
        "short-links",
        "short-link",
        [Query.equal("customUrl", shortUrl)]
      );

      // Assuming the links collection has an array of documents
      if (links.documents.length > 0) {
        return links.documents[0];
      } else if (customLinks.documents.length > 0) {
        return customLinks.documents[0];
      } else {
        throw new Error(`Error redirecting to ${shortUrl}`);
      }
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkShortUrl = async (shortUrl) => {
    setLoading(true);
    try {
      // Assuming you have a method to fetch documents by a query
      const links = await databases.listDocuments("short-links", "short-link", [
        Query.equal("shortUrl", shortUrl),
      ]);

      // Assuming the links collection has an array of documents
      if (links.documents.length > 0) {
        return false;
      }
      return true;
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (id) => {
    setDeleting(true);
    try {
      const delLink = await databases.deleteDocument(
        "short-links",
        "short-link",
        id
      );

      if (delLink.documents.length > 0) {
        return true;
      }
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return (
    <DbContext.Provider
      value={{
        database,
        loading,
        createLink,
        getLinks,
        validateLink,
        checkShortUrl,
        deleting,
        deleteLink,
      }}
    >
      {children}
    </DbContext.Provider>
  );
};
