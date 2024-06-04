import { Client, Databases, ID, Storage , Query} from "appwrite";
import conf from "../config/config.js";

export class DatabaseService {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, content, featuredImage, status, userId }) {
    try {
      const document = await this.database.createDocument(
        conf.appwriteDatabseId,
        conf.appwriteBucketId,
        ID.unique(),
        { title, content, featuredImage, status, userId }
      );
      return document;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(id, { title, content, featuredImage, status }) {
    const document = await this.database.updateDocument(
      conf.appwriteDatabseId,
      conf.appwriteBucketId,
      id,
      { title, content, featuredImage, status }
    );
  }

  async deletePost(id) {
    try {
        const result = await this.database.deleteDocument(
            conf.appwriteDatabseId, conf.appwriteBucketId, id
        );
        return true;
    }catch(error) {
        console.log(error);
        return false;
    }
    
  }

  async getPost(id) {
    try{
        return await this.database.getDocument(conf.appwriteDatabseId, 
            conf.appwriteBucketId, id);
    }catch(error) {
        console.log(error);
    }
  }

  async getPostList() {
    try {
        return await this.database.listDocuments(
            conf.appwriteDatabseId,
            conf.appwriteBucketId,
            [
                Query.equal('status', 'active')
            ]
        );
    }catch (error) {
        console.log(error);
    }
  }

  async uploadPost(file){
    try{
        await this.storage.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file);
            return true;
    }catch(error) {
        console.log(error);
        return false;
    }
  }

  async deletePost(fileId) {
    try {
        await this.storage.deleteDocument(conf.appwriteDatabseId, conf.appwriteBucketId, fileId);
        return true;
    }catch(error) {
        console.log(error);
        return false;
    }
    
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const databaseService = new DatabaseService();

export default databaseService;
